'use client';

import { useEffect, useRef } from 'react';

export function VideoBackground() {
  const videoId = 'fdt2W3UDCHw';
  const startTime = 6;
  const playerRef = useRef<any>(null);

  useEffect(() => {
    // 1. Load the YouTube Iframe API Script
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    if (firstScriptTag.parentNode) {
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    // 2. This function gets called by the API when it's ready
    (window as any).onYouTubeIframeAPIReady = () => {
      playerRef.current = new (window as any).YT.Player('youtube-player', {
        // Set height and width to 100% of the *parent* div
        height: '100%',
        width: '100%',
        videoId: videoId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          mute: 1,
          start: startTime,
          loop: 0,
          playlist: videoId,
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

    // 4. This event fires when the player's state changes.
    const onPlayerStateChange = (event: any) => {
      // 0 = 'YT.PlayerState.ENDED'
      if (event.data === 0) {
        playerRef.current.seekTo(startTime, true);
        playerRef.current.playVideo();
      }
    };

    // 5. Cleanup function
    return () => {
      (window as any).onYouTubeIframeAPIReady = null;
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, []); // The empty array ensures this runs only once

  return (
    // This container is fixed and fills the dynamic viewport.
    // **overflow-hidden** is critical to clip the oversized video.
    <div className="fixed top-0 left-0 w-screen h-screen -z-10 overflow-hidden">
      {/*
        This 'div' is the mount point for the player.
        We apply the aspect-ratio-cover CSS magic here.
        It's centered and scaled to *always* be larger than the screen.
      */}
      <div
        id="youtube-player"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen h-[56.25vw] min-h-screen min-w-[177.77vh] pointer-events-none"
      />
      
      {/* This is the dark overlay */}
      <div className="absolute inset-0 bg-black/70" />
    </div>
  );
}
