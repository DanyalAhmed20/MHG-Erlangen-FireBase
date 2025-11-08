'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';

// Define the shape of our form data
const FeedbackSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional().or(z.literal('')), // Allow empty string or valid email
  feedback: z.string().optional(),
  rating: z.number().min(1).max(5).optional(),
});

export async function submitFeedback(prevState: any, formData: FormData) {
  try {
    const validatedFields = FeedbackSchema.safeParse({
      name: formData.get('name') || undefined,
      email: formData.get('email') || undefined,
      feedback: formData.get('feedback') || undefined,
      rating: formData.get('rating') ? Number(formData.get('rating')) : undefined,
    });

    // Return error if validation fails
    if (!validatedFields.success) {
      console.error('Validation Error:', validatedFields.error.flatten().fieldErrors);
      return {
        success: false,
        message: 'Validation failed. Please check your inputs.',
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    const data = validatedFields.data;
    
    // Get the script URL from your environment variables
    const googleScriptUrl = process.env.GOOGLE_SCRIPT_URL;
    if (!googleScriptUrl) {
      console.error('Google Script URL is not defined.');
      return { success: false, message: 'Server configuration error.' };
    }

    // Send the data to your Google Apps Script
    const response = await fetch(googleScriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      // We are sending from a server, so 'redirect' is not needed
      // but 'no-cors' is NOT needed either.
    });

    const result = await response.json();

    if (result.result !== 'success') {
      console.error('Google Script Error:', result.message);
      return { success: false, message: 'Failed to submit feedback to sheet.' };
    }

    // Revalidate the path if needed (though likely not for a feedback form)
    // revalidatePath('/feedback');
    
    return { success: true, message: 'Thank you for your feedback!' };

  } catch (error: any) {
    console.error('Fetch Error:', error);
    return { success: false, message: `An error occurred: ${error.message}` };
  }
}