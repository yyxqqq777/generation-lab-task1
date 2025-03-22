import { NextResponse } from 'next/server';
import { contactFormSchema } from '@/lib/schema';

export async function POST(request: Request) {
  try {
    // Parse request body
    const body = await request.json();

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Server-side validation
    const result = contactFormSchema.safeParse(body);

    if (!result.success) {
      // Convert zod errors to API response format
      const formattedErrors: Record<string, string> = {};

      result.error.issues.forEach(issue => {
        if (issue.path[0]) {
          formattedErrors[issue.path[0] as string] = issue.message;
        }
      });

      return NextResponse.json({
        status: 'error',
        message: 'Validation error',
        errors: formattedErrors
      }, { status: 400 });
    }

    // Success response
    return NextResponse.json({
      status: 'success',
      message: 'Form submitted successfully'
    });

  } catch (error) {
    console.error('Request processing error:', error);
    return NextResponse.json({
      status: 'error',
      message: 'Internal server error'
    }, { status: 500 });
  }
}