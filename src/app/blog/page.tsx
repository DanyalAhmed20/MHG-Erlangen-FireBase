import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export const metadata = {
  title: 'Blog - MHG Erlangen',
  description: 'Reflections, stories, and updates from the MHG Erlangen community.',
};

const samplePosts = [
    {
        slug: 'reflections-on-community',
        title: 'Reflections on Community',
        excerpt: 'Exploring what it means to build a strong, faith-based community in a modern world.',
        imageId: 'blog-post-1'
    },
    {
        slug: 'balancing-studies-and-faith',
        title: 'Balancing Studies and Faith',
        excerpt: 'Tips and thoughts on how to excel academically while nurturing your spiritual life.',
        imageId: 'blog-post-2'
    }
]

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <header className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">
          Our Blog
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Reflections, stories, and updates from the MHG Erlangen community. Coming soon!
        </p>
      </header>
      
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-headline font-semibold mb-8 text-center">Sample Posts</h2>
         <div className="grid gap-8">
            {samplePosts.map((post) => {
                const postImage = PlaceHolderImages.find(img => img.id === post.imageId)
                return (
                    <Link href={`/blog/${post.slug}`} key={post.slug}>
                        <Card className="group flex flex-col md:flex-row overflow-hidden transition-all duration-300 hover:shadow-xl hover:bg-secondary">
                             {postImage && (
                                <div className="md:w-1/3 aspect-video md:aspect-auto relative">
                                    <Image 
                                        src={postImage.imageUrl} 
                                        alt={post.title} 
                                        fill
                                        className="object-cover"
                                        data-ai-hint={postImage.imageHint}
                                    />
                                </div>
                            )}
                            <div className="flex-1">
                                <CardHeader>
                                    <CardTitle className="font-headline text-2xl group-hover:text-primary transition-colors">{post.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription>{post.excerpt}</CardDescription>
                                    <div className="flex items-center mt-4 text-primary font-semibold text-sm">
                                        Read More <ArrowRight className="ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-1" />
                                    </div>
                                </CardContent>
                            </div>
                        </Card>
                    </Link>
                )
            })}
        </div>
      </div>
    </div>
  );
}
