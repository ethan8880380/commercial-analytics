"use client";

import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Props interface for the component
interface HeroProps {
  heroContent: {
    title: string;
    description: string;
    primaryButtonText: string;
    secondaryButtonText: string;
  };
}

export default function Hero({ heroContent }: HeroProps) {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const animationFrameId = useRef<number | null>(null);
    
    // Random velocity generator
    const randomVelocity = () => (Math.random() * 0.1) - 0.05;
    
    // Added velocities and collision properties to circles
    const [circles, setCircles] = useState([
        { id: 1, x: 10, y: 15, size: 260, color: 'rgba(59, 130, 246, 0.3)', speed: 0.5, baseX: 10, baseY: 15, vx: randomVelocity(), vy: randomVelocity(), mass: 260 },
        { id: 2, x: 25, y: 40, size: 180, color: 'rgba(147, 51, 234, 0.25)', speed: 0.7, baseX: 25, baseY: 40, vx: randomVelocity(), vy: randomVelocity(), mass: 180 },
        { id: 3, x: 45, y: 30, size: 220, color: 'rgba(236, 72, 153, 0.2)', speed: 0.4, baseX: 45, baseY: 30, vx: randomVelocity(), vy: randomVelocity(), mass: 220 },
        { id: 4, x: 70, y: 20, size: 300, color: 'rgba(16, 185, 129, 0.2)', speed: 0.6, baseX: 70, baseY: 20, vx: randomVelocity(), vy: randomVelocity(), mass: 300 },
        { id: 5, x: 85, y: 60, size: 190, color: 'rgba(245, 158, 11, 0.15)', speed: 0.8, baseX: 85, baseY: 60, vx: randomVelocity(), vy: randomVelocity(), mass: 190 },
        { id: 6, x: 30, y: 70, size: 240, color: 'rgba(99, 102, 241, 0.2)', speed: 0.5, baseX: 30, baseY: 70, vx: randomVelocity(), vy: randomVelocity(), mass: 240 },
        { id: 7, x: 60, y: 85, size: 210, color: 'rgba(124, 58, 237, 0.2)', speed: 0.3, baseX: 60, baseY: 85, vx: randomVelocity(), vy: randomVelocity(), mass: 210 },
        { id: 8, x: 90, y: 40, size: 170, color: 'rgba(56, 189, 248, 0.25)', speed: 0.7, baseX: 90, baseY: 40, vx: randomVelocity(), vy: randomVelocity(), mass: 170 },
        { id: 9, x: 15, y: 85, size: 280, color: 'rgba(239, 68, 68, 0.15)', speed: 0.6, baseX: 15, baseY: 85, vx: randomVelocity(), vy: randomVelocity(), mass: 280 },
        { id: 10, x: 75, y: 75, size: 230, color: 'rgba(79, 70, 229, 0.2)', speed: 0.4, baseX: 75, baseY: 75, vx: randomVelocity(), vy: randomVelocity(), mass: 230 }
    ]);

    useEffect(() => {
        // Animation with collision detection
        const animate = () => {
            setCircles(prevCircles => {
                // Create a new array to hold updated circles
                const newCircles = [...prevCircles];
                
                // First, check for collisions with walls and update positions
                for (let i = 0; i < newCircles.length; i++) {
                    // Update position based on velocity
                    newCircles[i].x += newCircles[i].vx;
                    newCircles[i].y += newCircles[i].vy;
                    
                    // Bounce off walls
                    const radius = newCircles[i].size / 200; // Convert size to percentage of viewport
                    
                    // Left and right walls
                    if (newCircles[i].x - radius < 0) {
                        newCircles[i].x = radius;
                        newCircles[i].vx = Math.abs(newCircles[i].vx);
                    } else if (newCircles[i].x + radius > 100) {
                        newCircles[i].x = 100 - radius;
                        newCircles[i].vx = -Math.abs(newCircles[i].vx);
                    }
                    
                    // Top and bottom walls
                    if (newCircles[i].y - radius < 0) {
                        newCircles[i].y = radius;
                        newCircles[i].vy = Math.abs(newCircles[i].vy);
                    } else if (newCircles[i].y + radius > 100) {
                        newCircles[i].y = 100 - radius;
                        newCircles[i].vy = -Math.abs(newCircles[i].vy);
                    }
                }
                
                // Then, check for collisions between circles
                for (let i = 0; i < newCircles.length; i++) {
                    for (let j = i + 1; j < newCircles.length; j++) {
                        const circle1 = newCircles[i];
                        const circle2 = newCircles[j];
                        
                        // Calculate distance between circles
                        const dx = circle1.x - circle2.x;
                        const dy = circle1.y - circle2.y;
                        const distance = Math.sqrt(dx * dx + dy * dy);
                        
                        // Calculate the sum of radii (as percentage of viewport)
                        const radius1 = circle1.size / 200;
                        const radius2 = circle2.size / 200;
                        const minDistance = radius1 + radius2;
                        
                        // Check for collision
                        if (distance < minDistance) {
                            // Calculate unit normal vector (from circle2 to circle1)
                            const nx = dx / distance;
                            const ny = dy / distance;
                            
                            // Calculate relative velocity
                            const dvx = circle1.vx - circle2.vx;
                            const dvy = circle1.vy - circle2.vy;
                            
                            // Calculate relative velocity in normal direction
                            const velAlongNormal = dvx * nx + dvy * ny;
                            
                            // Do not resolve if velocities are separating
                            if (velAlongNormal > 0) continue;
                            
                            // Calculate restitution (bounciness)
                            const restitution = 0.6;
                            
                            // Calculate impulse scalar
                            const impulseScalar = -(1 + restitution) * velAlongNormal / 
                                                 (1/circle1.mass + 1/circle2.mass);
                            
                            // Apply impulse
                            const impulseX = impulseScalar * nx;
                            const impulseY = impulseScalar * ny;
                            
                            // Update velocities
                            newCircles[i].vx += impulseX / circle1.mass;
                            newCircles[i].vy += impulseY / circle1.mass;
                            newCircles[j].vx -= impulseX / circle2.mass;
                            newCircles[j].vy -= impulseY / circle2.mass;
                            
                            // Resolve overlap (move circles apart)
                            const overlap = minDistance - distance;
                            const resolveX = overlap * nx * 0.5;
                            const resolveY = overlap * ny * 0.5;
                            
                            newCircles[i].x += resolveX;
                            newCircles[i].y += resolveY;
                            newCircles[j].x -= resolveX;
                            newCircles[j].y -= resolveY;
                        }
                    }
                }
                
                // Apply subtle mouse attraction
                if (mousePosition.x > 0 && mousePosition.y > 0) {
                    for (let i = 0; i < newCircles.length; i++) {
                        // Calculate direction to mouse
                        const dirX = mousePosition.x - newCircles[i].x;
                        const dirY = mousePosition.y - newCircles[i].y;
                        
                        // Calculate distance to mouse
                        const distance = Math.sqrt(dirX * dirX + dirY * dirY);
                        if (distance === 0) continue;
                        
                        // Normalize direction
                        const normDirX = dirX / distance;
                        const normDirY = dirY / distance;
                        
                        // Apply subtle attraction force
                        const attractionStrength = 0.0005 * newCircles[i].speed;
                        newCircles[i].vx += normDirX * attractionStrength;
                        newCircles[i].vy += normDirY * attractionStrength;
                    }
                }
                
                // Apply friction to prevent infinite movement
                for (let i = 0; i < newCircles.length; i++) {
                    newCircles[i].vx *= 0.99;
                    newCircles[i].vy *= 0.99;
                }
                
                return newCircles;
            });
            
            animationFrameId.current = requestAnimationFrame(animate);
        };
        
        animate();
        
        return () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, [mousePosition]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Get viewport dimensions to calculate relative positions
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            
            // Calculate mouse position as percentage of viewport
            const mouseX = (e.clientX / viewportWidth) * 100;
            const mouseY = (e.clientY / viewportHeight) * 100;
            
            setMousePosition({ x: mouseX, y: mouseY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <section className="relative px-6 py-24 overflow-hidden flex flex-col items-left justify-left">
            {/* Background circles - positioned relative to the section */}
            <div className="absolute inset-0 w-full h-full">
                {circles.map(circle => (
                    <div
                        key={circle.id}
                        className="absolute rounded-full transition-transform duration-[500ms] ease-out"
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

            <div className="flex flex-col md:flex-row gap-12 items-center mx-auto relative z-10 w-full">
                <div className="max-w-4xl">
                    <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl mb-6 text-left">
                        {heroContent.title}
                    </h2>
                    <p className="text-lg text-muted-foreground mb-8 text-left">
                        {heroContent.description}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-start">
                        <Button size="lg">{heroContent.primaryButtonText}</Button>
                        <Button variant="outline" size="lg">{heroContent.secondaryButtonText}</Button>
                    </div>
                </div>
            </div>
            <img src="/hero.jpg" alt="Students learning analytics" className="w-full h-full mt-12 relative z-10" />
        </section>  
    )
}