'use client'

import { Button } from '@/components/ui/button'
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
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { zodResolver } from '@hookform/resolvers/zod'
import { Copy } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Label } from './ui/label'

const formSchema = z.object({
  url: z.string().min(1, {
    message: 'Long URL is required',
  }),
})

export function UrlShortenerForm() {
  const [shortUrl, setShortUrl] = useState('')
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: 'https://amnilrnd.io/',
    },
  })

  const onSubmit = async ({ url }: z.infer<typeof formSchema>) => {
    console.log('🚀 ~ handleSubmit ~ url:', url)
    try {
      const response = await fetch('/api/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      })

      const data = await response.json()
      console.log('🚀 ~ handleSubmit ~ data:', data)

      setShortUrl(data.shortUrl)
    } catch {
      console.log('An error occurred while shortening the URL')
    }
  }

  return (
    <Card className="max-w-screen-sm w-full">
      <CardHeader>
        <CardTitle>URL Shortner</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-md">
                    Full Url
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the url that is relevant to app route.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Shorten URL
            </Button>
          </form>
        </Form>
      </CardContent>

      {shortUrl.length !== 0 && (
        <>
          <Separator />
          <CardFooter className="mt-4">
            <div className="w-full">
              <Label className="font-semibold">Short Url:</Label>
              <div className="flex gap-2 items-center mt-2">
                <Input value={shortUrl} readOnly className="flex w-full" />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    navigator.clipboard.writeText(shortUrl)
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
