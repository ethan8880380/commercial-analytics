import { Button } from "@/components/ui/button";
import { Header } from "@/app/academy/academy-components/header";
import Hero from "@/app/academy/academy-components/hero";
import { getAcademyData } from '@/utils/excel';
import { Suspense } from 'react';
import { CTA } from "./academy-components/cta";
import Link from 'next/link';
import { Layout408 } from "@/app/academy/academy-components/areas";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Function to convert a string to slug format
function createSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

// Function to determine badge variant based on section name
const getBadgeVariantForSection = (section: string): "default" | "secondary" | "destructive" | "outline" | "purple" | "yellow" | "green" | "red" => {
  const normalizedSection = section.toLowerCase().trim();
  
  if (normalizedSection.includes("professional")) {
    return "green"; // Primary color (blue)
  } else if (normalizedSection.includes("specialty")) {
    return "red"; // Secondary color
  } else if (normalizedSection.includes("expert")) {
    return "yellow"; // Destructive color (red/orange)
  }
  
  // Default fallback
  return "outline";
};

// This is a Server Component
export default async function AcademyPage() {
  // Fetch academy data from Excel
  const academyData = await getAcademyData();
  
  return (
    <div className="min-h-screen">
      {/* Header */}
      <Header />
      <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading hero section...</div>}>
        <Hero heroContent={academyData.heroContent} />
      </Suspense>
      

      {/* Analytics Framework Courses Section */}
      <section id="courses" className="">
        <div className="px-6">
          <div className="flex flex-row items-center justify-between gap-4 mb-12">
            <h2 className="text-3xl font-semibold text-center">Analytics Framework Courses</h2>
            <Button size="lg" asChild>
              <a href="/academy/all-trainings">View All Trainings</a>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {academyData.courses.slice(0, 4).map((course) => (
              <Card key={course.id} className="h-full flex flex-col">
                <CardHeader>
                  <div>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {course.section && (
                        <Badge 
                          variant={getBadgeVariantForSection(course.section)} 
                          className="text-sm"
                        >
                          {course.section}
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                  </div>
                  <CardDescription className="mt-2">
                    {course.description}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="mt-auto pt-4">
                  <Link href={`/academy/training/${createSlug(course.title)}`}>
                    <Button className="w-full">View Course</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Layout408 />

      {/* CTA Section */}
      <CTA /> 

      {/* Footer */}
      <footer className="bg-card py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Analytics Academy</h3>
              <p className="text-muted-foreground">Empowering data-driven professionals since 2018.</p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Courses</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Resources</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">About Us</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Privacy Policy</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Terms of Service</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Cookie Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Connect With Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-muted-foreground hover:text-foreground">Twitter</a>
                <a href="#" className="text-muted-foreground hover:text-foreground">LinkedIn</a>
                <a href="#" className="text-muted-foreground hover:text-foreground">YouTube</a>
              </div>
            </div>
          </div>
          <div className="border-t mt-12 pt-6 text-center text-muted-foreground">
            <p>© {new Date().getFullYear()} Analytics Academy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
