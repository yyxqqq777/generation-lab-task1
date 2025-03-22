"use client";

import { ApiResponse, ContactFormValues, contactFormSchema } from '@/lib/schema';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error';
    message: string;
    errors?: Record<string, string>;
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    watch,
    reset
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      email: '',
      phone: ''
    }
  });

  // Format phone number as user types
  const formatPhoneNumber = (value: string) => {
    // Remove all non-digit characters
    const cleaned = value.replace(/\D/g, '');

    // Apply formatting based on number length
    if (cleaned.length <= 3) {
      return cleaned;
    } else if (cleaned.length <= 6) {
      return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
    } else {
      return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
    }
  };

  // Handle phone input changes
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatPhoneNumber(e.target.value);
    setValue('phone', formattedValue, { shouldValidate: true });
  };

  const onSubmit = async (data: ContactFormValues) => {
    try {
      setIsSubmitting(true);
      setSubmitStatus(null);

      const response = await fetch('/api/v1/demo/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await response.json() as ApiResponse;

      if (result.status === 'success') {
        setSubmitStatus({
          type: 'success',
          message: result.message
        });
        reset(); // Reset form
      } else {
        // Handle validation errors
        if (result.errors) {
          // Set server errors to form
          Object.entries(result.errors).forEach(([field, message]) => {
            setError(field as keyof ContactFormValues, {
              type: 'server',
              message
            });
          });
        }

        setSubmitStatus({
          type: 'error',
          message: result.message,
          errors: result.errors
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'An error occurred when submitting the form. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Key for forcing re-rendering when needed - helps with hydration issues
  const [key, setKey] = useState(0);

  return (
    <div key={key} className="max-w-md mx-auto p-6 bg-gradient-to-r from-yellow-100 to-amber-200 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-amber-900">Get free sample report & white paper</h2>
        <button className="text-gray-500 hover:text-gray-700">
          ✕
        </button>
      </div>

      {submitStatus?.type === 'success' && (
        <div className="mb-6 p-3 bg-green-100 text-green-700 rounded-md">
          {submitStatus.message}
        </div>
      )}

      {submitStatus?.type === 'error' && !submitStatus.errors && (
        <div className="mb-6 p-3 bg-red-100 text-red-700 rounded-md">
          {submitStatus.message}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            {...register('email')}
            id="email"
            type="email"
            placeholder="E-mail Address"
            className={`w-full p-4 border rounded-full ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600 pl-4">{errors.email.message}</p>
          )}
        </div>

        <div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
              <span className="flex items-center">
                <span className="flag-icon">🇺🇸</span>
                <span className="ml-1 text-gray-500">+1</span>
              </span>
            </div>
            <input
              {...register('phone')}
              id="phone"
              type="tel"
              placeholder="Phone Number (Optional)"
              className={`w-full p-4 pl-20 border rounded-full ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
              onChange={handlePhoneChange}
            />
          </div>
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600 pl-4">{errors.phone.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 px-4 bg-gradient-to-r from-amber-600 to-amber-800 hover:from-amber-700 hover:to-amber-900 text-white font-medium rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Sending...' : 'Send me PDF'}
        </button>
      </form>

      <p className="text-amber-800 text-sm mt-4">
        By activating your offer, you consent to receive communications from Generation Lab. You can unsubscribe anytime.
      </p>
    </div>
  );
}