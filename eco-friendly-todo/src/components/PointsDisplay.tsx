'use client';

import React from 'react';
import { usePoints } from '@/contexts/PointsContext';

interface PointsDisplayProps {
  showSession?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function PointsDisplay({ 
  showSession = false, 
  className = '',
  size = 'md'
}: PointsDisplayProps) {
  const { totalPoints, sessionPoints, isLoading } = usePoints();

  if (isLoading) {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="bg-gray-200 rounded-lg h-8 w-20"></div>
      </div>
    );
  }

  const sizeClasses = {
    sm: 'text-sm px-2 py-1',
    md: 'text-base px-3 py-2',
    lg: 'text-lg px-4 py-3'
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Total Points */}
      <div className={`
        bg-gradient-to-r from-green-400 to-emerald-500 text-white font-bold rounded-lg
        shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105
        flex items-center gap-2 ${sizeClasses[size]}
      `}>
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        <span className="animate-count-up">{totalPoints.toLocaleString()}</span>
        <span className="text-xs opacity-90">pts</span>
      </div>

      {/* Session Points (if enabled) */}
      {showSession && sessionPoints > 0 && (
        <div className={`
          bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold rounded-lg
          shadow-lg transition-all duration-300 hover:shadow-xl
          flex items-center gap-1 animate-bounce-in ${sizeClasses[size]}
        `}>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span>+{sessionPoints}</span>
        </div>
      )}
    </div>
  );
}
