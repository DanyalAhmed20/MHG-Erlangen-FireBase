export type Event = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
};

export const events: Event[] = [
  {
    id: '1',
    title: 'Weekly Halaqa: The Seerah',
    date: '2024-10-05T19:00:00Z',
    time: '7:00 PM - 8:30 PM',
    location: 'University Mosque, Room 3',
    description: 'Join us for our weekly halaqa as we delve into the life of the Prophet Muhammad (PBUH). Refreshments will be provided.',
    image: 'event-1',
  },
  {
    id: '2',
    title: 'Community Potluck Dinner',
    date: '2024-10-12T18:30:00Z',
    time: '6:30 PM onwards',
    location: 'Student Union, Great Hall',
    description: 'A social gathering for all students. Bring a dish to share and meet new people in a friendly and relaxed atmosphere.',
    image: 'event-2',
  },
  {
    id: '3',
    title: 'Volunteer Day: Park Cleanup',
    date: '2024-10-20T10:00:00Z',
    time: '10:00 AM - 1:00 PM',
    location: 'City Central Park',
    description: "Give back to the community with our monthly volunteer event. We'll be helping to clean up and beautify our local park.",
    image: 'event-3',
  },
  {
    id: '4',
    title: 'Mid-Term Study Group',
    date: '2024-10-26T14:00:00Z',
    time: '2:00 PM - 5:00 PM',
    location: 'Main Library, Group Study Area 2',
    description: 'Prepare for mid-terms with fellow students. A quiet and supportive environment to focus and help one another succeed.',
    image: 'event-4',
  },
];
