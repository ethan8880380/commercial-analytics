import * as XLSX from 'xlsx';
import path from 'path';
import fs from 'node:fs';

// Mark this module as server-only
export const dynamic = 'force-dynamic';

export interface AcademyCourse {
  id: string;
  title: string;
  description: string;
  level?: string;
  duration?: string;
  image?: string;
  section?: string;
  knowledgeZone?: string;
}

// Define interface for Excel row data
interface ExcelRowData {
  Title?: string;
  Name?: string;
  Description?: string;
  'Knowledge zone'?: string;
  Section?: string;
  [key: string]: unknown | string | number; // For any other properties that might exist
}

// This is a server-only function
export async function getAcademyData(): Promise<{
  courses: AcademyCourse[];
  heroContent: {
    title: string;
    description: string;
    primaryButtonText: string;
    secondaryButtonText: string;
  };
}> {
  try {
    // Path to the Excel file relative to project root
    const filePath = path.join(process.cwd(), 'public', 'data', 'academy.xlsx');
    const fileBuffer = fs.readFileSync(filePath);
    
    // Parse the Excel file
    const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
    
    // Get first sheet (assumes data is in first sheet)
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    
    if (!worksheet) {
      throw new Error('No worksheet found in Excel file');
    }
    
    // Convert to JSON
    const rawData = XLSX.utils.sheet_to_json(worksheet) as ExcelRowData[];
    console.log('Raw Excel data:', rawData);
    
    // Map the raw data to our courses format
    const coursesData = rawData.map((row: ExcelRowData, index) => ({
      id: index.toString(),
      title: row['Title'] || row['Name'] || '',
      description: row['Description'] || '',
      knowledgeZone: row['Knowledge zone'] || '',
      section: row['Section'] || '',
      // Add other fields if they exist in your Excel
    }));
    
    // Use first course for hero content
    const heroContent = {
      title: "Master Data Analytics at Your Own Pace",
      description: "Join our comprehensive learning platform designed to transform beginners into data analytics professionals through structured courses, hands-on projects, and expert mentorship.",
      primaryButtonText: "Browse Courses",
      secondaryButtonText: "Free Trial",
    };
    
    // If we have data, use the first row to customize hero content
    if (coursesData.length > 0 && coursesData[0].title) {
      heroContent.title = coursesData[0].title;
      if (coursesData[0].description) {
        heroContent.description = coursesData[0].description;
      }
    }

    return {
      courses: coursesData,
      heroContent,
    };
  } catch (error) {
    console.error('Error loading academy data:', error);
    // Return default data if file loading fails
    return {
      courses: [],
      heroContent: {
        title: 'Master Data Analytics at Your Own Pace',
        description: 'Join our comprehensive learning platform designed to transform beginners into data analytics professionals through structured courses, hands-on projects, and expert mentorship.',
        primaryButtonText: 'Browse Courses',
        secondaryButtonText: 'Free Trial',
      },
    };
  }
} 