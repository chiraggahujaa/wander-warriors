'use client';

import { useEffect, useState } from 'react';
import { MessageSquare, User, Calendar, RefreshCw } from 'lucide-react';
import { Comment } from '@/types';
import CommentForm from './CommentForm';

interface CommentsSectionProps {
  trekSlug: string;
  trekName: string;
}

export default function CommentsSection({ trekSlug, trekName }: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchComments = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`/api/comments/${trekSlug}`, {
        cache: 'no-store',
      });

      if (!response.ok) {
        throw new Error('Failed to load comments');
      }

      const data = await response.json();
      setComments(data.comments || []);
    } catch (err: any) {
      console.error('Error fetching comments:', err);
      setError(err.message || 'Failed to load comments');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trekSlug]);

  const handleCommentSubmitted = () => {
    // Refresh comments after submission to show the new comment
    setTimeout(() => fetchComments(), 500);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;

    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <section className="section-padding bg-gray-50" id="comments">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-adventure-orange/10 px-4 py-2 rounded-full mb-4">
            <MessageSquare className="w-5 h-5 text-adventure-orange" />
            <span className="text-sm font-semibold text-adventure-orange">
              Trekker Feedback
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Trekkers Say About {trekName}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Real experiences from adventurers who have completed this trek
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Comments Display (2/3 width) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Comments Count */}
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">
                {comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}
              </h3>
              <button
                onClick={fetchComments}
                disabled={isLoading}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-adventure-orange transition-colors"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>

            {/* Loading State */}
            {isLoading && comments.length === 0 && (
              <div className="text-center py-12">
                <div className="inline-block w-8 h-8 border-4 border-adventure-orange border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-gray-600">Loading comments...</p>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="card p-6 text-center border-red-200 bg-red-50">
                <p className="text-red-600">{error}</p>
                <button
                  onClick={fetchComments}
                  className="mt-4 text-sm text-adventure-orange hover:underline"
                >
                  Try again
                </button>
              </div>
            )}

            {/* Empty State */}
            {!isLoading && !error && comments.length === 0 && (
              <div className="card p-8 text-center">
                <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  No comments yet
                </h4>
                <p className="text-gray-600">
                  Be the first to share your experience with this trek!
                </p>
              </div>
            )}

            {/* Comments List */}
            {!isLoading && !error && comments.length > 0 && (
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="card p-6 hover:shadow-md transition-shadow"
                  >
                    {/* Comment Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-adventure-orange to-mountain-blue rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">
                            {comment.name || 'Anonymous'}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Calendar className="w-3 h-3" />
                            {formatDate(comment.created_at)}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Comment Text */}
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {comment.comment}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Comment Form (1/3 width) */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24">
              <CommentForm
                trekSlug={trekSlug}
                onCommentSubmitted={handleCommentSubmitted}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
