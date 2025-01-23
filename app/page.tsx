import { Separator } from '@/components/ui/separator'
import { UrlExpanderForm } from '@/components/url-expander-form'
import { UrlShortenerForm } from '@/components/url-shortener-form'

export default function Home() {
  return (
    <div className="flex flex-col h-screen w-full items-center justify-center gap-8">
      <UrlShortenerForm />
      <Separator />
      <UrlExpanderForm />
    </div>
  )
}
