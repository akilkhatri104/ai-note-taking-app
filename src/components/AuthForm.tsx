'use client'
import { useRouter } from 'next/navigation'
import React, { useTransition } from 'react'
import { CardContent, CardFooter } from './ui/card'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'

type Props = {
    type: "login" | "signup"
}

function AuthForm({type} : Props) {
    const isLoginForm = type === 'login'
    const router = useRouter()
    const [isPending,startTransition] = useTransition()
    const handleSubmit = async (formData : FormData) => {
        console.log("Form submited");
        
    }
  return (
    <form action={handleSubmit}>
        <CardContent className='grid w-full items-center gap-4'>
            <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='email' className='mb-1'>Email</Label>
                <Input 
                    id='email'
                    name='email'
                    placeholder='Enter your email...'
                    type='email'
                    required
                    disabled={isPending}
                />
                <Label htmlFor='password' className='mb-1'>Password</Label>
                <Input 
                    id='password'
                    name='password'
                    placeholder='Enter your password...'
                    type='password'
                    required
                    disabled={isPending}
                />
            </div>
        </CardContent>
        <CardFooter className='mt-4 flex flex-col gap-4'>
            <Button className='w-full'>
                {
                    isPending ? (
                        <Loader2 className='animate-spin'/>
                    ) : isLoginForm ? (
                        "Login"
                    ) : "Signup"
                }
            </Button>
            <p>
                {isLoginForm ? ("Don't have and account yet?") : ("Already have an account?")}{" "}
                <Link href={isLoginForm ? "/sign-up" : "/login"} className={`text-blue-500 underline ${isPending ? "pointer-events-none opacity-50" : ""}`}>
                    {isLoginForm ? "Signup" : "Login"}
                </Link>
            </p>
        </CardFooter>
    </form>
  )
}

export default AuthForm