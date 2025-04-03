"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ArrowLeft, BarChart3, Copy, Download, Share2, Users } from "lucide-react"
import { Button } from "../../../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../components/ui/tabs"
import { Progress } from "../../../../components/ui/progress"
import { useToast } from "@/hooks/use-toast"

export default function ProjectDetailPage() {
  const params = useParams()
  const projectId = params.id
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("overview")

  // In a real app, this would fetch project data from an API
  const project = {
    id: projectId,
    name: `Consumer Preferences Study ${projectId}`,
    status: "active",
    responses: 150,
    target: 500,
    startDate: "Apr 1, 2025",
    endDate: "Apr 30, 2025",
    completionRate: 30,
    interviewLink: `https://mrxtoday.ai/interview/${projectId}`,
    demographics: {
      gender: {
        male: 45,
        female: 52,
        other: 3,
      },
      age: {
        "18-24": 15,
        "25-34": 30,
        "35-44": 25,
        "45-54": 20,
        "55+": 10,
      },
      location: {
        "North America": 60,
        Europe: 25,
        Asia: 10,
        Other: 5,
      },
    },
  }

  const copyInterviewLink = () => {
    navigator.clipboard.writeText(project.interviewLink)
    toast({
      title: "Link copied",
      description: "Interview link copied to clipboard",
    })
  }

  return (
    <div className="flex flex-col gap-8 p-8">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/projects">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">{project.name}</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Responses</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {project.responses}/{project.target}
            </div>
            <Progress value={project.completionRate} className="mt-2" />
            <p className="mt-2 text-xs text-muted-foreground">{project.completionRate}% complete</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Timeline</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Active</div>
            <p className="mt-2 text-xs text-muted-foreground">
              {project.startDate} - {project.endDate}
            </p>
          </CardContent>
        </Card>
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interview Link</CardTitle>
            <Share2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <code className="flex-1 rounded bg-muted px-2 py-1 text-sm">{project.interviewLink}</code>
              <Button variant="outline" size="icon" onClick={copyInterviewLink}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-secondary">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="responses">Responses</TabsTrigger>
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
          <TabsTrigger value="questionnaire">Questionnaire</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Project Overview</CardTitle>
              <CardDescription>Summary of your research project</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h3 className="mb-2 text-lg font-medium">Project Details</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Status:</span>
                        <span className="text-sm">Active</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Start Date:</span>
                        <span className="text-sm">{project.startDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">End Date:</span>
                        <span className="text-sm">{project.endDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Target Responses:</span>
                        <span className="text-sm">{project.target}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-medium">Response Rate</h3>
                    <div className="flex flex-col items-center">
                      <div className="text-4xl font-bold">{project.completionRate}%</div>
                      <Progress value={project.completionRate} className="mt-4 w-full" />
                      <p className="mt-2 text-sm text-muted-foreground">
                        {project.responses} out of {project.target} responses
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Export Data
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="responses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Response Data</CardTitle>
              <CardDescription>View and analyze the responses to your questionnaire</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-[400px] items-center justify-center rounded-md border border-dashed p-8">
                <div className="flex flex-col items-center text-center">
                  <BarChart3 className="mb-4 h-10 w-10 text-muted-foreground" />
                  <h3 className="mb-2 text-lg font-medium">Response Visualization</h3>
                  <p className="mb-4 max-w-md text-sm text-muted-foreground">
                    In a real application, this section would display charts and graphs visualizing the response data
                    for your questionnaire.
                  </p>
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Export Raw Data
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="demographics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Respondent Demographics</CardTitle>
              <CardDescription>Breakdown of respondent demographics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-8 md:grid-cols-3">
                <div>
                  <h3 className="mb-4 text-lg font-medium">Gender</h3>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between">
                        <span className="text-sm">Male</span>
                        <span className="text-sm font-medium">{project.demographics.gender.male}%</span>
                      </div>
                      <Progress value={project.demographics.gender.male} className="mt-1" />
                    </div>
                    <div>
                      <div className="flex justify-between">
                        <span className="text-sm">Female</span>
                        <span className="text-sm font-medium">{project.demographics.gender.female}%</span>
                      </div>
                      <Progress value={project.demographics.gender.female} className="mt-1" />
                    </div>
                    <div>
                      <div className="flex justify-between">
                        <span className="text-sm">Other</span>
                        <span className="text-sm font-medium">{project.demographics.gender.other}%</span>
                      </div>
                      <Progress value={project.demographics.gender.other} className="mt-1" />
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="mb-4 text-lg font-medium">Age</h3>
                  <div className="space-y-2">
                    {Object.entries(project.demographics.age).map(([range, value]) => (
                      <div key={range}>
                        <div className="flex justify-between">
                          <span className="text-sm">{range}</span>
                          <span className="text-sm font-medium">{value}%</span>
                        </div>
                        <Progress value={value as number} className="mt-1" />
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="mb-4 text-lg font-medium">Location</h3>
                  <div className="space-y-2">
                    {Object.entries(project.demographics.location).map(([region, value]) => (
                      <div key={region}>
                        <div className="flex justify-between">
                          <span className="text-sm">{region}</span>
                          <span className="text-sm font-medium">{value}%</span>
                        </div>
                        <Progress value={value as number} className="mt-1" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="questionnaire" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Questionnaire</CardTitle>
              <CardDescription>View the questionnaire for this project</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border p-4">
                <h3 className="mb-4 text-lg font-medium">{project.name}</h3>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h4 className="font-medium">Q1: How often do you purchase our product?</h4>
                    <ul className="ml-6 list-disc space-y-1">
                      <li>Daily</li>
                      <li>Weekly</li>
                      <li>Monthly</li>
                      <li>Rarely</li>
                      <li>Never</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Q2: How satisfied are you with our product quality?</h4>
                    <ul className="ml-6 list-disc space-y-1">
                      <li>Very satisfied</li>
                      <li>Satisfied</li>
                      <li>Neutral</li>
                      <li>Dissatisfied</li>
                      <li>Very dissatisfied</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Q3: What features would you like to see improved?</h4>
                    <p className="text-sm text-muted-foreground">Open-ended question</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Q4: How likely are you to recommend our product to others?</h4>
                    <p className="text-sm text-muted-foreground">Scale: 0-10</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">
                      Q5: What other brands do you consider when purchasing this type of product?
                    </h4>
                    <p className="text-sm text-muted-foreground">Open-ended question</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

