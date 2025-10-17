'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Filter } from 'lucide-react';
import TrekCard from '@/components/TrekCard';
import { TREKS } from '@/lib/treks-data';
import type { DifficultyLevel } from '@/types';

export default function TreksPage() {
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [durationFilter, setDurationFilter] = useState<string>('all');

  const filteredTreks = TREKS.filter((trek) => {
    const matchesDifficulty =
      difficultyFilter === 'all' || trek.difficulty === difficultyFilter;

    let matchesDuration = true;
    if (durationFilter === 'short') {
      matchesDuration = trek.durationDays < 7;
    } else if (durationFilter === 'medium') {
      matchesDuration = trek.durationDays >= 7 && trek.durationDays <= 12;
    } else if (durationFilter === 'long') {
      matchesDuration = trek.durationDays > 12;
    }

    return matchesDifficulty && matchesDuration;
  });

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero/treks-hero.jpg"
            alt="Nepal Treks"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        </div>

        <div className="relative z-10 container-custom text-center text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Explore Nepal Treks
          </h1>
          <p className="text-xl md:text-2xl text-gray-100">
            From easy escapes to challenging expeditions
          </p>
        </div>
      </section>

      {/* Filters and Treks Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          {/* Filters */}
          <div className="card p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Filter className="w-5 h-5 text-adventure-orange" />
              <h2 className="text-xl font-bold text-gray-900">Filter Treks</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Difficulty Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Difficulty Level
                </label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setDifficultyFilter('all')}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      difficultyFilter === 'all'
                        ? 'bg-adventure-orange text-white'
                        : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-adventure-orange'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setDifficultyFilter('Easy')}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      difficultyFilter === 'Easy'
                        ? 'bg-nature-green text-white'
                        : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-nature-green'
                    }`}
                  >
                    Easy
                  </button>
                  <button
                    onClick={() => setDifficultyFilter('Moderate')}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      difficultyFilter === 'Moderate'
                        ? 'bg-adventure-orange text-white'
                        : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-adventure-orange'
                    }`}
                  >
                    Moderate
                  </button>
                  <button
                    onClick={() => setDifficultyFilter('Challenging')}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      difficultyFilter === 'Challenging'
                        ? 'bg-red-600 text-white'
                        : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-red-600'
                    }`}
                  >
                    Challenging
                  </button>
                </div>
              </div>

              {/* Duration Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Trek Duration
                </label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setDurationFilter('all')}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      durationFilter === 'all'
                        ? 'bg-adventure-orange text-white'
                        : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-adventure-orange'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setDurationFilter('short')}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      durationFilter === 'short'
                        ? 'bg-adventure-orange text-white'
                        : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-adventure-orange'
                    }`}
                  >
                    Short (&lt; 7 days)
                  </button>
                  <button
                    onClick={() => setDurationFilter('medium')}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      durationFilter === 'medium'
                        ? 'bg-adventure-orange text-white'
                        : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-adventure-orange'
                    }`}
                  >
                    Medium (7-12 days)
                  </button>
                  <button
                    onClick={() => setDurationFilter('long')}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      durationFilter === 'long'
                        ? 'bg-adventure-orange text-white'
                        : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-adventure-orange'
                    }`}
                  >
                    Long (&gt; 12 days)
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-4 text-sm text-gray-600">
              Showing {filteredTreks.length} of {TREKS.length} treks
            </div>
          </div>

          {/* Treks Grid */}
          {filteredTreks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTreks.map((trek) => (
                <TrekCard key={trek.id} trek={trek} />
              ))}
            </div>
          ) : (
            <div className="card p-12 text-center">
              <p className="text-gray-600 text-lg">
                No treks match your current filters. Try adjusting your selection.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
