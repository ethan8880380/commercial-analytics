"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Header } from "@/app/academy/academy-components/header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Clock, FileText, Users } from "lucide-react";
import Link from 'next/link';
import { ViewTracker } from '../components/view-tracker';
import { ViewedBadge } from '../components/viewed-badge';
import { CTA } from '@/app/academy/academy-components/cta';
// Define Course interface
interface Course {
  id: string;
  title: string;
  description: string;
  knowledgeZone?: string;
  section?: string;
}

// Function to determine badge variant based on section name
const getBadgeVariantForSection = (section: string): "default" | "secondary" | "destructive" | "outline" | "purple" | "yellow" | "green" | "red" => {
  const normalizedSection = section?.toLowerCase().trim() || '';
  
  if (normalizedSection.includes("professional")) {
    return "green";
  } else if (normalizedSection.includes("specialty")) {
    return "purple";
  } else if (normalizedSection.includes("expert")) {
    return "yellow";
  }
  
  // Default fallback
  return "outline";
};

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

export default function TrainingPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [course, setCourse] = useState<Course | null>(null);
  const [relatedTrainings, setRelatedTrainings] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTraining() {
      setLoading(true);
      try {
        // Fetch all courses from API
        const response = await fetch("/api/academy");
        if (!response.ok) throw new Error("Failed to load courses");
        const data = await response.json();
        
        const courses = data.courses || [];
        
        // Find the course with matching slug
        // Convert course title to slug format and compare
        const foundCourse = courses.find((course: Course) => 
          createSlug(course.title) === slug
        );
        
        if (foundCourse) {
          setCourse(foundCourse);
          
          // Find related trainings based on the same knowledgeZone or section
          const relatedTrainings = courses.filter((c: Course) => 
            c.id !== foundCourse.id && 
            (
              (c.knowledgeZone && c.knowledgeZone === foundCourse.knowledgeZone) || 
              (c.section && c.section === foundCourse.section)
            )
          ).slice(0, 4); // Limit to 4 related trainings
          
          setRelatedTrainings(relatedTrainings);
          
          // Track view in localStorage
          const viewedTrainings = JSON.parse(localStorage.getItem("viewedTrainings") || "[]");
          if (!viewedTrainings.includes(foundCourse.id)) {
            viewedTrainings.push(foundCourse.id);
            localStorage.setItem("viewedTrainings", JSON.stringify(viewedTrainings));
          }
        } else {
          setError("Training not found");
        }
      } catch (error) {
        console.error("Error loading training:", error);
        setError("Error loading training");
      } finally {
        setLoading(false);
      }
    }
    
    if (slug) {
      fetchTraining();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-4xl mx-auto py-16 px-6">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-4xl mx-auto py-16 px-6 text-center">
          <h1 className="text-3xl font-bold mb-4">Training Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The training you&apos;re looking for doesn&apos;t exist or has been removed.
          </p>
          <Button asChild>
            <Link href="/academy/all-trainings">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to All Trainings
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background w-full">
      <Header />
      
      {/* Add ViewTracker when course is loaded */}
      {course && <ViewTracker courseId={course.id} />}
      
      <div className="mx-auto py-16 px-6">
        <div className="mb-8">
          <Button variant="ghost" asChild>
            <Link href="/academy/all-trainings">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to All Trainings
            </Link>
          </Button>
        </div>
        
        <div className="mb-6">
          <div className="flex flex-wrap gap-2 mb-2">
            {course.section && (
              <Badge 
                variant={getBadgeVariantForSection(course.section)} 
                className="text-sm px-3 py-1"
              >
                {course.section}
              </Badge>
            )}
            <ViewedBadge courseId={course.id} />
          </div>
          <h1 className="text-3xl font-bold">{course.title}</h1>
        </div>
        
        <div className="flex items-center space-x-4 mb-8 text-sm text-muted-foreground">
          {course.knowledgeZone && (
            <div className="flex items-center">
              <FileText className="mr-1 h-4 w-4" />
              {course.knowledgeZone}
            </div>
          )}
          <div className="flex items-center">
            <Clock className="mr-1 h-4 w-4" />
            30 mins
          </div>
          <div className="flex items-center">
            <Calendar className="mr-1 h-4 w-4" />
            Updated Jan 2023
          </div>
          <div className="flex items-center">
            <Users className="mr-1 h-4 w-4" />
            1,234 enrolled
          </div>
        </div>
        
        {/* <div className="mb-12 rounded-lg p-6 bg-foreground/10">
          <h2 className="text-xl font-semibold mb-2">About this course</h2>
          <p className="text-muted-foreground">{course.description}</p>
        </div> */}
        
        <div className="mb-12">
          <div className="relative w-full aspect-video rounded-lg overflow-hidden">
            <iframe 
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
              title={`${course.title} Video`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
        
        {/* Related Trainings Section */}
        {relatedTrainings.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-4">Related Trainings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedTrainings.map((relatedCourse) => (
                <div key={relatedCourse.id} className="bg-card border rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col h-full">
                  <div className="p-4 flex flex-col flex-grow">
                    <div className="mb-2">
                      <div className="flex flex-wrap gap-2 mb-6">
                        {relatedCourse.section && (
                          <Badge variant={getBadgeVariantForSection(relatedCourse.section)} className="text-sm">
                            {relatedCourse.section}
                          </Badge>
                        )}
                        <ViewedBadge courseId={relatedCourse.id} />
                      </div>
                      <h3 className="font-medium text-lg">{relatedCourse.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-8">
                      {relatedCourse.description}
                    </p>
                    <Link 
                      href={`/academy/training/${createSlug(relatedCourse.title)}`} 
                      className="mt-auto"
                    >
                      <Button variant="default" className="w-full">View Training</Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
      </div>
      <CTA />
    </div>
  );
} 