import { signOut } from 'next-auth/react'

interface AccountMenuProps {
  visible?: boolean
}
const AccountMenu: React.FC<AccountMenuProps> = ({ visible }) => {
  if (!visible)
    return null
  return (
    <div className="bg-black w-56 absolute top-14 right-0 py-4 flex-col border-2 border-gray-800 flex">
      <div className="flex flex-col gap-3">
        {/* to profile page */}
        <div className="px-3 group/xxx flex flex-row gap-3 items-center w-full">
          <img className="w-8 rounded-md" src="/images/default-red.png" alt="" />
          <p className="text-white text-sm group-hover/xxx:underline">
            UserName
          </p>
        </div>
        {/* logout button */}
        <hr className="bg-gray-600 border-0 h-px my-1" />
        <div onClick={() => { signOut({ callbackUrl: '/auth' }) } } className="px-3 text-center text-white text-sm hover:underline">
          Sign Out
        </div>
      </div>
    </div>
  )
}
export default AccountMenu
