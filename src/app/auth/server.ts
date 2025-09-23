import { createServerClient } from '@supabase/ssr'
import { AuthError } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { toast } from 'sonner'

export async function createClient() {
  const cookieStore = await cookies()

  const client = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )

  return client
}

export async function getUser(){
    try {
      const {auth} = await createClient()
  
      const userObject = await auth.getUser()
  
      if(userObject.error){
          throw userObject.error
      }
  
      return {
        user:userObject.data.user
      }
    } catch (error: any) {
      return {
        errorMessage: error?.message
      }
    }
}