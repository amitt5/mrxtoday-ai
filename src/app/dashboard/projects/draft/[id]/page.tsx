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
// import OpenAI from "openai";

export default function ProjectEditDraftPage() {
  const params = useParams()
  const projectId = params.id
  const router = useRouter()
  const { toast } = useToast()

  const questionnaire = [
    {
      id: 1,
      type: "multiple_choice",
      question: "How often do you purchase this product?",
      options: ["Daily", "Weekly", "Monthly", "Rarely", "Never"],
    },
    {
      id: 2,
      type: "multiple_choice",
      question: "How satisfied are you with the product taste?",
      options: ["Very satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very dissatisfied"],
    },
    {
      id: 3,
      type: "open_ended",
      question: "What features would you like to see improved?",
    },
    {
      id: 4,
      type: "scale",
      question: "How likely are you to recommend our product to others?",
      min: 0,
      max: 10,
      minLabel: "Not at all likely",
      maxLabel: "Extremely likely",
    },
    {
      id: 5,
      type: "open_ended",
      question: "What other brands do you consider when purchasing this type of product?",
    },
  ]
  
  const [isLoading, setIsLoading] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [projectName, setProjectName] = useState("")
  const [totalRespondents, setTotalRespondents] = useState("")
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

  const handleTestQuestionnaire = async () => {
    console.log("Test questionnaire")
    // TODO: Implement the logic to test the questionnaire
  }

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

      toast({
        title: "Questionnaire generated",
        description: "Your project has been created successfully",
      })

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
      if (!session) {
        throw new Error('No session found');
      }

      const projectData = {
        projectName,
        totalRespondents,
        projectType,
        minAge,
        maxAge,
        minMaleQuota,
        maxMaleQuota,
        minFemaleQuota,
        maxFemaleQuota,
        minAsu30Quota,
        maxAsu30Quota,
        minAso30Quota,
        maxAso30Quota,
      };

      const isNewProject = projectId === 'new';
      const url = isNewProject ? '/api/projects' : `/api/projects/${projectId}`;
      const method = isNewProject ? 'POST' : 'PATCH';

      const response = await fetch(url, {
        method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify(projectData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to save project details');
      }

      toast({
        title: "Success",
        description: `Project ${isNewProject ? 'created' : 'updated'} successfully`,
      });

      router.push("/dashboard/projects");
    } catch (error) {
      console.error('Error saving project:', error);
      toast({
        title: "Save failed",
        description: error instanceof Error ? error.message : "There was an error saving your project",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

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
                <Input
                  id="min-age"
                  type="number"
                  min="18"
                  max="99"
                  value={minAge}
                  onChange={(e) => setMinAge(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="max-age">Maximum Age</Label>
                <Input
                  id="max-age"
                  type="number"
                  min="18"
                  max="99"
                  value={maxAge}
                  onChange={(e) => setMaxAge(e.target.value)}
                />
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
                      <Input
                        id="min-male-quota"
                        type="number"
                        value={minMaleQuota}
                        onChange={(e) => setMinMaleQuota(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="max-male-quota" className="text-sm">
                        Max Male
                      </Label>
                      <Input
                        id="max-male-quota"
                        type="number"
                        value={maxMaleQuota}
                        onChange={(e) => setMaxMaleQuota(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="min-female-quota" className="text-sm">
                        Min Female
                      </Label>
                      <Input
                        id="min-female-quota"
                        type="number"
                        value={minFemaleQuota}
                        onChange={(e) => setMinFemaleQuota(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="max-female-quota" className="text-sm">
                        Max Female
                      </Label>
                      <Input
                        id="max-female-quota"
                        type="number"
                        value={maxFemaleQuota}
                        onChange={(e) => setMaxFemaleQuota(e.target.value)}
                      />
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
                      <Input
                        id="min-asu30-quota"
                        type="number"
                        value={minAsu30Quota}
                        onChange={(e) => setMinAsu30Quota(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="max-asu30-quota" className="text-sm">
                        Max ASU30
                      </Label>
                      <Input
                        id="max-asu30-quota"
                        type="number"
                        value={maxAsu30Quota}
                        onChange={(e) => setMaxAsu30Quota(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="min-aso30-quota" className="text-sm">
                        Min ASO30
                      </Label>
                      <Input
                        id="min-aso30-quota"
                        type="number"
                        value={minAso30Quota}
                        onChange={(e) => setMinAso30Quota(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="max-aso30-quota" className="text-sm">
                        Max ASO30
                      </Label>
                      <Input
                        id="max-aso30-quota"
                        type="number"
                        value={maxAso30Quota}
                        onChange={(e) => setMaxAso30Quota(e.target.value)}
                      />
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
          <Button variant="outline" onClick={handleTestQuestionnaire} disabled={isGenerating || isSaving}>
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              "Test Questionnaire"
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