import Link from "next/link"
import { CalendarIcon, Plus } from "lucide-react"
import { Button } from "../../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table"
import { Badge } from "../../../components/ui/badge"

// Sample project data
const projects = [
  {
    id: 1,
    name: "Consumer Preferences Study 1",
    status: "active",
    responses: 150,
    target: 500,
    startDate: "Apr 1, 2025",
    endDate: "Apr 30, 2025",
  },
  {
    id: 2,
    name: "Consumer Preferences Study 2",
    status: "active",
    responses: 210,
    target: 500,
    startDate: "Apr 2, 2025",
    endDate: "May 2, 2025",
  },
  {
    id: 3,
    name: "Consumer Preferences Study 3",
    status: "active",
    responses: 180,
    target: 500,
    startDate: "Apr 3, 2025",
    endDate: "May 3, 2025",
  },
  {
    id: 4,
    name: "Consumer Preferences Study 4",
    status: "active",
    responses: 270,
    target: 500,
    startDate: "Apr 4, 2025",
    endDate: "May 4, 2025",
  },
  {
    id: 11,
    name: "Brand Perception Study 1",
    status: "completed",
    responses: 450,
    target: 450,
    startDate: "Mar 6, 2025",
    endDate: "Mar 31, 2025",
  },
  {
    id: 12,
    name: "Brand Perception Study 2",
    status: "completed",
    responses: 460,
    target: 450,
    startDate: "Mar 7, 2025",
    endDate: "Mar 31, 2025",
  },
  {
    id: 21,
    name: "Product Testing 1",
    status: "draft",
    responses: 0,
    target: 600,
    startDate: "May 11, 2025",
    endDate: "Jun 11, 2025",
  },
  {
    id: 22,
    name: "Product Testing 2",
    status: "draft",
    responses: 0,
    target: 600,
    startDate: "May 12, 2025",
    endDate: "Jun 12, 2025",
  },
]

export default function ProjectsPage() {
  return (
    <div className="flex flex-col gap-8 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">Manage your market research projects</p>
        </div>
        <Button asChild className="bg-primary hover:bg-primary/90">
          <Link href="/dashboard/new-project">
            <Plus className="mr-2 h-4 w-4" /> New Project
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Projects</CardTitle>
          <CardDescription>View and manage all your research projects</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Responses</TableHead>
                <TableHead>Timeline</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">{project.name}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        project.status === "active" ? "default" : project.status === "completed" ? "success" : "outline"
                      }
                      className={project.status === "active" ? "bg-primary hover:bg-primary/80" : ""}
                    >
                      {project.status === "active" ? "Active" : project.status === "completed" ? "Completed" : "Draft"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>
                        {project.responses}/{project.target}
                      </span>
                      <div className="mt-1 h-2 w-24 rounded-full bg-secondary">
                        <div
                          className="h-2 rounded-full bg-primary"
                          style={{
                            width: `${(project.responses / project.target) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>
                        {project.startDate} - {project.endDate}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    {project.status === "active" ? (
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/dashboard/projects/${project.id}`}>View Details</Link>
                      </Button>
                    ) : project.status === "completed" ? (
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/dashboard/projects/${project.id}`}>View Report</Link>
                      </Button>
                    ) : (
                      <div className="flex justify-end gap-2">
                        <Button asChild variant="outline" size="sm">
                          <Link href={`/dashboard/projects/${project.id}/edit`}>Edit</Link>
                        </Button>
                        <Button asChild size="sm">
                          <Link href={`/dashboard/projects/${project.id}/launch`}>Launch</Link>
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

