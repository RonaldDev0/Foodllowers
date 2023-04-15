export type provider = {
  logo: string,
  name: string,
  provider: any
}

export const providers: provider[] = [
  {
    logo: './icons/google.svg',
    name: 'Google',
    provider: 'google'
  },
  {
    logo: './icons/facebook.svg',
    name: 'Facebook',
    provider: 'facebook'
  },
  {
    logo: './icons/apple.svg',
    name: 'Apple',
    provider: 'apple'
  }
]
