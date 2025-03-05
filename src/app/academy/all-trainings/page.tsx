"use client";

import { useEffect, useState, useRef } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "@/app/academy/academy-components/header";
import { getAcademyData } from '@/utils/excel';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import "./tabs.css"; // Import the custom CSS

// Define section order for consistent sorting
const SECTION_ORDER = ["Professional", "Specialty", "Expert"];

// Tab transition configuration
const transition = {
  type: "tween",
  ease: "easeOut",
  duration: 0.15,
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
    courses: any[];
    coursesByZone: Record<string, any[]>;
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

  const tabsRef = useRef<HTMLDivElement>(null);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        // Fetch data from API
        const response = await fetch('/api/academy');
        if (!response.ok) throw new Error('Failed to load courses');
        const data = await response.json();
        
        const courses = data.courses || [];
        
        // Add "All" category
        const allCourses = [...courses];
        
        // Group courses by knowledge zone
        const coursesByZone: Record<string, any[]> = {
          All: allCourses
        };
        
        courses.forEach((course: Course) => {
          const zone = course.knowledgeZone || 'Other';
          if (!coursesByZone[zone]) {
            coursesByZone[zone] = [];
          }
          coursesByZone[zone].push(course);
        });
        
        // Get unique knowledge zones, sorted alphabetically, with "All" first
        const knowledgeZones = ["All", ...Object.keys(coursesByZone).filter(zone => zone !== "All").sort()];
        
        // Create descriptions for each zone
        const zoneDescriptions: Record<string, string> = {
          All: "Browse our complete catalog of analytics training courses across all knowledge areas.",
        };
        
        // Generate descriptions for each zone based on the number of courses
        knowledgeZones.forEach(zone => {
          if (zone === 'All') return; // Skip All as we already defined it
          
          const courseCount = coursesByZone[zone]?.length || 0;
          zoneDescriptions[zone] = `Explore ${courseCount} training courses in the ${zone} knowledge area.`;
        });
        
        // Check for tab in URL query params
        const searchParams = new URLSearchParams(window.location.search);
        const tabParam = searchParams.get('tab');
        
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
        console.error('Error loading academy data:', error);
      }
    }
    
    loadData();
    
    // Update URL when tab changes
    const handlePopState = () => {
      const searchParams = new URLSearchParams(window.location.search);
      const tabParam = searchParams.get('tab');
      
      if (tabParam && academyData.knowledgeZones.includes(tabParam)) {
        setAcademyData(prev => ({
          ...prev,
          selectedZone: tabParam
        }));
      }
    };
    
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Handle tab change and update URL
  const handleTabChange = (value: string) => {
    // Update state
    setAcademyData(prev => ({
      ...prev,
      selectedZone: value
    }));
    
    // Update URL without navigating
    const url = new URL(window.location.href);
    if (value === "All") {
      url.searchParams.delete('tab');
    } else {
      url.searchParams.set('tab', value);
    }
    window.history.pushState({}, '', url);
  };

  // Group courses by section for a given knowledge zone
  const getCoursesBySection = (zone: string) => {
    const courses = academyData.coursesByZone[zone] || [];
    
    // Group by section
    const coursesBySection: Record<string, any[]> = {};
    
    courses.forEach(course => {
      const section = course.section || 'Other';
      if (!coursesBySection[section]) {
        coursesBySection[section] = [];
      }
      coursesBySection[section].push(course);
    });
    
    return coursesBySection;
  };

  // Move the updateSlider function definition to component scope, before the return statement
  const updateSlider = () => {
    const tabsList = document.querySelector('.vercel-tabs [role="tablist"]') as HTMLElement;
    const activeTab = document.querySelector('.vercel-tabs [role="tab"][data-state="active"]') as HTMLElement;
    
    if (tabsList && activeTab) {
      const { offsetLeft, offsetWidth } = activeTab;
      tabsList.style.setProperty('--tab-left', `${offsetLeft}px`);
      tabsList.style.setProperty('--tab-width', `${offsetWidth}px`);
    }
  };

  // Keep your existing useEffect, but reference the function defined above
  useEffect(() => {
    // Initial update
    updateSlider();
    
    // Create a mutation observer to watch for attribute changes on tabs
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-state') {
          updateSlider();
        }
      });
    });
    
    // Start observing
    const tabs = document.querySelectorAll('.vercel-tabs [role="tab"]');
    tabs.forEach(tab => {
      observer.observe(tab, { attributes: true });
    });
    
    // Handle window resize
    window.addEventListener('resize', updateSlider);
    
    // Cleanup
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateSlider);
    };
  }, [academyData.knowledgeZones]); // Re-run when tabs change

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {academyData.knowledgeZones.length > 0 && (
            <Tabs 
              ref={tabsRef}
              defaultValue={academyData.knowledgeZones[0]} 
              value={academyData.selectedZone}
              className="w-full vercel-tabs rounded-none"
              onValueChange={handleTabChange}
            >
              <div className="relative mb-8">
                <TabsList className="bg-transparent justify-start border-b border-border pb-0 rounded-none">
                  <LayoutGroup>
                    <AnimatePresence>
                      {hoveredTab && (
                        <motion.div
                          layoutId="hoverBackground"
                          className="absolute rounded-md bg-accent"
                          initial={{ opacity: 0 }}
                          animate={{ 
                            opacity: 1,
                            width: (document.querySelector(`[data-tab-value="${hoveredTab}"]`)?.getBoundingClientRect().width || 0) - 16,
                            x: (document.querySelector(`[data-tab-value="${hoveredTab}"]`)?.getBoundingClientRect().x || 0) - 
                               (document.querySelector('.vercel-tabs [role="tablist"]')?.getBoundingClientRect().x || 0) + 4
                          }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          style={{ 
                            zIndex: 0,
                            height: 'calc(100% - 12px)',
                            borderRadius: '4px',
                            top: '4px',
                            bottom: '12px'
                          }}
                        />
                      )}
                    </AnimatePresence>

                    {academyData.knowledgeZones.map(zone => (
                      <div key={zone} className="relative z-10">
                        <TabsTrigger 
                          value={zone}
                          className="h-12 relative z-10 data-[state=active]:border-b-0 text-sm font-medium"
                          data-tab-value={zone}
                          onMouseEnter={() => setHoveredTab(zone)}
                          onMouseLeave={() => setHoveredTab(null)}
                        >
                          {zone}
                        </TabsTrigger>
                        
                        {academyData.selectedZone === zone && (
                          <motion.div
                            layoutId="activeIndicator"
                            className="absolute bottom-0 left-0 right-0 h-[3px] bg-primary"
                            transition={{ duration: 0.2 }}
                            style={{ zIndex: 30 }}
                          />
                        )}
                      </div>
                    ))}
                  </LayoutGroup>
                </TabsList>
              </div>
              
              <div className="mb-16">
                <h1 className="text-4xl font-bold mb-3">{academyData.selectedZone} Trainings</h1>
                <p className="text-lg text-muted-foreground max-w-3xl">
                  {academyData.zoneDescriptions[academyData.selectedZone] || 
                   'Browse our catalog of analytics training courses.'}
                </p>
              </div>
              
              {academyData.knowledgeZones.map(zone => {
                const coursesBySection = getCoursesBySection(zone);
                
                return (
                  <TabsContent key={zone} value={zone} className="mt-0 animate-in fade-in-50 duration-300">
                    {SECTION_ORDER.map(sectionName => {
                      const coursesInSection = coursesBySection[sectionName] || [];
                      
                      if (coursesInSection.length === 0) return null;
                      
                      return (
                        <div key={sectionName} className="mb-24">
                          <h2 className="text-2xl font-semibold mb-8 pb-2 border-b">{sectionName}</h2>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {coursesInSection.map(course => (
                              <Card key={course.id} className="h-full flex flex-col hover:shadow-md transition-shadow">
                                <CardHeader className="pb-2">
                                  <div className="flex justify-between items-start gap-4">
                                    <CardTitle className="text-xl leading-tight">{course.title}</CardTitle>
                                    {course.section && (
                                      <Badge variant="outline" className="whitespace-nowrap">{course.section}</Badge>
                                    )}
                                  </div>
                                  {course.knowledgeZone && (
                                    <CardDescription className="mt-1">{course.knowledgeZone}</CardDescription>
                                  )}
                                </CardHeader>
                                <CardContent className="flex-grow py-4">
                                  <p className="text-sm text-muted-foreground">{course.description}</p>
                                </CardContent>
                                <CardFooter className="pt-2 pb-4 flex justify-end">
                                  <Button variant="outline" size="sm">View Details</Button>
                                </CardFooter>
                              </Card>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                    
                    {Object.keys(coursesBySection)
                      .filter(section => !SECTION_ORDER.includes(section))
                      .map(sectionName => {
                        const coursesInSection = coursesBySection[sectionName];
                        
                        return (
                          <div key={sectionName} className="mb-24">
                            <h2 className="text-2xl font-semibold mb-8 pb-2 border-b">{sectionName}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                              {coursesInSection.map(course => (
                                <Card key={course.id} className="h-full flex flex-col hover:shadow-md transition-shadow">
                                  <CardHeader className="pb-2">
                                    <div className="flex justify-between items-start gap-4">
                                      <CardTitle className="text-xl leading-tight">{course.title}</CardTitle>
                                      {course.section && (
                                        <Badge variant="outline" className="whitespace-nowrap">{course.section}</Badge>
                                      )}
                                    </div>
                                    {course.knowledgeZone && (
                                      <CardDescription className="mt-1">{course.knowledgeZone}</CardDescription>
                                    )}
                                  </CardHeader>
                                  <CardContent className="flex-grow py-4">
                                    <p className="text-sm text-muted-foreground">{course.description}</p>
                                  </CardContent>
                                  <CardFooter className="pt-2 pb-4 flex justify-end">
                                    <Button variant="outline" size="sm">View Details</Button>
                                  </CardFooter>
                                </Card>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    
                    {Object.keys(coursesBySection).length === 0 && (
                      <div className="text-center py-16">
                        <p className="text-muted-foreground">No courses found in this category.</p>
                      </div>
                    )}
                  </TabsContent>
                );
              })}
            </Tabs>
          )}
          
          {academyData.knowledgeZones.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">Loading courses...</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
} 