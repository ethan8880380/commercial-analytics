/**
 * Utility functions for training tracking
 */

/**
 * Check if a training has been viewed by the current user
 * @param courseId - The ID of the course to check
 * @returns boolean - Whether the course has been viewed
 */
export function hasViewedTraining(courseId: string): boolean {
  // Only run in the browser
  if (typeof window === 'undefined') return false;
  
  try {
    const viewedTrainings = JSON.parse(localStorage.getItem('viewedTrainings') || '[]');
    return viewedTrainings.includes(courseId);
  } catch (error) {
    console.error('Error checking viewed trainings:', error);
    return false;
  }
}

/**
 * Get all viewed training IDs
 * @returns string[] - Array of viewed training IDs
 */
export function getViewedTrainings(): string[] {
  // Only run in the browser
  if (typeof window === 'undefined') return [];
  
  try {
    return JSON.parse(localStorage.getItem('viewedTrainings') || '[]');
  } catch (error) {
    console.error('Error getting viewed trainings:', error);
    return [];
  }
}

/**
 * Clear all viewed training history
 */
export function clearViewedTrainings(): void {
  // Only run in the browser
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem('viewedTrainings');
  } catch (error) {
    console.error('Error clearing viewed trainings:', error);
  }
} 