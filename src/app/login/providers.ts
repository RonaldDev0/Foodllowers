export type provider = {
  logo: string,
  name: string,
  login: () => Promise<void>
}

export const providers: provider[] = [
  {
    logo: './icons/google.svg',
    name: 'Google',
    login: async () => {}
  },
  {
    logo: './icons/facebook.svg',
    name: 'Facebook',
    login: async () => {}
  },
  {
    logo: './icons/apple.svg',
    name: 'Apple',
    login: async () => {}
  }
]
