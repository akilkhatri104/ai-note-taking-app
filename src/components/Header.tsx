import { shadow } from "@/styles/utils"
import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"
import DarkModeToggle from "./DarkModeToggle"
import LogoutButton from "./LogoutButton"
import { getUser } from "@/app/auth/server"

async function Header() {
  const user = await getUser()

  return (
    <header className="relative flex h-24 w-full items-center justify-between bg-popover px-3 sm:px-8"
      style={{
        boxShadow: shadow
      }}
    >
      <Link href={'/'} className="flex items-end gap-2 text-2xl font-semibold leading-6">
        <Image src={'/goatius.png'} alt="GOAT Notes Logo" height={60} width={60} className="rounded-full" priority />
        <h1 className="flex flex-col pb-1 ">
          GOAT <span>Notes</span>
        </h1>
      </Link>

      <div className="flex gap-4">
        {user ? (
          <LogoutButton />
        ) : (
          <>
            <Button asChild className="hidden sm:block">
              <Link href={'/sign-up'}>
                Signup
              </Link>
            </Button>
            <Button asChild variant={'outline'}>
              <Link href={'/login'}>
                Login
              </Link>
            </Button>
          </>
        )}
        <DarkModeToggle />
      </div>
    </header>
  )
}

export default Header