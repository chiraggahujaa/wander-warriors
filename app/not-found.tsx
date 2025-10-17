import Link from 'next/link';
import { Home, Mountain } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-2xl">
        <Mountain className="w-24 h-24 text-adventure-orange mx-auto mb-6" />
        <h1 className="text-6xl md:text-8xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Page Not Found
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Looks like you've wandered off the trail. The page you're looking for
          doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn-primary inline-flex items-center gap-2">
            <Home className="w-5 h-5" />
            Back to Home
          </Link>
          <Link href="/treks" className="btn-secondary inline-flex items-center gap-2">
            <Mountain className="w-5 h-5" />
            View Treks
          </Link>
        </div>
      </div>
    </div>
  );
}
