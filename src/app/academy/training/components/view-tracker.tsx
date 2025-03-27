"use client";

import { useEffect } from 'react';

interface ViewTrackerProps {
  courseId: string;
}

export function ViewTracker({ courseId }: ViewTrackerProps) {
  useEffect(() => {
    // Only run in the browser
    if (typeof window === 'undefined') return;

    // Track view in localStorage
    const viewedTrainings = JSON.parse(localStorage.getItem('viewedTrainings') || '[]');
    if (!viewedTrainings.includes(courseId)) {
      viewedTrainings.push(courseId);
      localStorage.setItem('viewedTrainings', JSON.stringify(viewedTrainings));
    }
  }, [courseId]);

  // This component doesn't render anything
  return null;
} 