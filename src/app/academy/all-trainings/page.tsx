"use client";

import { useEffect, useState, useRef } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "@/app/academy/academy-components/header";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CTA } from "@/app/academy/academy-components/cta";
import Link from 'next/link';
import Image from 'next/image';
import { ViewedBadge } from './components/viewed-badge';
// Define section order for consistent sorting
const SECTION_ORDER = ["Professional", "Specialty", "Expert"];

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

// At the top of your file
interface Course {
  id: string;
  title: string;
  description: string;
  knowledgeZone?: string;
  section?: string;
}

export default function AllTrainingsPage() {
  const [academyData, setAcademyData] = useState<{
    courses: Course[];
    coursesByZone: Record<string, Course[]>;
    knowledgeZones: string[];
    selectedZone: string;
    zoneDescriptions: Record<string, string>;
  }>({
    courses: [],
    coursesByZone: {},
    knowledgeZones: [],
    selectedZone: "All",
    zoneDescriptions: {}
  });

  const [sectionFilter, setSectionFilter] = useState<string>("All");
  const tabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadData() {
      try {
        // Fetch data from API
        const response = await fetch("/api/academy");
        if (!response.ok) throw new Error("Failed to load courses");
        const data = await response.json();
        
        const courses = data.courses || [];
        
        // Add "All" category
        const allCourses = [...courses];
        
        // Group courses by knowledge zone
        const coursesByZone: Record<string, Course[]> = {
          "All Trainings": allCourses
        };
        
        courses.forEach((course: Course) => {
          const zone = course.knowledgeZone || "Other";
          if (!coursesByZone[zone]) {
            coursesByZone[zone] = [];
          }
          coursesByZone[zone].push(course);
        });
        
        // Get unique knowledge zones, sorted alphabetically, with "All Trainings" first
        const knowledgeZones = ["All Trainings", ...Object.keys(coursesByZone).filter(zone => zone !== "All Trainings").sort()];
        
        // Create descriptions for each zone
        const zoneDescriptions: Record<string, string> = {
          "All Trainings": "Browse our complete catalog of analytics training courses across all knowledge areas.",
        };
        
        // Generate descriptions for each zone based on the number of courses
        knowledgeZones.forEach(zone => {
          if (zone === "All Trainings") return; // Skip All Trainings as we already defined it
          
          const courseCount = coursesByZone[zone]?.length || 0;
          zoneDescriptions[zone] = `Explore ${courseCount} training courses in the ${zone} knowledge area.`;
        });
        
        // Check for tab in URL query params
        const searchParams = new URLSearchParams(window.location.search);
        const tabParam = searchParams.get("tab");
        
        // Find closest matching tab
        let selectedZone = knowledgeZones[0]; // Default to first tab
        
        if (tabParam) {
          // Find exact match
          const exactMatch = knowledgeZones.find(zone => zone === tabParam);
          if (exactMatch) {
            selectedZone = exactMatch;
          } else {
            // Try to find a case-insensitive match
            const caseInsensitiveMatch = knowledgeZones.find(
              zone => zone.toLowerCase() === tabParam.toLowerCase()
            );
            if (caseInsensitiveMatch) {
              selectedZone = caseInsensitiveMatch;
            } else {
              // Try to find closest partial match
              const partialMatch = knowledgeZones.find(
                zone => zone.toLowerCase().includes(tabParam.toLowerCase()) || 
                       tabParam.toLowerCase().includes(zone.toLowerCase())
              );
              if (partialMatch) {
                selectedZone = partialMatch;
              }
            }
          }
        }
        
        setAcademyData({
          courses,
          coursesByZone,
          knowledgeZones,
          selectedZone,
          zoneDescriptions
        });
      } catch (error) {
        console.error("Error loading academy data:", error);
      }
    }
    
    loadData();
    
    // Update URL when tab changes
    const handlePopState = () => {
      const searchParams = new URLSearchParams(window.location.search);
      const tabParam = searchParams.get("tab");
      
      if (tabParam && academyData.knowledgeZones.includes(tabParam)) {
        setAcademyData(prev => ({
          ...prev,
          selectedZone: tabParam
        }));
      }
    };
    
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [academyData.knowledgeZones]);

  // Handle tab change and update URL
  const handleTabChange = (value: string) => {
    // Update state
    setAcademyData(prev => ({
      ...prev,
      selectedZone: value
    }));
    
    // Update URL without navigating
    const url = new URL(window.location.href);
    if (value === "All Trainings") {
      url.searchParams.delete("tab");
    } else {
      url.searchParams.set("tab", value);
    }
    window.history.pushState({}, "", url);
  };

  // Handle section filter change
  const handleSectionFilterChange = (value: string) => {
    setSectionFilter(value);
  };

  // Group courses by section for a given knowledge zone
  const getCoursesBySection = (zone: string) => {
    const courses = academyData.coursesByZone[zone] || [];
    
    // Create a normalized mapping to standard section names
    const sectionMapping: Record<string, string> = {};
    
    // Pre-populate with standard names (case-insensitive)
    SECTION_ORDER.forEach(standardSection => {
      sectionMapping[standardSection.toLowerCase().trim()] = standardSection;
    });
    
    // Group by section with strict normalization
    const coursesBySection: Record<string, Course[]> = {};
    
    courses.forEach(course => {
      // Default to "Other" if no section is provided
      const rawSection = (course.section || "Other").trim();
      
      // Determine the normalized section name
      let normalizedSection: string;
      
      // Check for case-insensitive match with standard sections
      const lookupKey = rawSection.toLowerCase().trim();
      if (sectionMapping[lookupKey]) {
        normalizedSection = sectionMapping[lookupKey];
      } else {
        // If not a standard section, keep original but ensure consistent casing for duplicates
        normalizedSection = rawSection.charAt(0).toUpperCase() + rawSection.slice(1);
        // Remember this normalization for future consistency
        sectionMapping[lookupKey] = normalizedSection;
      }
      
      // Initialize array if this is the first course for this section
      if (!coursesBySection[normalizedSection]) {
        coursesBySection[normalizedSection] = [];
      }
      
      coursesBySection[normalizedSection].push(course);
    });
    
    return coursesBySection;
  };

  // Filter sections based on the section filter
  const getFilteredSections = (coursesBySection: Record<string, Course[]>) => {
    // If "All" is selected, show everything
    if (sectionFilter === "All") {
      return coursesBySection;
    }
    
    // Create a filtered copy
    const filteredSections: Record<string, Course[]> = {};
    
    // Find all courses that match the filter (case-insensitive)
    Object.entries(coursesBySection).forEach(([section, courses]) => {
      // Check if the section name matches our filter
      if (section.toLowerCase() === sectionFilter.toLowerCase()) {
        filteredSections[section] = courses;
      } 
      // If section doesn't match, check individual courses for matching section property
      else {
        const matchingCourses = courses.filter(
          course => course.section && course.section.toLowerCase() === sectionFilter.toLowerCase()
        );
        
        if (matchingCourses.length > 0) {
          // If we found matching courses, add them under their original section
          if (!filteredSections[section]) {
            filteredSections[section] = [];
          }
          filteredSections[section].push(...matchingCourses);
        }
      }
    });
    
    return filteredSections;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="py-16 px-6">
        <div className="">
          {academyData.knowledgeZones.length > 0 && (
            <>
              {/* Hero Section - Moved Above Tabs */}
              <div className="mb-12 grid grid-cols-1 md:grid-cols-2 items-start gap-8">
                <div className="flex flex-col gap-4 w-full h-full justify-center">
                  <h2 className="text-3xl font-bold mb-2">{academyData.selectedZone} Courses</h2>
                  <p className="text-muted-foreground">
                    {academyData.zoneDescriptions[academyData.selectedZone] || ''}
                  </p>
                </div>
                <div className="w-full md:w-auto flex justify-center">
                  <Image
                    src="/hero.jpg"
                    alt="Training Image"
                    width={800}
                    height={600}
                    className="object-cover h-[30vh]"
                  />
                </div>
              </div>

              {/* Tabs Section */}
              <Tabs 
                ref={tabsRef}
                defaultValue={academyData.knowledgeZones[0]} 
                value={academyData.selectedZone}
                className="w-full"
                onValueChange={handleTabChange}
              >
                <div className="mb-8 flex justify-between items-center">
                  <TabsList>
                    {academyData.knowledgeZones.map(zone => (
                      <TabsTrigger 
                        key={zone}
                        value={zone}
                      >
                        {zone}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  
                  <div className="flex items-center gap-2">
                    <Select value={sectionFilter} onValueChange={handleSectionFilterChange}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All Levels</SelectItem>
                        {SECTION_ORDER.map(section => (
                          <SelectItem key={section} value={section}>{section}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {academyData.knowledgeZones.map(zone => (
                  <TabsContent key={zone} value={zone}>
                    {/* Course sections */}
                    {Object.entries(getFilteredSections(getCoursesBySection(zone)))
                      .sort(([a], [b]) => {
                        const aIndex = SECTION_ORDER.indexOf(a);
                        const bIndex = SECTION_ORDER.indexOf(b);
                        
                        // If both sections are in the order array, sort by their position
                        if (aIndex !== -1 && bIndex !== -1) {
                          return aIndex - bIndex;
                        }
                        
                        // If only one section is in the order array, prioritize it
                        if (aIndex !== -1) return -1;
                        if (bIndex !== -1) return 1;
                        
                        // Otherwise, sort alphabetically
                        return a.localeCompare(b);
                      })
                      .map(([section, courses]) => (
                        <div key={section} className="mb-12">
                          <h3 className="text-xl font-semibold mb-4">{section}</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {courses.map((course: Course) => (
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
                                      <ViewedBadge courseId={course.id} />
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
                      ))}
                  </TabsContent>
                ))}
              </Tabs>
            </>
          )}
        </div>
      </section>
      <CTA />
    </div>
  );
} 