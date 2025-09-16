import { getUser } from "@/app/auth/server"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar"
import { prisma } from "@/db/prisma"
import { Note } from "@prisma/client"
import Link from "next/link"
import SidebarGroupContent from "./SidebarGroupContent"

export async function AppSidebar() {
    const user = await getUser()

    let notes : Note[] = []

    if(user){
        notes = await prisma.note.findMany({
            where: {
                authorId: user.id
            },
            orderBy: {
                updatedAt: "desc"
            }
        })
    }
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
            <SidebarGroupLabel className="mb-2 mt-2 text-lg font-semibold">
                {user ? ("Your Notes") : (
                    <p>
                        <Link href={'/login'} className="underline">
                            Login
                        </Link>{" "}
                        to see your notes
                    </p>
                )}
            </SidebarGroupLabel>
            <SidebarGroupContent notes={notes}/>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}