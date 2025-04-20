
export type UserInfo = {
  id: number
  email: string
  nickname: string
  avatar: string
  // ....
}

const useUserInfo = () => {
  // Global Data in Nuxt
  const userInfo = useState<UserInfo | null>('userInfo', () => {
    return null
  })

  return userInfo
}

export default useUserInfo
