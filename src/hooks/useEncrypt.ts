interface IUseEncrypt {
  key: string
  data: any
  ignore?: string[]
}

export async function useEncrypt ({ key, data, ignore = ['user_id'] }: IUseEncrypt) {
  try {
    return await fetch('/api/encript', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, data, ignore })
    }).then(res => res.json())
  } catch (e) {
    return { error: e }
  }
}
