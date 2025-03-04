import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function Hero() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const animationFrameId = useRef<number | null>(null);
    
    // Added more circles with varied positions, sizes, and colors
    const [circles, setCircles] = useState([
        { id: 1, x: 10, y: 15, size: 260, color: 'rgba(59, 130, 246, 0.3)', speed: 0.5 },
        { id: 2, x: 25, y: 40, size: 180, color: 'rgba(147, 51, 234, 0.25)', speed: 0.7 },
        { id: 3, x: 45, y: 30, size: 220, color: 'rgba(236, 72, 153, 0.2)', speed: 0.4 },
        { id: 4, x: 70, y: 20, size: 300, color: 'rgba(16, 185, 129, 0.2)', speed: 0.6 },
        { id: 5, x: 85, y: 60, size: 190, color: 'rgba(245, 158, 11, 0.15)', speed: 0.8 },
        { id: 6, x: 30, y: 70, size: 240, color: 'rgba(99, 102, 241, 0.2)', speed: 0.5 },
        { id: 7, x: 60, y: 85, size: 210, color: 'rgba(124, 58, 237, 0.2)', speed: 0.3 },
        { id: 8, x: 90, y: 40, size: 170, color: 'rgba(56, 189, 248, 0.25)', speed: 0.7 },
        { id: 9, x: 15, y: 85, size: 280, color: 'rgba(239, 68, 68, 0.15)', speed: 0.6 },
        { id: 10, x: 75, y: 75, size: 230, color: 'rgba(79, 70, 229, 0.2)', speed: 0.4 }
    ]);

    useEffect(() => {
        // Autonomous movement animation
        let time = 0;
        const animate = () => {
            time += 0.01;
            
            setCircles(prevCircles => prevCircles.map(circle => {
                // Create gentle flowing movement with sine waves
                const newX = circle.x + Math.sin(time * circle.speed) * 0.1;
                const newY = circle.y + Math.cos(time * circle.speed * 0.8) * 0.1;
                
                // Keep circles within bounds (0-100%)
                return {
                    ...circle,
                    x: Math.max(0, Math.min(100, newX)),
                    y: Math.max(0, Math.min(100, newY))
                };
            }));
            
            animationFrameId.current = requestAnimationFrame(animate);
        };
        
        animate();
        
        return () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, []);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
            
            // Update circles position based on mouse movement with variable speeds
            setCircles(prevCircles => prevCircles.map(circle => {
                const dx = (e.clientX - mousePosition.x) * 0.01 * circle.speed;
                const dy = (e.clientY - mousePosition.y) * 0.01 * circle.speed;
                
                const newX = circle.x + dx;
                const newY = circle.y + dy;
                
                // Keep circles within bounds (0-100%)
                return {
                    ...circle,
                    x: Math.max(0, Math.min(100, newX)),
                    y: Math.max(0, Math.min(100, newY))
                };
            }));
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mousePosition]);

    return (
        <section className="relative px-6 py-24 overflow-hidden">
            {/* Background circles - positioned relative to the section */}
            <div className="absolute inset-0 w-full h-full">
                {circles.map(circle => (
                    <div
                        key={circle.id}
                        className="absolute rounded-full transition-all duration-[2000ms] ease-in-out"
                        style={{
                            left: `${circle.x}%`,
                            top: `${circle.y}%`,
                            width: `${circle.size}px`,
                            height: `${circle.size}px`,
                            backgroundColor: circle.color,
                            transform: 'translate(-50%, -50%)',
                            filter: 'blur(4px)',
                            opacity: 0.8,
                            zIndex: 0,
                        }}
                    />
                ))}
            </div>

            <div className="flex flex-col md:flex-row gap-12 items-center max-w-6xl mx-auto relative z-10">
                <div className="max-w-4xl">
                    <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl mb-6 text-center">
                        Master Data Analytics at Your Own Pace
                    </h2>
                    <p className="text-lg text-muted-foreground mb-8 text-center">
                        Join our comprehensive learning platform designed to transform beginners into data analytics professionals through structured courses, hands-on projects, and expert mentorship.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg">Browse Courses</Button>
                        <Button variant="outline" size="lg">Free Trial</Button>
                    </div>
                </div>
            </div>
            <img src="/hero.jpg" alt="Students learning analytics" className="w-full h-full mt-12 relative z-10" />
        </section>  
    )
}