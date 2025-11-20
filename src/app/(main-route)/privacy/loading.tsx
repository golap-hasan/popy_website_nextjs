"use client"
import { BookOpenText } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex screen-height items-center justify-center bg-background">
      <div>
        <BookOpenText className="h-12 w-12 animate-bounce text-primary" />
      </div>
    </div>
  );
}