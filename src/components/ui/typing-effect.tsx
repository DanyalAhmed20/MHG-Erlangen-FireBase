'use client';

import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface TypingEffectProps {
  /** A list of strings to type out. */
  taglines: string[];
  /** Optional className to apply to the root <span> tag. */
  className?: string;
  /** Speed in ms for typing one character. Default: 100ms */
  typeSpeed?: number;
  /** Speed in ms for deleting one character. Default: 50ms */
  deleteSpeed?: number;
  /** Pause duration in ms after a word is fully typed. Default: 2000ms */
  pauseDuration?: number;
}

/**
 * A component that displays a list of strings with a "typewriter" effect.
 * It finds the common prefix between strings and only types/deletes the differences.
 * Renders as a <span>, so it can be safely nested inside other text elements.
 */
export function TypingEffect({
  taglines,
  className,
  typeSpeed = 100,
  deleteSpeed = 50,
  pauseDuration = 2000,
}: TypingEffectProps) {
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Use a ref for the timer to easily clear it on unmount
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Guard for empty or undefined taglines
  if (!taglines || taglines.length === 0) {
    return (
      // Root element is a <span>
      <span className={cn("inline-block", className)}>
        <span className="min-h-[1.5em] inline-block">{'\u00A0'}</span>
        <span className="inline-block w-[2px] h-[1.2em] bg-current opacity-100 animate-blink translate-y-1 ml-1" />
      </span>
    );
  }

  useEffect(() => {
    const handleTyping = () => {
      const currentTagline = taglines[taglineIndex];
      const nextTagline = taglines[(taglineIndex + 1) % taglines.length];

      // --- MODIFIED LOGIC ---
      // Find the common prefix between the current string (being deleted)
      // and the next string (to be typed).
      let i = 0;
      while (
        i < currentTagline.length &&
        i < nextTagline.length &&
        currentTagline[i] === nextTagline[i]
      ) {
        i++;
      }
      const commonPrefix = currentTagline.substring(0, i);
      // --- END MODIFIED LOGIC ---


      if (isDeleting) {
        // --- We are deleting ---
        // Delete until we reach the common prefix
        setDisplayedText((prev) => prev.substring(0, prev.length - 1));

      } else {
        // --- We are typing ---
        // Type out the rest of the current tagline
        setDisplayedText((prev) => currentTagline.substring(0, prev.length + 1));
      }

      // === Check for state transitions ===

      if (!isDeleting && displayedText === currentTagline) {
        // --- 1. Finished typing ---
        // Pause, then start deleting
        timerRef.current = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDuration);

      // --- MODIFIED LOGIC ---
      } else if (isDeleting && displayedText === commonPrefix) {
        // --- 2. Finished deleting to the prefix ---
        // Move to the next tagline and start typing again
        setIsDeleting(false);
        setTaglineIndex((prev) => (prev + 1) % taglines.length);
        // Note: displayedText is already the prefix, so the next typing
        // cycle will correctly start from there.

      } else if (isDeleting && displayedText === "") {
        // --- 3. Fallback (if prefix is empty) ---
        // If we've deleted everything, start typing the next
        setIsDeleting(false);
        setTaglineIndex((prev) => (prev + 1) % taglines.length);
      // --- END MODIFIED LOGIC ---

      } else {
        // --- 4. Still typing or deleting ---
        // Continue the loop
        const currentSpeed = isDeleting ? deleteSpeed : typeSpeed;
        timerRef.current = setTimeout(handleTyping, currentSpeed);
      }
    };

    // Start the typing loop
    // Add a small initial delay when component mounts
    const initialDelay = displayedText ? 0 : 500;
    timerRef.current = setTimeout(handleTyping, isDeleting ? deleteSpeed : typeSpeed + initialDelay);

    // Cleanup function: clear the timeout when component unmounts
    // or when dependencies change
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [displayedText, isDeleting, taglineIndex, taglines, typeSpeed, deleteSpeed, pauseDuration]);

  return (
    // Root element is a <span>
    <span className={cn("inline-block", className)}>
      {/* We add a non-breaking space as a placeholder 
          to prevent layout shift when the text is empty */}
      <span className="min-h-[1.5em] inline-block">
        {displayedText || '\u00A0'}
      </span>
      {/* Blinking cursor effect */}
      <span className="inline-block w-[2px] h-[1.2em] bg-current opacity-100 animate-blink translate-y-1 ml-1" />
    </span>
  );
}