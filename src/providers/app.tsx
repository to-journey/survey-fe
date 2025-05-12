import { createContext, useContext, useEffect, useState } from 'react'
import type {
  LoginForm,
  LoginResponse,
  RegisterForm,
  RegisterResponse,
} from '@/types/auth'
import type { User } from '@/types/user'
import * as storage from '@/utils/storage'
import { getProfile } from '@/services/user'
import axios from '@/lib/axios'
import { toaster } from '@/components/ui/toaster'

export interface IApp {
  token?: string | null
  setToken?: (token: string) => void
  user?: User | null
  setUser?: (user: User) => void
  login?: (loginData: LoginForm) => Promise<void>
  register?: (registerData: RegisterForm) => Promise<void>
  logout?: () => void
  isLoading?: boolean
  isLogin?: boolean
  isRegister?: boolean
}

export const AppContext = createContext<IApp>({})

interface Props {
  children: React.ReactNode
}

const AppProvider: React.FC<Props> = ({ children }) => {
  const [token, setToken] = useState<string | null>(storage.getToken())
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isLogin, setIsLogin] = useState(false)
  const [isRegister, setIsRegister] = useState(false)

  const fetchUser = async () => {
    if (token) {
      setIsLoading(true)
      try {
        const profile = await getProfile()
        setUser(profile)
      } catch (error) {
        console.error(error)
        toaster.error({
          title: 'ログインに失敗しました',
        })
      } finally {
        setIsLoading(false)
      }
    }
  }

  useEffect(() => {
    if (token) {
      storage.setToken(token)
      fetchUser()
    } else {
      storage.removeToken()
    }
  }, [token])

  const login = async (loginData: LoginForm) => {
    setIsLogin(true)
    try {
      const response = await axios.post<LoginResponse>('/auth/login', loginData)
      setToken(response.data.token)
      toaster.success({
        title: 'ログインが完了しました',
      })
    } catch (error) {
      console.error(error)
      toaster.error({
        title: 'ログインに失敗しました',
      })
    } finally {
      setIsLogin(false)
    }
  }

  const register = async (registerData: RegisterForm) => {
    setIsRegister(true)
    try {
      const response = await axios.post<RegisterResponse>(
        '/auth/register',
        registerData,
      )
      setToken(response.data.token)
      toaster.success({
        title: '新規登録が完了しました',
      })
    } catch (error) {
      console.error(error)
      toaster.error({
        title: '新規登録に失敗しました',
      })
    } finally {
      setIsRegister(false)
    }
  }

  const logout = () => {
    setToken(null)
  }

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        login,
        register,
        logout,
        isLoading,
        isLogin,
        isRegister,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider

export const useApp = () => {
  return useContext(AppContext)
}
