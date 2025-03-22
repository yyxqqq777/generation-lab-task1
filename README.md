# Form Validation Demo Project

This is a form validation demo application built with Next.js and TailwindCSS. The application allows users to submit their email address (required) and phone number (optional) with both client-side and server-side validation.

## Features

- **Form Fields**:
  - Email Address (Required) - Must follow a valid email format
  - Phone Number (Optional) - If provided, must follow a valid US mobile phone format (e.g., 412-977-8194)

- **Validation**:
  - Client-side validation: Real-time validation using Zod and React Hook Form
  - Server-side validation: Validation through a mock API

- **Submission Process**:
  - If client-side validation fails, submission is prevented and appropriate inline error messages are displayed
  - If input is valid, a mock API is called and displays:
    - Success message for successful submission
    - Any server-side errors returned by the API

## Tech Stack

- **Next.js 15** - React framework
- **TailwindCSS** - Styling solution
- **React Hook Form** - Form handling
- **Zod** - Form validation

## Installation and Running

### Prerequisites

- Node.js 18.17.0 or higher
- npm or yarn or pnpm

### Installation Steps

1. Clone or download this repository
2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Start the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open your browser and navigate to [http://localhost:3000](http://localhost:3000)

## Mock API

This project uses Next.js API routes to simulate a backend service. The API endpoint is located at `/api/v1/demo/submit` and accepts a JSON payload with the following fields:

```json
{
  "email": "string",
  "phone": "string (optional)"
}
```

The API responses include the following types:

1. Success Response:
```json
{
  "status": "success",
  "message": "Form submitted successfully"
}
```

2. Validation Error Response:
```json
{
  "status": "error",
  "message": "Validation error",
  "errors": {
    "email": "Invalid email format",
    "phone": "Invalid phone number"
  }
}
```

3. Server Error Response:
```json
{
  "status": "error",
  "message": "Internal server error"
}
```

The mock API also randomly generates errors (approximately 10% chance) to simulate real-world server error scenarios.

## Project Structure

```
/src
  /app
    /api
      /v1
        /demo
          /submit
            route.ts      # Mock API endpoint
    /page.tsx             # Home page
  /components
    /ContactForm.tsx      # Form component
  /lib
    /schema.ts            # Form validation Schema
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
