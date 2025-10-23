'use client';

import { useState, FormEvent } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

interface CommentFormProps {
  trekSlug: string;
  onCommentSubmitted?: () => void;
}

export default function CommentForm({ trekSlug, onCommentSubmitted }: CommentFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    comment: '',
    honeypot: '', // Spam trap - should remain empty
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch(`/api/comments/${trekSlug}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit comment');
      }

      setSubmitStatus({
        type: 'success',
        message: data.message || 'Comment submitted successfully!',
      });

      // Reset form
      setFormData({ name: '', email: '', comment: '', honeypot: '' });

      // Notify parent component
      if (onCommentSubmitted) {
        onCommentSubmitted();
      }
    } catch (error: any) {
      setSubmitStatus({
        type: 'error',
        message: error.message || 'Failed to submit comment. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const charCount = formData.comment.length;
  const isFormValid =
    formData.name.trim().length > 0 &&
    formData.email.trim().length > 0 &&
    charCount >= 10 &&
    charCount <= 500;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Share Your Experience</h3>
      <p className="text-gray-600 mb-6">
        Have you completed this trek? Share your thoughts to help future trekkers!
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Field (Required) */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            maxLength={50}
            placeholder="Your name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-adventure-orange focus:border-transparent transition-all"
          />
        </div>

        {/* Email Field (Required) */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email <span className="text-red-500">*</span>
            <span className="text-gray-400 text-xs ml-1">(not displayed publicly)</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="your.email@example.com"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-adventure-orange focus:border-transparent transition-all"
          />
        </div>

        {/* Comment Field (Required) */}
        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
            Comment <span className="text-red-500">*</span>
          </label>
          <textarea
            id="comment"
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            required
            minLength={10}
            maxLength={500}
            rows={4}
            placeholder="Share your experience, tips, or recommendations... (10-500 characters)"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-adventure-orange focus:border-transparent transition-all resize-none"
          />
          <div className="flex items-center justify-between mt-1">
            <span
              className={`text-sm ${
                charCount < 10
                  ? 'text-gray-400'
                  : charCount > 500
                  ? 'text-red-500'
                  : 'text-nature-green'
              }`}
            >
              {charCount}/500 characters
              {charCount < 10 && ` (minimum 10)`}
            </span>
            {isFormValid && (
              <span className="text-sm text-nature-green flex items-center gap-1">
                <CheckCircle className="w-4 h-4" />
                Ready to submit
              </span>
            )}
          </div>
        </div>

        {/* Honeypot Field (Hidden - Spam Prevention) */}
        <input
          type="text"
          name="honeypot"
          value={formData.honeypot}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
          style={{
            position: 'absolute',
            left: '-9999px',
            width: '1px',
            height: '1px',
          }}
          aria-hidden="true"
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || !isFormValid}
          className="w-full bg-gradient-to-r from-adventure-orange to-mountain-blue text-white font-semibold py-3 px-6 rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Submit Comment
            </>
          )}
        </button>
      </form>

      {/* Status Messages */}
      {submitStatus.type && (
        <div
          className={`mt-4 p-4 rounded-lg flex items-start gap-3 ${
            submitStatus.type === 'success'
              ? 'bg-nature-green/10 border border-nature-green/20'
              : 'bg-red-50 border border-red-200'
          }`}
        >
          {submitStatus.type === 'success' ? (
            <CheckCircle className="w-5 h-5 text-nature-green flex-shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          )}
          <div>
            <p
              className={`text-sm font-medium ${
                submitStatus.type === 'success' ? 'text-nature-green' : 'text-red-700'
              }`}
            >
              {submitStatus.message}
            </p>
            {submitStatus.type === 'success' && (
              <p className="text-xs text-gray-600 mt-1">
                Your comment is pending approval and will appear soon.
              </p>
            )}
          </div>
        </div>
      )}

      {/* Info Note */}
      <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-xs text-gray-600">
          <strong>Note:</strong> Comments are moderated and will be published after review. Please
          be respectful and constructive. You can submit one comment every 30 minutes.
        </p>
      </div>
    </div>
  );
}
