"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { BarChart3, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card"
import { RadioGroup, RadioGroupItem } from "../../../components/ui/radio-group"
import { Label } from "../../../components/ui/label"
import { Textarea } from "../../../components/ui/textarea"
import { Progress } from "../../../components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/lib/supabaseClient"

interface Question {
  id: number;
  type: "multiple_choice" | "open_ended" | "scale";
  question: string;
  options?: string[];
  min?: number;
  max?: number;
  minLabel?: string;
  maxLabel?: string;
}

interface Questionnaire {
  id: string;
  project_id: string;
  questionnaire_json: Question[];
  status: string;
  created_at: string;
  updated_at: string;
}

// Sample questionnaire data
const questionnaire1 = [
  {
    id: 1,
    type: "multiple_choice",
    question: "How often do you purchase our product?",
    options: ["Daily", "Weekly", "Monthly", "Rarely", "Never"],
  },
  {
    id: 2,
    type: "multiple_choice",
    question: "How satisfied are you with our product quality?",
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

export default function InterviewPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [questionnaire, setQuestionnaire] = useState<Question[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, any>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const projectId = params.id
  const question = questionnaire[currentQuestion]
  const progress = questionnaire.length ? ((currentQuestion + 1) / questionnaire.length) * 100 : 0

  useEffect(() => {
    async function fetchQuestionnaire() {
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

        const response = await fetch(`/api/questionnaires?projectId=${projectId}`, {
          headers: {
            'Authorization': `Bearer ${session.access_token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch questionnaire');
        }

        const data: Questionnaire = await response.json();
        if (data?.questionnaire_json) {
          setQuestionnaire(data.questionnaire_json);
        }
      } catch (error) {
        console.error('Error fetching questionnaire:', error);
        toast({
          title: "Error",
          description: "Failed to load questionnaire",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }

    fetchQuestionnaire();
  }, [projectId, toast]);

  const handleAnswer = (value: any) => {
    if (question?.id) {
      setAnswers({ ...answers, [question.id]: value })
    }
  }

  const handleNext = () => {
    if (currentQuestion < questionnaire.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      handleSubmit()
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('No session found');
      }

      const response = await fetch(`/api/interviews/${projectId}/submit`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify({ answers }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit answers');
      }

      toast({
        title: "Survey completed",
        description: "Thank you for participating in our survey!",
      })

      router.push(`/interview/${projectId}/thank-you`)
    } catch (error) {
      console.error('Error submitting answers:', error);
      toast({
        title: "Submission failed",
        description: "There was an error submitting your responses. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!questionnaire.length) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">No Questionnaire Found</h1>
          <p className="text-muted-foreground">The questionnaire you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  const isAnswered = question?.id && (answers[question.id] !== undefined)

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

      <main className="flex-1">
        <div className="container mx-auto max-w-3xl py-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">Consumer Preferences Study {projectId}</h1>
            <div className="mt-4">
              <div className="flex justify-between text-sm">
                <span>
                  Question {currentQuestion + 1} of {questionnaire.length}
                </span>
                <span>{Math.round(progress)}% complete</span>
              </div>
              <Progress value={progress} className="mt-2" />
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">{question.question}</CardTitle>
              {question.type === "scale" && (
                <CardDescription>
                  On a scale from {question.min} to {question.max}, where {question.min} means "{question.minLabel}" and{" "}
                  {question.max} means "{question.maxLabel}"
                </CardDescription>
              )}
            </CardHeader>
            <CardContent>
              {question.type === "multiple_choice" && (
                <RadioGroup value={answers[question.id]} onValueChange={handleAnswer} className="space-y-3">
                  {question.options?.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={`option-${index}`} />
                      <Label htmlFor={`option-${index}`}>{option}</Label>
                    </div>
                  ))}
                </RadioGroup>
              )}

              {question.type === "open_ended" && (
                <Textarea
                  placeholder="Type your answer here..."
                  value={answers[question.id] || ""}
                  onChange={(e) => handleAnswer(e.target.value)}
                  className="min-h-[150px]"
                />
              )}

              {question.type === "scale" && (
                <div className="mt-4">
                  <div className="flex justify-between">
                    <span className="text-sm">{question.minLabel}</span>
                    <span className="text-sm">{question.maxLabel}</span>
                  </div>
                  <div className="mt-2 flex justify-between">
                    {Array.from({ length: (question.max || 0) - (question.min || 0) + 1 }).map((_, index) => (
                      <Button
                        key={index}
                        variant={answers[question.id] === index + (question.min || 0) ? "default" : "outline"}
                        className={`h-10 w-10 rounded-full p-0 ${answers[question.id] === index + (question.min || 0) ? "bg-primary hover:bg-primary/90" : ""}`}
                        onClick={() => handleAnswer(index + (question.min || 0))}
                      >
                        {index + (question.min || 0)}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0}>
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>

              <Button
                onClick={handleNext}
                disabled={!isAnswered || isSubmitting}
                className="bg-primary hover:bg-primary/90"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : currentQuestion === questionnaire.length - 1 ? (
                  "Submit"
                ) : (
                  <>
                    Next
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}

