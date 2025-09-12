import AuthForm from '@/components/AuthForm'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

function SignupPage() {
  return (
    <div className='mt-20 flex flex-col flex-1 items-center'>
        <Card className='w-full md:w-[50%] min-w-md'>
            <CardHeader className='mb-4'>
                <CardTitle className='text-3xl text-center '>Signup</CardTitle>
                <AuthForm type="signup" />
            </CardHeader>
        </Card>
    </div>
  )
}

export default SignupPage