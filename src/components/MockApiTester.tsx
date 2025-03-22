"use client";

import { ApiResponse } from '@/lib/schema';
import { useState } from 'react';

export default function MockApiTester() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [email, setEmail] = useState('test@example.com');
  const [phone, setPhone] = useState('555-123-4567');

  const callMockApi = async () => {
    try {
      setLoading(true);

      // Call the mock API with current form data
      const response = await fetch('/api/v1/demo/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          phone
        })
      });

      const result = await response.json() as ApiResponse;
      setResponse(result);
    } catch (error) {
      console.error('Error calling mock API:', error);
      setResponse({
        status: 'error',
        message: 'Failed to call API'
      });
    } finally {
      setLoading(false);
    }
  };

  // Function to simulate static mock responses
  const getStaticResponse = (type: 'success' | 'validation-error' | 'server-error') => {
    let mockResponse: ApiResponse;

    switch (type) {
      case 'success':
        mockResponse = {
          status: 'success',
          message: 'Form submitted successfully'
        };
        break;
      case 'validation-error':
        mockResponse = {
          status: 'error',
          message: 'Validation error',
          errors: {
            email: 'Please enter a valid email address',
            phone: 'Please enter a valid phone number'
          }
        };
        break;
      case 'server-error':
        mockResponse = {
          status: 'error',
          message: 'Internal server error'
        };
        break;
    }

    setResponse(mockResponse);
  };

  return (
    <div className="mt-8 p-4 border border-gray-200 rounded-lg bg-white">
      <h2 className="text-lg font-medium mb-4">Mock API Tester</h2>

      <div className="mb-4 space-y-2">
        <div>
          <label className="block text-sm font-medium mb-1">Email for test</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Phone for test</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={callMockApi}
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Calling API...' : 'Test Real Mock API'}
        </button>

        <button
          onClick={() => getStaticResponse('success')}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Simulate Success
        </button>

        <button
          onClick={() => getStaticResponse('validation-error')}
          className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
        >
          Simulate Validation Error
        </button>

        <button
          onClick={() => getStaticResponse('server-error')}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Simulate Server Error
        </button>
      </div>

      {response && (
        <div className={`p-3 rounded-md ${response.status === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          <p className="font-medium">{response.status === 'success' ? 'Success' : 'Error'}</p>
          <p>{response.message}</p>
          {response.status === 'error' && response.errors && (
            <div className="mt-2">
              <p className="font-medium">Validation Errors:</p>
              <ul className="list-disc pl-5">
                {Object.entries(response.errors).map(([field, message]) => (
                  <li key={field}>{field}: {message}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="mt-4 text-sm text-gray-600">
        <p className="font-medium">Mock API Options:</p>
        <p>1. Use "Test Real Mock API" to call the actual Next.js API route</p>
        <p>2. Use simulation buttons for instant static responses</p>
        <p>3. For more advanced mocking, consider tools like Mockoon or MSW (Mock Service Worker)</p>
      </div>
    </div>
  );
}