'use client';

import { useState } from 'react';
import { MapPin, Clock, Utensils, Home, Mountain } from 'lucide-react';
import { ItineraryOption } from '@/types';

interface ItineraryTabsProps {
  itineraryOptions: ItineraryOption[];
}

export default function ItineraryTabs({ itineraryOptions }: ItineraryTabsProps) {
  const [activeTab, setActiveTab] = useState(0);

  if (!itineraryOptions || itineraryOptions.length === 0) {
    return null;
  }

  const activeItinerary = itineraryOptions[activeTab];

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      {itineraryOptions.length > 1 && (
        <div className="border-b border-gray-200">
          <div className="flex flex-wrap gap-2">
            {itineraryOptions.map((option, index) => (
              <button
                key={option.id}
                onClick={() => setActiveTab(index)}
                className={`px-6 py-3 font-semibold transition-all duration-200 border-b-2 ${
                  activeTab === index
                    ? 'border-adventure-orange text-adventure-orange bg-orange-50'
                    : 'border-transparent text-gray-600 hover:text-adventure-orange hover:bg-gray-50'
                }`}
              >
                <div className="text-left">
                  <div className="font-bold">{option.name}</div>
                  <div className="text-sm font-normal">
                    {option.days} {option.days === 1 ? 'Day' : 'Days'}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Itinerary Description */}
      <div className="bg-blue-50 border-l-4 border-mountain-blue p-6 rounded-r-lg">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {activeItinerary.name}
        </h3>
        <p className="text-gray-700">{activeItinerary.description}</p>
        <p className="text-sm text-gray-600 mt-2">
          <strong>Total Duration:</strong> {activeItinerary.days} days
        </p>
      </div>

      {/* Day-by-Day Itinerary */}
      <div className="space-y-4">
        {activeItinerary.itinerary.map((day, index) => (
          <div key={index} className="card hover:shadow-lg transition-shadow duration-300">
            <div className="p-6">
              {/* Day Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-adventure-orange to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  {day.day}
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-gray-900 mb-1">
                    Day {day.day}: {day.title}
                  </h4>

                  {/* Quick Info Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                    {day.altitude && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mountain className="w-4 h-4 text-adventure-orange" />
                        <span>{day.altitude}</span>
                      </div>
                    )}
                    {day.duration && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4 text-adventure-orange" />
                        <span>{day.duration}</span>
                      </div>
                    )}
                    {day.meals && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Utensils className="w-4 h-4 text-adventure-orange" />
                        <span>{day.meals}</span>
                      </div>
                    )}
                    {day.accommodation && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Home className="w-4 h-4 text-adventure-orange" />
                        <span>{day.accommodation}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Day Description */}
              <div className="pl-20">
                <p className="text-gray-700 leading-relaxed">{day.description}</p>
              </div>
            </div>

            {/* Connecting Line (except for last day) */}
            {index < activeItinerary.itinerary.length - 1 && (
              <div className="relative h-8 flex items-center justify-center">
                <div className="absolute left-14 w-0.5 h-full bg-gradient-to-b from-adventure-orange to-orange-300"></div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Summary Footer */}
      <div className="card p-6 bg-gradient-to-r from-nature-green/10 to-green-50">
        <div className="flex items-start gap-3">
          <MapPin className="w-6 h-6 text-nature-green flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-bold text-gray-900 mb-2">Itinerary Notes:</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• This itinerary can be customized based on your preferences and fitness level</li>
              <li>• Weather conditions may require itinerary adjustments</li>
              <li>• Extra acclimatization days can be added if needed</li>
              <li>• Contact us to discuss modifications or combine with other routes</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
