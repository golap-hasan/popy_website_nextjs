"use client"
import { BookOpen } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center space-y-4">
        <BookOpen className="h-12 w-12 animate-bounce text-primary" />
        <p className="text-muted-foreground">Loading books...</p>
      </div>
    </div>
  );
}