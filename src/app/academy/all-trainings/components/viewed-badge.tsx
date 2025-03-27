"use client";

import { useEffect, useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { CheckIcon } from "lucide-react";
import { hasViewedTraining } from '@/utils/training-utils';

interface ViewedBadgeProps {
  courseId: string;
}

export function ViewedBadge({ courseId }: ViewedBadgeProps) {
  const [isViewed, setIsViewed] = useState(false);
  
  useEffect(() => {
    // Check if the course has been viewed
    setIsViewed(hasViewedTraining(courseId));
    
    // Listen for storage events to update badge if localStorage changes
    const handleStorageChange = () => {
      setIsViewed(hasViewedTraining(courseId));
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [courseId]);
  
  if (!isViewed) return null;
  
  return (
    <Badge variant="outline" className="bg-primary/10 border-primary/30 text-primary flex items-center gap-1">
      <CheckIcon className="h-3 w-3" />
      <span>Completed</span>
    </Badge>
  );
} 