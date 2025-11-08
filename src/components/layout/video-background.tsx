'use client';

import { useEffect, useRef } from 'react';

export function VideoBackground() {
  const videoId = 'fdt2W3UDCHw';
  const startTime = 6;
  // Use a ref to store the player object
  const playerRef = useRef<any>(null);

  useEffect(() => {
    // 1. Load the YouTube Iframe API Script
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode!.insertBefore(tag, firstScriptTag);

    // 2. This function gets called by the API when it's ready
    (window as any).onYouTubeIframeAPIReady = () => {
      playerRef.current = new (window as any).YT.Player('youtube-player', {
        height: '100%',
        width: '100%',
        videoId: videoId,
        playerVars: {
          autoplay: 1, // Autoplay
          controls: 0, // Hide controls
          mute: 1, // Mute
          start: startTime, // Start at 60 seconds
          loop: 0, // We turn off the 'loop' param, we'll do it manually
          playlist: videoId, // Required for... something. YouTube is weird.
        },
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
        },
      });
    };

    // 3. This event fires when the player is ready
    const onPlayerReady = (event: any) => {
      event.target.playVideo();
    };

    // 4. This is the magic! This event fires when the player's state changes.
    const onPlayerStateChange = (event: any) => {
      // 0 = 'YT.PlayerState.ENDED' (the video finished)
      if (event.data === 0) {
        // When the video ends, seek back to the start time and play again.
        playerRef.current.seekTo(startTime, true);
        playerRef.current.playVideo();
      }
    };

    // 5. Cleanup function to prevent memory leaks
    return () => {
      // Remove the global function when the component unmounts
      (window as any).onYouTubeIframeAPIReady = null;
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, []); // The empty array ensures this runs only once

  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10">
      {/* This 'div' is now the mount point for the YouTube player.
        The API will replace this div with the iframe.
      */}
      <div
        id="youtube-player"
        className="w-full h-full object-cover pointer-events-none"
      />
      {/* This is the dark overlay from your original component. */}
      <div className="absolute inset-0 bg-black/70" />
    </div>
  );
}