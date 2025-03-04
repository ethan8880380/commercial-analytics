import { NextResponse } from 'next/server';
import * as XLSX from 'xlsx';
import path from 'path';
import fs from 'fs';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'academy.xlsx');
    const fileBuffer = fs.readFileSync(filePath);
    
    const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
    
    // Get first sheet (assumes data is in first sheet)
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    
    if (!worksheet) {
      throw new Error('No worksheet found in Excel file');
    }
    
    // Convert to JSON
    const rawData = XLSX.utils.sheet_to_json(worksheet);
    
    // Map the raw data to our courses format
    const coursesData = rawData.map((row: any, index) => ({
      id: index.toString(),
      title: row['Title'] || row['Name'] || '',
      description: row['Description'] || '',
      knowledgeZone: row['Knowledge zone'] || '',
      section: row['Section'] || '',
    }));
    
    // Use first course for hero content
    const heroContent = {
      title: "Master Data Analytics at Your Own Pace",
      description: "Join our comprehensive learning platform designed to transform beginners into data analytics professionals through structured courses, hands-on projects, and expert mentorship.",
      primaryButtonText: "Browse Courses",
      secondaryButtonText: "Free Trial",
    };
    
    return NextResponse.json({
      courses: coursesData,
      heroContent
    });
  } catch (error) {
    console.error('Error loading academy data:', error);
    return NextResponse.json({
      courses: [],
      heroContent: {
        title: 'Master Data Analytics at Your Own Pace',
        description: 'Join our comprehensive learning platform designed to transform beginners into data analytics professionals through structured courses, hands-on projects, and expert mentorship.',
        primaryButtonText: 'Browse Courses',
        secondaryButtonText: 'Free Trial',
      },
    }, { status: 500 });
  }
} 