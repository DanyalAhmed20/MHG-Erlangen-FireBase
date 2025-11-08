'use client';

import { useEffect, useRef } from 'react';

export function VideoBackground() {
  const videoId = 'fdt2W3UDCHw'; // The YouTube video ID
  const startTime = 6; // Start time in seconds
  
  // Use a ref to store the player object to access it later
  const playerRef = useRef<any>(null);

  useEffect(() => {
    // 1. Load the YouTube Iframe API script dynamically
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    if (firstScriptTag.parentNode) {
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    // 2. This global function gets called by the API when it's ready
    (window as any).onYouTubeIframeAPIReady = () => {
      playerRef.current = new (window as any).YT.Player('youtube-player', {
        height: '100%',
        width: '100%',
        videoId: videoId,
        playerVars: {
          autoplay: 1, // Autoplay the video
          controls: 0, // Hide player controls
          mute: 1, // Mute the video
          start: startTime, // Start at the specified time
          loop: 0, // We turn off the API's 'loop' param to do it manually
          playlist: videoId, // Required for looping (even manual)
        },
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
        },
      });
    };

    // 3. This event fires when the player is ready to play
    const onPlayerReady = (event: any) => {
      event.target.playVideo();
    };

    // 4. This event fires when the player's state changes (e.g., playing, paused, ended)
    const onPlayerStateChange = (event: any) => {
      // 0 = 'YT.PlayerState.ENDED' (the video finished)
      if (event.data === 0) {
        // When the video ends, seek back to the start time and play again
        playerRef.current.seekTo(startTime, true);
        playerRef.current.playVideo();
      }
    };

    // 5. Cleanup function to prevent memory leaks when the component unmounts
    return () => {
      // Remove the global function
      (window as any).onYouTubeIframeAPIReady = null;
      
      // Destroy the player instance
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, []); // The empty array ensures this effect runs only once on mount

  return (
    // This outer div positions the video as a fixed, full-screen background
    <div className="fixed top-0 left-0 w-full h-full -z-10">
      {/* This 'div' is the mount point for the YouTube player.
        The API will replace this div with an <iframe>.
      */}
      <div
        id="youtube-player"
        className="w-full h-full object-cover pointer-events-none"
      />
      {/* This is the dark overlay */}
      <div className="absolute inset-0 bg-black/70" />
    </div>
  );
}
