'use client'
import React, { Fragment, useRef, useState, useTransition } from 'react'
import { User } from "@supabase/supabase-js"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useRouter } from 'next/navigation'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { ArrowUpIcon } from 'lucide-react'
import { askAIAboutNotesAction } from '@/actions/notes'
import '@/styles/ai-response.css'

type Props = {
  user: User | null
}

function AskAIButton({ user }: Props) {
  console.log(user)
  const [open,setOpen] = useState(false)
  const router = useRouter()
  const [isPending,startTransition] = useTransition()
  const [questionText, setQuestionText] = useState("")
  const [questions, setQuestions] = useState<string[]>([])
  const [responses, setResponses] = useState<string[]>([])

  

  const handleOpenChange = (isOpen:boolean) => {
    if(!user){
      router.push('/login')
    } else {
      if(isOpen){
        setQuestionText("")
        setQuestions([])
        setResponses([])
      }
      setOpen(isOpen)
    }
  }

  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const handleInput = () => {
    const textArea = textAreaRef.current
    if(!textArea) return

    textArea.style.height = 'auto'
    textArea.style.height = `${textArea.scrollHeight}px`
  }

  const handleClickInput = () => {
    textAreaRef.current?.focus()
  }

  const handleSubmit = () => {
    if(!questionText.trim()) return

    const newQuestions = [...questions,questionText]
    setQuestions(newQuestions)
    setQuestionText("")
    setTimeout(scrollToBottom,100)

    startTransition(async() => {
      const response = await askAIAboutNotesAction(newQuestions,responses)
      setResponses(prev => [...prev,response])

      setTimeout(scrollToBottom,100)
    })
  }

  const scrollToBottom = () => {
    contentRef?.current?.scrollTo({
      top: contentRef.current.scrollHeight,
      behavior: "smooth"
    })
  }

  const handleKeyDown = (e : React.KeyboardEvent<HTMLTextAreaElement>) => {
    if(e.key == "Enter" && !e.shiftKey){
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant={'secondary'}>
          Ask AI
        </Button>
      </DialogTrigger>
      <DialogContent className='flex h-[85vh] max-w-4xl flex-col overflow-y-auto' ref={contentRef}>
        <DialogHeader>
          <DialogTitle>Ask AI About Your Notes!</DialogTitle>
          <DialogDescription>
            Our AI can answer all the questions about your notes!
          </DialogDescription>
        </DialogHeader>

        <div className='mt-4 flex flex-col gap-8'>
          {questions.map((question,index) => 
            <Fragment key={index}>
              <p className='ml-auto max-w-[60%] rounded-md bg-muted px-2 py-1 text-sm text-muted-foreground'>
                {question}  
              </p>
              {
                responses[index] && (
                  <p 
                    className='bot-response text-sm text-muted-foreground'
                    dangerouslySetInnerHTML={{__html: responses[index]}}
                  />
                )
              }
            </Fragment>
          )}
          {isPending && <p className='animate-pulse text-sm'>Thinking....</p>}
        </div>

        <div className='mt-auto flex cursor-text flex-col rounded-lg border p-4'
          onClick={handleClickInput}
        >
          <Textarea 
            ref={textAreaRef}
            placeholder='Ask me anything about your notes...'
            className='resize-none rounded-none border-none bg-transparent p-0 shadow-none placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0'
            style={{
              minHeight: "0",
              lineHeight: "normal"
            }}
            rows={1}
            onInput={handleInput}
            onKeyDown={handleKeyDown}
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
          />
          <Button className='ml-auto size-8 rounded-full'>
            <ArrowUpIcon className='text-background' />
          </Button>
        </div>

      </DialogContent>
    </Dialog>
  )
}

export default AskAIButton