'use client'

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useState } from 'react'
import { Separator } from './ui/separator'
import { Label } from './ui/label'
import { toast } from 'sonner'
import { Copy } from 'lucide-react'

const formSchema = z.object({
  url: z.string().min(1, {
    message: 'Long URL is required',
  }),
})

export const UrlExpanderForm = () => {
  const [longUrl, setLongUrl] = useState('')
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: '',
    },
  })

  const onSubmit = async ({ url }: z.infer<typeof formSchema>) => {
    console.log('🚀 ~ handleSubmit ~ url:', url)
    try {
      const response = await fetch('/api/expand', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      })

      const data = await response.json()
      console.log('🚀 ~ handleSubmit ~ data:', data)

      setLongUrl(data.originalUrl)
    } catch {
      console.log('An error occurred while shortening the URL')
    }
  }

  return (
    <Card className="max-w-screen-sm w-full">
      <CardHeader>
        <CardTitle>URL Expander</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short Url</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com" {...field} />
                  </FormControl>
                  <FormDescription>Enter Short Url to expand</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Expand URL
            </Button>
          </form>
        </Form>
      </CardContent>

      {longUrl.length !== 0 && (
        <>
          <Separator />
          <CardFooter className="mt-4">
            <div className="w-full">
              <Label className="font-semibold">Short Url:</Label>
              <div className="flex gap-2 items-center mt-2">
                <Input value={longUrl} readOnly className="flex w-full" />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    navigator.clipboard.writeText(longUrl)
                    toast.success('Copied to clipboard')
                  }}
                >
                  <Copy />
                </Button>
              </div>
            </div>
          </CardFooter>
        </>
      )}
    </Card>
  )
}
