import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { events } from '@/lib/events-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Events - Nour Hub',
  description: 'Stay up to date with all our upcoming events, workshops, and community gatherings.',
};

export default function EventsPage() {
  return (
    <div className="bg-secondary">
        <div className="container mx-auto px-4 py-16">
            <header className="text-center mb-12">
                <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">
                    Our Events
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                    Join us for our upcoming events. We have something for everyone!
                </p>
            </header>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {events.map((event) => {
                    const eventImage = PlaceHolderImages.find((img) => img.id === event.image);
                    return (
                        <Card key={event.id} className="flex flex-col overflow-hidden transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl">
                             <CardHeader className="p-0">
                                {eventImage && (
                                <div className="aspect-video relative">
                                    <Image
                                        src={eventImage.imageUrl}
                                        alt={event.title}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        data-ai-hint={eventImage.imageHint}
                                    />
                                </div>
                                )}
                            </CardHeader>
                            <CardContent className="p-6 flex flex-col flex-grow">
                                <CardTitle className="font-headline text-2xl mb-3">{event.title}</CardTitle>
                                <div className="space-y-2 text-muted-foreground mb-4">
                                    <div className="flex items-center">
                                        <Calendar className="mr-2 h-4 w-4 text-primary" />
                                        <span>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Clock className="mr-2 h-4 w-4 text-primary" />
                                        <span>{event.time}</span>
                                    </div>
                                     <div className="flex items-center">
                                        <MapPin className="mr-2 h-4 w-4 text-primary" />
                                        <span>{event.location}</span>
                                    </div>
                                </div>
                                <CardDescription className="flex-grow">{event.description}</CardDescription>
                                <Button className="w-full mt-6 bg-primary hover:bg-primary/90 text-primary-foreground">
                                    Request to Join
                                </Button>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div>
    </div>
  );
}
