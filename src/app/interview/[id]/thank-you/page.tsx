import Link from "next/link"
import { BarChart3, CheckCircle } from "lucide-react"
import { Button } from "../../../../components/ui/button"

export default function ThankYouPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">mrxtoday.ai</span>
          </div>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center p-4">
        <div className="mx-auto max-w-md text-center">
          <CheckCircle className="mx-auto mb-4 h-16 w-16 text-primary" />
          <h1 className="mb-2 text-3xl font-bold">Thank You!</h1>
          <p className="mb-6 text-muted-foreground">
            Your responses have been successfully submitted. We appreciate your participation in our research study.
          </p>
          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link href="/">Return to Homepage</Link>
          </Button>
        </div>
      </main>
    </div>
  )
}

