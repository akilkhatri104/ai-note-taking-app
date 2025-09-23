'use client'
import { useRouter } from 'next/navigation'
import React, { useTransition } from 'react'
import { CardContent, CardFooter } from './ui/card'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { error } from 'console'
import { toast } from 'sonner'
import { loginAction, signupAction } from '@/actions/users'

type Props = {
    type: "login" | "signup"
}

function AuthForm({type} : Props) {
    const isLoginForm = type === 'login'
    const router = useRouter()
    const [isPending,startTransition] = useTransition()
    const handleSubmit = async (formData : FormData) => {
        
        startTransition(async () => {
            const email = formData.get("email") as string
            const password = formData.get("password") as string

            let errorMessage: string | null;
            let title: string | null;
            let description: string | null;

            if(isLoginForm){
                errorMessage = (await loginAction(email,password))?.errorMessage || null
                title = "Logged in!"
                description = "You have successfully logged in!"
            } else {
                errorMessage = (await signupAction(email,password)).errorMessage
                title = "Signed up!"
                description = "Check your email for confirmation link."
            }

            if(!errorMessage){
                toast.success(title,{
                    description
                })
                router.replace("/")
            }else{
                toast.error("Error",{
                    description: errorMessage
                })
            }
        })
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