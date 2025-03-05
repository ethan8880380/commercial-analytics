import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Header } from "@/app/academy/academy-components/header";
import Hero from "@/app/academy/academy-components/hero";
import { getAcademyData } from '@/utils/excel';
import { Suspense } from 'react';
import { Layout417 } from "@/app/academy/academy-components/knowledge-areas";

// This is a Server Component
export default async function AcademyPage() {
  // Fetch academy data from Excel
  const academyData = await getAcademyData();
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />
      <Suspense fallback={<div className="h-96 flex items-center justify-center">Loading hero section...</div>}>
        <Hero heroContent={academyData.heroContent} />
      </Suspense>
      <Layout417 />

      {/* Analytics Framework Courses Section */}
      <section id="courses" className="py-20 bg-secondary/30">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-center mb-12">Analytics Framework Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {academyData.courses.map((course) => (
              <div key={course.id} className="bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-medium">{course.title}</h3>
                  {course.section && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                      {course.section}
                    </span>
                  )}
                </div>
                <p className="text-muted-foreground mb-4">{course.description}</p>
                <div className="flex justify-between text-sm mt-4">
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded">{course.knowledgeZone || "Framework"}</span>
                  <Button className="ml-auto" variant="outline" size="sm">View Details</Button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button size="lg" asChild>
              <a href="/academy/all-trainings">View All Trainings</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="resources" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-center mb-12">What Our Students Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                quote: "The structured curriculum and hands-on projects helped me transition into a data analyst role within just 6 months.",
                name: "Sarah Johnson",
                title: "Data Analyst at TechCorp"
              },
              {
                quote: "The instructors are industry experts who provide real-world context to every concept. Best investment in my career growth.",
                name: "Michael Chen",
                title: "Business Intelligence Specialist"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-accent/20 p-8 rounded-lg">
                <p className="italic mb-6">"{testimonial.quote}"</p>
                <div>
                  <p className="font-medium">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instructors */}
      <section id="instructors" className="py-20 bg-secondary/30">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-semibold text-center mb-12">Meet Our Expert Instructors</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              {
                name: "Dr. Emily Roberts",
                role: "Data Science Lead",
                bio: "Former Google data scientist with 10+ years of industry experience."
              },
              {
                name: "James Wilson",
                role: "BI Specialist",
                bio: "Consultant for Fortune 500 companies on analytics implementation."
              },
              {
                name: "Priya Sharma",
                role: "Analytics Engineer",
                bio: "Specializes in data pipeline architecture and ETL processes."
              }
            ].map((instructor, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="w-32 h-32 rounded-full bg-muted mb-4"></div>
                <h3 className="text-xl font-medium">{instructor.name}</h3>
                <p className="text-primary font-medium">{instructor.role}</p>
                <p className="text-muted-foreground mt-2">{instructor.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold mb-6">Ready to Start Your Analytics Journey?</h2>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of students who have transformed their careers through our academy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">Enroll Now</Button>
            <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground hover:bg-primary-foreground/10">
              Schedule a Demo
            </Button>
          </div>
        </div>
      </section>

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
