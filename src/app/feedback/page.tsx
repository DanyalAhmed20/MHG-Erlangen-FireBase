'use client';

// 1. IMPORT 'useActionState' from 'react'
import { useActionState, useState } from 'react';
// 2. IMPORT 'useFormStatus' from 'react-dom' (it stays here)
import { useFormStatus } from 'react-dom';

import Image from 'next/image';
import { submitFeedback } from './actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Star, Loader2 } from 'lucide-react';

// This is the initial state for our form
const initialState: { success: boolean; message: string } = {
  success: false,
  message: '',
};

// This component is unchanged
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Sending...
        </>
      ) : (
        'Submit Feedback'
      )}
    </Button>
  );
}

// This component is unchanged
function StarRating({ value }: { value: number }) {
  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={
            i <= value
              ? 'w-6 h-6 text-yellow-400 fill-yellow-400'
              : 'w-6 h-6 text-gray-400'
          }
        />
      ))}
    </div>
  );
}

// This component is unchanged
function SuccessScreen({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 min-h-[400px]">
      <Image
        src="/sent.png" // Your rocket image
        alt="Feedback Sent"
        width={140}
        height={140}
        className="mb-6"
      />
      <h2 className="text-2xl font-headline mb-2">Thank You!</h2>
      <p className="text-muted-foreground max-w-xs">{message}</p>
    </div>
  );
}

export default function FeedbackFormPage() {
  // 3. RENAMED useFormState to useActionState
  const [state, formAction] = useActionState(submitFeedback, initialState);

  const [rating, setRating] = useState();

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-8">
      <div className="bg-card text-card-foreground rounded-lg shadow-lg p-8 border">
        {state.success ? (
          <SuccessScreen message={state.message} />
        ) : (
          <>
            <h1 className="text-3xl font-headline mb-4">Feedback Forum</h1>
            <p className="text-muted-foreground mb-6">
              We'd love to hear your thoughts. All fields are optional.
            </p>

            <form action={formAction} className="space-y-6">
              {/* Name (Optional) */}
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  className="mt-2"
                />
              </div>

              {/* Email (Optional) */}
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  className="mt-2"
                />
              </div>

              {/* Feedback (Optional) */}
              <div>
                <Label htmlFor="feedback">Feedback</Label>
                <Textarea
                  id="feedback"
                  name="feedback"
                  placeholder="Your feedback..."
                  className="mt-2"
                  rows={5}
                />
              </div>

              {/* Rating (Optional) */}
              {/* <div>
                <Label htmlFor="rating">Rating: {rating} / 5</Label>
                <div className="flex items-center space-x-4 mt-2">
                  <Slider
                    id="rating"
                    name="rating"
                    min={1}
                    max={5}
                    step={1}
                    value={[rating]}
                    onValueChange={(value) => setRating(value[0])}
                    className="flex-1"
                  />
                  <StarRating value={rating} />
                </div>
              </div> */}

              {/* Hidden input to pass the slider's value */}
              <input type="hidden" name="rating" value={rating} />

              {/* This div will show ERROR messages (if any) */}
              {state.message && !state.success && (
                <div
                  aria-live="polite"
                  className="p-3 rounded-md text-sm bg-red-100 text-red-800"
                >
                  {state.message}
                </div>
              )}

              <SubmitButton />
            </form>
          </>
        )}
      </div>
    </div>
  );
}