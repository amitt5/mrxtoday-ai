import Link from "next/link"
import { ArrowRight, BarChart3, Clock, Database } from "lucide-react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">mrxtoday.ai</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium hover:underline">
              Log In
            </Link>
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link href="/register">Sign Up</Link>
            </Button>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  AI-Powered Market Research
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Transform text-based questionnaires into structured online surveys with real-time quota management and
                  live data analysis.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                  <Link href="/register">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="#features">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-secondary/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Key Features</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Streamline your market research process with our powerful tools.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                <Card className="border-2 border-muted">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2">
                      <Database className="h-5 w-5 text-primary" />
                      Real-time Quota Implementation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Set and manage quotas for demographics and other criteria with real-time enforcement.
                    </CardDescription>
                  </CardContent>
                </Card>
                <Card className="border-2 border-muted">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-primary" />
                      Live Data Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Analyze raw responses in real-time with powerful visualization tools.
                    </CardDescription>
                  </CardContent>
                </Card>
                <Card className="border-2 border-muted">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      Rapid Deployment
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Convert text questionnaires to structured surveys in seconds with AI.
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Pricing</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Choose the plan that fits your research needs.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Starter</CardTitle>
                    <CardDescription>For small research teams</CardDescription>
                    <div className="mt-4 text-4xl font-bold">
                      $99<span className="text-sm font-normal text-muted-foreground">/month</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-left">
                      <li className="flex items-center">
                        <span className="mr-2 text-primary">✓</span>
                        <span>Up to 5 projects</span>
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2 text-primary">✓</span>
                        <span>500 responses per month</span>
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2 text-primary">✓</span>
                        <span>Basic quota management</span>
                      </li>
                    </ul>
                    <Button className="mt-6 w-full bg-primary hover:bg-primary/90">Get Started</Button>
                  </CardContent>
                </Card>
                <Card className="border-2 border-primary">
                  <CardHeader>
                    <CardTitle>Professional</CardTitle>
                    <CardDescription>For growing research teams</CardDescription>
                    <div className="mt-4 text-4xl font-bold">
                      $299<span className="text-sm font-normal text-muted-foreground">/month</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-left">
                      <li className="flex items-center">
                        <span className="mr-2 text-primary">✓</span>
                        <span>Up to 20 projects</span>
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2 text-primary">✓</span>
                        <span>2,000 responses per month</span>
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2 text-primary">✓</span>
                        <span>Advanced quota management</span>
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2 text-primary">✓</span>
                        <span>Live data analysis</span>
                      </li>
                    </ul>
                    <Button className="mt-6 w-full bg-primary hover:bg-primary/90">Get Started</Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Enterprise</CardTitle>
                    <CardDescription>For large research organizations</CardDescription>
                    <div className="mt-4 text-4xl font-bold">Custom</div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-left">
                      <li className="flex items-center">
                        <span className="mr-2 text-primary">✓</span>
                        <span>Unlimited projects</span>
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2 text-primary">✓</span>
                        <span>Unlimited responses</span>
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2 text-primary">✓</span>
                        <span>Custom integrations</span>
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2 text-primary">✓</span>
                        <span>Dedicated support</span>
                      </li>
                    </ul>
                    <Button variant="outline" className="mt-6 w-full">
                      Contact Sales
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6 bg-background">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            <span className="text-lg font-semibold">mrxtoday.ai</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2025 mrxtoday.ai. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:underline">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:underline">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

