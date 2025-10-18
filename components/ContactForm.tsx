'use client';

import { useState, FormEvent } from 'react';
import { Send, AlertCircle, Loader2 } from 'lucide-react';
import { ContactFormData } from '@/types';
import { TREKS } from '@/lib/treks-data';

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData & { numberOfPeople: number | string }>({
    name: '',
    email: '',
    phone: '',
    trekInterest: '',
    numberOfPeople: 1,
    preferredDates: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Ensure numberOfPeople is a number before sending
      const dataToSend = {
        ...formData,
        numberOfPeople: typeof formData.numberOfPeople === 'string'
          ? parseInt(formData.numberOfPeople) || 1
          : formData.numberOfPeople,
      };

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send inquiry');
      }

      // Show success message
      setIsSubmitted(true);

      // Reset form after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          trekInterest: '',
          numberOfPeople: 1,
          preferredDates: '',
          message: '',
        });
      }, 5000);

    } catch (err: any) {
      console.error('Error submitting form:', err);
      setError(err.message || 'Failed to send inquiry. Please try again or contact us via WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'numberOfPeople' ? (value === '' ? '' : parseInt(value)) : value,
    }));
  };

  if (isSubmitted) {
    return (
      <div className="card p-8 text-center">
        <div className="w-16 h-16 bg-nature-green rounded-full flex items-center justify-center mx-auto mb-4">
          <Send className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
        <p className="text-gray-600">
          We have received your inquiry and will contact you within 24 hours via WhatsApp.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-adventure-orange focus:border-transparent transition-all"
            placeholder="John Doe"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-adventure-orange focus:border-transparent transition-all"
            placeholder="john@example.com"
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Phone / WhatsApp
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-adventure-orange focus:border-transparent transition-all"
            placeholder="+977 9812345678"
          />
        </div>

        {/* Trek Interest */}
        <div>
          <label htmlFor="trekInterest" className="block text-sm font-medium text-gray-700 mb-2">
            Trek Interested In
          </label>
          <select
            id="trekInterest"
            name="trekInterest"
            value={formData.trekInterest}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-adventure-orange focus:border-transparent transition-all"
          >
            <option value="">Select a trek</option>
            {TREKS.map((trek) => (
              <option key={trek.id} value={trek.name}>
                {trek.name}
              </option>
            ))}
          </select>
        </div>

        {/* Number of People */}
        <div>
          <label htmlFor="numberOfPeople" className="block text-sm font-medium text-gray-700 mb-2">
            Number of People
          </label>
          <input
            type="number"
            id="numberOfPeople"
            name="numberOfPeople"
            min="1"
            max="20"
            value={formData.numberOfPeople}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-adventure-orange focus:border-transparent transition-all"
          />
        </div>

        {/* Preferred Dates */}
        <div>
          <label htmlFor="preferredDates" className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Dates
          </label>
          <input
            type="text"
            id="preferredDates"
            name="preferredDates"
            value={formData.preferredDates}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-adventure-orange focus:border-transparent transition-all"
            placeholder="e.g., March 2025 or Flexible"
          />
        </div>

        {/* Message */}
        <div className="md:col-span-2">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-adventure-orange focus:border-transparent transition-all resize-none"
            placeholder="Tell us about your trekking plans, questions, or special requirements..."
          />
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-6 p-4 bg-red-50 border-2 border-red-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-red-800 font-semibold mb-1">Failed to Send Inquiry</p>
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <div className="mt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary w-full md:w-auto inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Send Inquiry
            </>
          )}
        </button>
      </div>

      <p className="mt-4 text-sm text-gray-600">
        * Required fields. We typically respond within 24 hours via WhatsApp.
      </p>
    </form>
  );
}
