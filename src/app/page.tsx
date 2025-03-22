import ClientContactForm from '@/components/ClientContactForm';
import MockApiTester from '@/components/MockApiTester';

/**
 * For external mock API tools:
 * 1. Mockoon (https://mockoon.com/): Easy-to-use desktop app for API mocking
 *    - Create static JSON responses
 *    - Set up custom routes and status codes
 *    - Define dynamic templating rules
 *    - Simulate delays and environments
 *
 * 2. MSW (Mock Service Worker): https://mswjs.io/
 *    - Intercept network requests directly in the browser
 *    - Integrated with React and other frameworks
 *    - Works with real API calls - no code changes needed
 */

export default function Home() {
  return (
    <main className="min-h-screen py-12 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <ClientContactForm />
        <MockApiTester />
      </div>
    </main>
  );
}
