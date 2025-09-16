import React from 'react'
import {User} from "@supabase/supabase-js"

type Props = {
    user: User | null
}

function NewNoteButton({user} : Props) {
    console.log(user)
  return (
    <div>NewNoteButton</div>
  )
}

export default NewNoteButton