import * as XLSX from 'xlsx';

interface FormSubmission {
  name: string;
  email: string;
  message: string;
  timestamp?: string;
}

/**
 * Saves form data to an Excel file and downloads it
 */
export const saveToExcel = (data: FormSubmission, filename: string = 'contact-submissions.xlsx') => {
  try {
    // Add timestamp if not provided
    const submissionData = {
      ...data,
      timestamp: data.timestamp || new Date().toLocaleString(),
    };

    // Try to load existing workbook from localStorage or create new one
    let workbook: XLSX.WorkBook;
    let worksheet: XLSX.WorkSheet;
    let existingData: FormSubmission[] = [];

    // Check if we have existing data in localStorage
    const storedData = localStorage.getItem('contactSubmissions');
    if (storedData) {
      existingData = JSON.parse(storedData);
    }

    // Add new submission to existing data
    existingData.push(submissionData);

    // Save to localStorage for persistence
    localStorage.setItem('contactSubmissions', JSON.stringify(existingData));

    // Create worksheet from data
    worksheet = XLSX.utils.json_to_sheet(existingData);

    // Create workbook
    workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Submissions');

    // Generate Excel file and trigger download
    XLSX.writeFile(workbook, filename);

    return true;
  } catch (error) {
    console.error('Error saving to Excel:', error);
    return false;
  }
};

/**
 * Downloads all stored submissions as an Excel file
 */
export const downloadAllSubmissions = (filename: string = 'all-contact-submissions.xlsx') => {
  try {
    const storedData = localStorage.getItem('contactSubmissions');
    if (!storedData) {
      throw new Error('No submissions found');
    }

    const existingData = JSON.parse(storedData);

    // Create worksheet from data
    const worksheet = XLSX.utils.json_to_sheet(existingData);

    // Create workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Submissions');

    // Generate Excel file and trigger download
    XLSX.writeFile(workbook, filename);

    return true;
  } catch (error) {
    console.error('Error downloading submissions:', error);
    return false;
  }
};

/**
 * Clears all stored submissions from localStorage
 */
export const clearSubmissions = () => {
  localStorage.removeItem('contactSubmissions');
};

/**
 * Gets count of stored submissions
 */
export const getSubmissionsCount = (): number => {
  const storedData = localStorage.getItem('contactSubmissions');
  if (!storedData) return 0;
  return JSON.parse(storedData).length;
};
