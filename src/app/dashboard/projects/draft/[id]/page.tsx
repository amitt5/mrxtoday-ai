"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Loader2, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/lib/supabaseClient"

export default function ProjectEditDraftPage() {
  const params = useParams()
  const projectId = params.id
  const router = useRouter()
  const { toast } = useToast()
  
  const [isLoading, setIsLoading] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [projectName, setProjectName] = useState("")
  const [totalRespondents, setTotalRespondents] = useState("")
  const [questionnaire, setQuestionnaire] = useState("")
  const [activeTab, setActiveTab] = useState("text")

  // Add states for other fields
  const [minAge, setMinAge] = useState("18")
  const [maxAge, setMaxAge] = useState("65")
  const [minMaleQuota, setMinMaleQuota] = useState("")
  const [maxMaleQuota, setMaxMaleQuota] = useState("")
  const [minFemaleQuota, setMinFemaleQuota] = useState("")
  const [maxFemaleQuota, setMaxFemaleQuota] = useState("")
  const [minAsu30Quota, setMinAsu30Quota] = useState("")
  const [maxAsu30Quota, setMaxAsu30Quota] = useState("")
  const [minAso30Quota, setMinAso30Quota] = useState("")
  const [maxAso30Quota, setMaxAso30Quota] = useState("")
  const [projectType, setProjectType] = useState("consumer")

  useEffect(() => {
    async function fetchProjectDetails() {
      if (projectId === 'new') return;

      setIsLoading(true);
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          toast({
            title: "Authentication error",
            description: "Please sign in to continue",
            variant: "destructive",
          });
          return;
        }

        const response = await fetch(`/api/projects/${projectId}`, {
          headers: {
            'Authorization': `Bearer ${session.access_token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch project details');
        }

        const project = await response.json();
        
        // Populate all the fields with project data
        setProjectName(project.name || "");
        setTotalRespondents(project.total_respondents?.toString() || "");
        setProjectType(project.project_type || "consumer");
        setMinAge(project.min_age?.toString() || "18");
        setMaxAge(project.max_age?.toString() || "65");
        setMinMaleQuota(project.min_male_quota?.toString() || "");
        setMaxMaleQuota(project.max_male_quota?.toString() || "");
        setMinFemaleQuota(project.min_female_quota?.toString() || "");
        setMaxFemaleQuota(project.max_female_quota?.toString() || "");
        setMinAsu30Quota(project.min_asu30_quota?.toString() || "");
        setMaxAsu30Quota(project.max_asu30_quota?.toString() || "");
        setMinAso30Quota(project.min_aso30_quota?.toString() || "");
        setMaxAso30Quota(project.max_aso30_quota?.toString() || "");
        setQuestionnaire(project.questionnaire || "");

      } catch (error) {
        console.error('Error fetching project:', error);
        toast({
          title: "Error",
          description: "Failed to fetch project details",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }

    fetchProjectDetails();
  }, [projectId, toast]);

  const handleGenerate = async () => {
    if (!projectName) {
      toast({
        title: "Missing project name",
        description: "Please enter a project name",
        variant: "destructive",
      })
      return
    }

    // if (!questionnaire && activeTab === "text") {
    //   toast({
    //     title: "Missing questionnaire",
    //     description: "Please enter your questionnaire text",
    //     variant: "destructive",
    //   })
    //   return
    // }

    setIsGenerating(true)

    try {
      // In a real app, this would call the OpenAI API to generate the questionnaire
      // const response = await fetch('/api/generate-questionnaire', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ questionnaire, projectName, totalRespondents }),
      // })

      // Simulate API call
    //   await new Promise((resolve) => setTimeout(resolve, 2000))

    //   toast({
    //     title: "Questionnaire generated",
    //     description: "Your project has been created successfully",
    //   })

    //   router.push("/dashboard/projects")
    } catch (error) {
      toast({
        title: "Generation failed",
        description: "There was an error generating your questionnaire",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const handleSaveProject = async () => {
    if (!projectName) {
      toast({
        title: "Missing project name",
        description: "Please enter a project name",
        variant: "destructive",
      })
      return
    }

    setIsSaving(true)

    try {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();

      // In a real app, this would call an API to save the project
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify({
          projectName,
          totalRespondents,
          // questionnaire: activeTab === "text" ? questionnaire : null,
          // other project details
        }),
      })

      // const response = await fetch('/api/businesses', {
      //   method: 'POST',
      //   headers: {
      //       'Content-Type': 'application/json',
      //       'Authorization': `Bearer ${session.access_token}`,
      //   },
      //   body: JSON.stringify({
      //       business_name: 'businessName'.trim(),
      //       google_place_id: 'place.place_id',
      //   }),
      // });

      if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Failed to save project details');
      } else {
          alert('Project details saved successfully!');
      }   


      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Project saved",
        description: "Your project has been saved successfully",
      })

      router.push("/dashboard/projects")
    } catch (error) {
      toast({
        title: "Save failed",
        description: "There was an error saving your project",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl p-8">
      <h1 className="mb-6 text-3xl font-bold">
        {projectId === 'new' ? 'Create New Project' : 'Edit Project'}
      </h1>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
            <CardDescription>Enter the basic information about your research project</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="project-name">Project Name</Label>
              <Input
                id="project-name"
                placeholder="e.g., Consumer Preferences Study 2025"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="total-respondents">Total Respondents</Label>
                <Input
                  id="total-respondents"
                  type="number"
                  min="1"
                  value={totalRespondents}
                  onChange={(e) => setTotalRespondents(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="project-type">Project Type</Label>
                <Select value={projectType} onValueChange={setProjectType}>
                  <SelectTrigger id="project-type">
                    <SelectValue placeholder="Select project type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="consumer">Consumer Survey</SelectItem>
                    <SelectItem value="product">Product Testing</SelectItem>
                    <SelectItem value="brand">Brand Perception</SelectItem>
                    <SelectItem value="market">Market Analysis</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="min-age">Minimum Age</Label>
                <Input id="min-age" type="number" min="18" max="99" defaultValue="18" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="max-age">Maximum Age</Label>
                <Input id="max-age" type="number" min="18" max="99" defaultValue="65" />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-base font-medium">Gender Quota</Label>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="min-male-quota" className="text-sm">
                        Min Male
                      </Label>
                      <Input id="min-male-quota" type="number"/>
                    </div>
                    <div>
                      <Label htmlFor="max-male-quota" className="text-sm">
                        Max Male
                      </Label>
                      <Input id="max-male-quota" type="number"/>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="min-female-quota" className="text-sm">
                        Min Female
                      </Label>
                      <Input id="min-female-quota" type="number" />
                    </div>
                    <div>
                      <Label htmlFor="max-female-quota" className="text-sm">
                        Max Female
                      </Label>
                      <Input id="max-female-quota" type="number" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-base font-medium">Age Quota</Label>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="min-asu30-quota" className="text-sm">
                        Min ASU30
                      </Label>
                      <Input id="min-asu30-quota" type="number"  />
                    </div>
                    <div>
                      <Label htmlFor="max-asu30-quota" className="text-sm">
                        Max ASU30
                      </Label>
                      <Input id="max-asu30-quota" type="number"  />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="min-aso30-quota" className="text-sm">
                        Min ASO30
                      </Label>
                      <Input id="min-aso30-quota" type="number"  />
                    </div>
                    <div>
                      <Label htmlFor="max-aso30-quota" className="text-sm">
                        Max ASO30
                      </Label>
                      <Input id="max-aso30-quota" type="number"  />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Questionnaire</CardTitle>
            <CardDescription>Enter your questionnaire text or upload a document</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4 bg-secondary">
                <TabsTrigger value="text">Enter Text</TabsTrigger>
                <TabsTrigger value="upload">Upload Document</TabsTrigger>
              </TabsList>

              <TabsContent value="text" className="space-y-4">
                <Textarea
                  placeholder="Enter your questionnaire text here..."
                  className="min-h-[300px]"
                  value={questionnaire}
                  onChange={(e) => setQuestionnaire(e.target.value)}
                />
              </TabsContent>

              <TabsContent value="upload" className="space-y-4">
                <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-12">
                  <Upload className="mb-4 h-10 w-10 text-muted-foreground" />
                  <h3 className="mb-2 text-lg font-medium">Upload your document</h3>
                  <p className="mb-4 text-sm text-muted-foreground">Drag and drop or click to upload</p>
                  <Button variant="outline">Select File</Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="flex justify-end space-x-4">
          <Button variant="outline" onClick={() => router.push("/dashboard")}>
            Cancel
          </Button>
          <Button variant="outline" onClick={handleGenerate} disabled={isGenerating || isSaving}>
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              "Generate Questionnaire"
            )}
          </Button>
          <Button
            onClick={handleSaveProject}
            disabled={isGenerating || isSaving}
            className="bg-primary hover:bg-primary/90"
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Project"
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}