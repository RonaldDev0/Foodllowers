interface IUseDecrypt {
  key: string
  data: any
  ignore?: string[]
}

export async function useDecrypt ({ key, data, ignore = ['user_id'] }: IUseDecrypt) {
  try {
    return await fetch('/api/decript', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, data, ignore })
    }).then(res => res.json())
  } catch (e) {
    return { error: e }
  }
}
