import { useState } from 'react'
import Input from '@/components/Input'

function Auth() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
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
          lg:w-2/5
          "
        >
          <h2 className="text-white text-4xl mb-8 font-semibold">
            Sign in
          </h2>
          <div className="flex flex-col gap-4">
            <Input
              id="name"
              label='Username'
              onChange={(e: any) => setName(e.target.value)}
              value={name}
            />
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
        </div>

      </div>
    </div>
  </div>
}

export default Auth
