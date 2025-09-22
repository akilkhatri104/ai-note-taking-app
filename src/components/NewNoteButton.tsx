'use client'
import React, { useState } from 'react'
import {User} from "@supabase/supabase-js"
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import {v4 as uuidv4} from 'uuid'
import { toast } from 'sonner'
import { debounceTimeout } from '@/lib/constants'
import { createNoteAction } from '@/actions/notes'

type Props = {
    user: User | null
}

function NewNoteButton({user} : Props) {
    console.log(user)
    const router = useRouter()
    const [loading,setLoading] = useState(false)
    const handleClickNewNoteButton = async () => {
        if(!user){
            router.push('/login')
        }else{
            setLoading(true)

            await new Promise((resolve) => {
                setTimeout(resolve,debounceTimeout+500)
            })

            const uuid = uuidv4()
            await createNoteAction(uuid)
            router.push(`/?noteId=${uuid}`)

            toast.success("New note created!")
            setLoading(false)
        }

    }
  return (
    <Button
    onClick={handleClickNewNoteButton}
    variant={'outline'}
    disabled={loading}
    >
        {loading ? (<Loader2 className='animate-spin'/>) : "New Note"}
    </Button>
  )
}

export default NewNoteButton