# Form Validation Demo Project

This is a form validation demo application built with Next.js 15 and TailwindCSS. The application features a stylish form with automatic phone number formatting, where users can submit their email address (required) and phone number (optional) with both client-side and server-side validation.

## Features

- **Form UI**:
  - Modern gradient background with rounded inputs
  - Country code prefix (+1) for North American phone numbers
  - Auto-formatting for phone numbers (xxx-xxx-xxxx format)
  - Responsive design with clean error states

- **Form Fields**:
  - Email Address (Required) - Must follow a valid email format
  - Phone Number (Optional) - North American format with auto-formatting (e.g., 412-977-8194)

- **Validation**:
  - Client-side validation: Real-time validation using Zod and React Hook Form
  - Server-side validation: Validation through mock API implementations

## Tech Stack

- **Next.js 15** - React framework with App Router
- **TailwindCSS** - Utility-first CSS framework
- **React Hook Form** - Form state management and validation
- **Zod** - TypeScript-first schema validation
- **TypeScript** - Static type checking

## Installation and Running

### Prerequisites

- Node.js 18.17.0 or higher
- pnpm 8.0.0 or higher (recommended)

### Installation Steps

1. Clone or download this repository
2. Install dependencies with pnpm

```bash
pnpm install
```

3. Start the development server

```bash
pnpm dev
```

4. Open your browser and navigate to [http://localhost:3000](http://localhost:3000)

## Mock API Implementation

This project demonstrates multiple approaches to implementing mock APIs:

### 1. Built-in Next.js API Routes

The project includes a Next.js API route that simulates a backend service:

- **Endpoint**: `/api/v1/demo/submit`
- **Method**: POST
- **Payload**:
  ```json
  {
    "email": "string",
    "phone": "string (optional)"
  }
  ```

Response types:

- **Success Response**:
  ```json
  {
    "status": "success",
    "message": "Form submitted successfully"
  }
  ```

- **Validation Error**:
  ```json
  {
    "status": "error",
    "message": "Validation error",
    "errors": {
      "email": "Please enter a valid email address",
      "phone": "Please enter a valid North American phone number"
    }
  }
  ```

- **Server Error**:
  ```json
  {
    "status": "error",
    "message": "Internal server error"
  }
  ```

### 2. Static Response Simulation

The project includes a MockApiTester component that allows testing form behavior with predefined static responses:

- **Simulate Success**: Returns a successful form submission response
- **Simulate Validation Error**: Returns a validation error response
- **Simulate Server Error**: Returns a server error response

### 3. External Mock API Tools

For more advanced mocking capabilities, consider these external tools:

- **Mockoon** (https://mockoon.com/): Desktop application for creating mock APIs
  - Create static JSON responses
  - Set up custom routes and status codes
  - Define dynamic templating rules
  - Simulate delays and environments

- **MSW (Mock Service Worker)** (https://mswjs.io/):
  - Intercept network requests directly in the browser
  - Integrated with React and other frameworks
  - Works with real API calls - no code changes needed

## Project Structure

```
/src
  /app
    /api
      /v1
        /demo
          /submit
            route.ts      # Built-in mock API endpoint
    /page.tsx             # Home page
  /components
    /ClientContactForm.tsx # Client component wrapper
    /ContactForm.tsx      # Form component
    /MockApiTester.tsx    # Mock API testing interface
  /lib
    /schema.ts            # Form validation schema
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
