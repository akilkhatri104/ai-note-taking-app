'use client'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { logoutAction } from '@/actions/users'

function LogoutButton() {
    const [loading,setLoading] = useState(false)
    const router = useRouter()
    const logoutHandler = async () => {
        console.log("Logging out....")
        setLoading(true)

        const {errorMessage} = await logoutAction()

        if(!errorMessage){
            toast.success("Logged out",{
                description: "You have logged out successfully!",
                cancel: {
                    label: "X",
                    onClick: () => console.log("Cancel")
                }
            }) 
            router.push('/')
        }else{
            toast.error("Error",{
                description: errorMessage,
                cancel: {
                    label: "X",
                    onClick: () => console.log("Cancel")
                }
            })
        }

        setLoading(false)
    }
  return (
    <Button className='w-24' variant={'outline'} onClick={logoutHandler} disabled={loading}>
        {loading ? <Loader2 className='animate-spin' /> : "Logout"}
    </Button>
  )
}

export default LogoutButton