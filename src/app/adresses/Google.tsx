'use client'
import { useState } from 'react'
import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps'
import { Input, Card, CircularProgress } from '@nextui-org/react'
import { MapPin } from 'lucide-react'

interface IProps {
  addressError: boolean
  setAddress: Function
  setAddressError: Function
  address?: any
}

// Bogota position
const position = { lat: 4.645000, lng: -74.101750 }
const bounds = {
  latLngBounds: {
    south: 4.524361711687331,
    west: -74.20901080492014,
    north: 4.77892461009049,
    east: -74.01207250779134
  },
  strictBounds: true
}

export function Google ({ addressError, setAddress, setAddressError, address }: IProps) {
  const [input, setInput] = useState<string>(address ? address.formattedAddress : '')
  const [markerPosition, setMarkerPosition] = useState<any>(address ? address.geometry.location : null)
  const [mapCenter, setMapCenter] = useState<any>(address ? address.geometry.location : position)
  const [predictionss, setPredictions] = useState<any>([])
  const [openAutoComplete, setOpenAutoComplete] = useState(false)
  const [mapZoom, setMapZoom] = useState(13)
  const [timeoutId, setTimeoutId] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(false)

  function handleMapClick (latLng: any) {
    setMarkerPosition(latLng)

    fetch('/api/maps_geo', {
      cache: 'no-cache',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(latLng)
    })
      .then(res => res.json())
      .then(data => {
        setInput(data.results[0].formatted_address)
        setAddress(data?.results?.[0])
      })
  }

  function handlePredictionClick (prediction: any) {
    setAddress(prediction)
    setMapCenter(prediction.geometry.location)
    setMarkerPosition(prediction.geometry.location)
    setInput(prediction.formatted_address)
    setOpenAutoComplete(false)
    setMapZoom(18)
  }

  function handleSubmit () {
    fetch('/api/maps_auto_complete', {
      cache: 'no-cache',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ place: input })
    })
      .then(res => res.json())
      .then(res => {
        if (res.error_message) {
          return
        }
        setLoading(false)
        setPredictions(res.results)
      })
  }

  function handleChange () {
    if (timeoutId) clearTimeout(timeoutId)
    const newTimeoutId = setTimeout(() => {
      handleSubmit()
    }, 1000)
    setTimeoutId(newTimeoutId)
  }

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <div className='w-full rounded relative'>
        <Input
          autoComplete='off'
          placeholder='Escribe tu ubicación'
          value={input}
          isInvalid={addressError}
          errorMessage={addressError && 'Selecciona una sugerencia o usa el marcador en el mapa.'}
          onChange={e => {
            handleChange()
            setAddressError(false)
            setInput(e.target.value)
            setLoading(true)
            setOpenAutoComplete(true)
            setMarkerPosition(null)
            setAddress(null)
            setPredictions([])
          }}
        />

        {openAutoComplete && (
          <Card className='absolute z-50 rounded mt-2 w-full bg-neutral-800 transition-all'>
            <div>
              {loading && (
                <div className='w-full my-2 flex justify-center items-center'>
                  <CircularProgress color='secondary' aria-label='Loading...' />
                </div>
              )}
              {predictionss.map((prediction: any, index: number) => (
                <div
                  key={index}
                  onClick={() => handlePredictionClick(prediction)}
                  className='hover:bg-purple-950 transition-all py-5 flex items-center gap-3 px-5 cursor-pointer rounded'
                >
                  <div>
                    <MapPin size={28} />
                  </div>
                  <p>{prediction.formatted_address}</p>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>

      <div className='h-72 w-full' onClick={() => setOpenAutoComplete(false)}>
        <Map
          fullscreenControl
          center={mapCenter}
          onCenterChanged={res => setMapCenter(res.detail.center)}
          minZoom={11}
          zoom={mapZoom}
          onZoomChanged={res => setMapZoom(res.detail.zoom)}
          gestureHandling='greedy'
          mapId={process.env.NEXT_PUBLIC_MAP_ID!}
          disableDefaultUI
          restriction={bounds}
          onClick={({ detail: { latLng } }) => handleMapClick(latLng)}
          onDrag={() => setOpenAutoComplete(false)}
        >
          {markerPosition && (
            <AdvancedMarker
              position={markerPosition}
              draggable
              onDragEnd={({ latLng }) => {
                const coordenates = { lat: latLng?.lat(), lng: latLng?.lng() }
                setMarkerPosition(coordenates)
              }}
            />
          )}
        </Map>
      </div>
    </APIProvider>
  )
}
