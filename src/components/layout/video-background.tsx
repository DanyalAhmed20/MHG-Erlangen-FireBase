'use client';

export function VideoBackground() {
  const videoId = 'fdt2W3UDCHw';
  // URL parameters:
  // - autoplay=1 (starts the video)
  // - mute=1 (required for autoplay in most browsers)
  // - controls=0 (hides the player controls)
  // - loop=1 (makes the video loop)
  // - playlist=fdt2W3UDCHw (YouTube requires this to make 'loop=1' work on a single video)
  // - start=60 (starts the video at the 60-second mark)
  const videoSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&start=6`;

  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10">
      <iframe
        src={videoSrc}
        title="Video Background"
        frameBorder="0"
        allow="autoplay; encrypted-media" // Allow autoplay
        className="w-full h-full object-cover pointer-events-none" // 'pointer-events-none' is crucial so you can click things on top of the video
      />
      {/* This is the dark overlay from your original component. */}
      <div className="absolute inset-0 bg-black/70" />
    </div>
  );
}