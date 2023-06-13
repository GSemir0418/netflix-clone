import { useCallback, useState } from 'react'
import axios from 'axios'
import { signIn } from 'next-auth/react'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import Input from '@/components/Input'

function Auth() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const [variant, setVariant] = useState('login')

  const toggleVariant = useCallback(() => {
    setVariant(current => current === 'login' ? 'register' : 'login')
  }, [])

  const login = useCallback(async () => {
    try {
      // 使用 id 为 credentials 的 provider 进行登录验证
      await signIn('credentials', {
        email,
        password,
        // 登陆成功后是否重定向至 callbackUrl
        redirect: true,
        callbackUrl: '/profile',
      })
      // router.push('/')
    }
    catch (error) {
      console.error(error)
    }
  }, [email, password])

  const register = useCallback(async () => {
    try {
      await axios.post('/api/register', {
        email,
        name,
        password,
      })
      login()
    }
    catch (error) {
      console.error(error)
    }
  }, [email, name, password])

  return <div
    className="
      bg-[url('/images/hero.jpg')]
      bg-no-repeat
      bg-center
      bg-cover
      h-full
      w-full
      relative
    "
  >
    {/* mask */}
    <div className="
      bg-black
      w-full
      h-full
      lg:bg-opacity-50
    ">
      {/* logo */}
      <nav className="px-12 py-5">
        <img src="/images/logo.png" alt="logo" className="h-12"/>
      </nav>
      {/* input */}
      <div className="flex justify-center">
        <div className="
          bg-black
          bg-opacity-70
          px-16
          py-16
          self-center
          mt-2
          rounded-md
          w-full lg:w-2/5
          "
        >
          <h2 className="text-white text-4xl mb-8 font-semibold">
            {variant === 'login' ? 'Sign in' : 'Register'}
          </h2>
          <div className="flex flex-col gap-4">
            {variant === 'register' && (
              <Input
                id="name"
                label='Username'
                onChange={(e: any) => setName(e.target.value)}
                value={name}
              />
            )}
            <Input
              id="email"
              label='Email'
              onChange={(e: any) => setEmail(e.target.value)}
              type='email'
              value={email}
            />
            <Input
              id="password"
              label='Password'
              onChange={(e: any) => setPassword(e.target.value)}
              type='password'
              value={password}
            />
          </div>
          <button className="
            bg-red-500
            py-3
            text-white
            rounded-md
            w-full
            mt-10
            hover:bg-red-700
            // 样式切换效果更平滑
            transition
          "
            onClick={variant === 'login' ? login : register}
          >
            {variant === 'login' ? 'Login' : 'Sign up'}
          </button>
          {/* 第三方登录图标 */}
          <div className="flex flex-row items-center justify-center gap-4 mt-8">
            <div className='
              w-10
              h-10
              bg-white
              rounded-full
              flex
              justify-center
              items-center
              cursor-pointer
              hover:opacity-80
              transition
            '
              onClick={() => { signIn('google', { callbackUrl: '/profile' }) }}
            >
              <FcGoogle size={30}/>
            </div>
            <div className='
              w-10
              h-10
              bg-white
              rounded-full
              flex
              justify-center
              items-center
              cursor-pointer
              hover:opacity-80
              transition
            '
              onClick={() => { signIn('github', { callbackUrl: '/profile' }) }}
            >
              <FaGithub size={30}/>
            </div>
          </div>
          <p className="text-neutral-500 mt-12">
            {variant === 'login' ? 'First time using Netflix?' : 'Already have an account?'}
            <span onClick={toggleVariant} className='text-white ml-1 hover:underline cursor-pointer'>
              {variant === 'login' ? 'Create an account' : 'Login'}
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
}

export default Auth
