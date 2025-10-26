'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Handshake, Heart, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';

const content = {
  en: {
    title: 'About Nour Hub',
    subtitle: 'Fostering a vibrant community rooted in faith, knowledge, and service.',
    missionTitle: 'Our Mission',
    missionText:
      'Nour Hub is dedicated to creating a supportive and enriching environment for Muslim students. We aim to foster spiritual growth, academic excellence, and community engagement through a variety of programs and events that are both meaningful and enjoyable.',
    valuesTitle: 'Our Values',
    values: [
      {
        icon: Lightbulb,
        title: 'Knowledge',
        text: 'Promoting both Islamic and secular learning as a cornerstone of personal and community development.',
      },
      {
        icon: Handshake,
        title: 'Community',
        text: 'Building strong bonds of brotherhood and sisterhood in an inclusive and welcoming atmosphere.',
      },
      {
        icon: Heart,
        title: 'Service',
        text: 'Instilling a spirit of service and contribution to both the campus and the wider community.',
      },
    ],
    teamTitle: 'Meet the Team',
    teamSubtitle: 'The dedicated individuals leading our community.',
    team: [
      { id: '1', name: 'Ahmed Khan', role: 'President', imageId: 'team-member-1' },
      { id: '2', name: 'Fatima Al-Sayed', role: 'Vice President', imageId: 'team-member-2' },
      { id: '3', name: 'Yusuf Ahmed', role: 'Treasurer', imageId: 'team-member-3' },
    ],
  },
  ar: {
    title: 'عن مركز نور',
    subtitle: 'تنمية مجتمع نابض بالحياة متجذر في الإيمان والمعرفة والخدمة.',
    missionTitle: 'مهمتنا',
    missionText:
      'يكرس مركز نور جهوده لخلق بيئة داعمة ومثرية للطلاب المسلمين. نهدف إلى تعزيز النمو الروحي والتفوق الأكاديمي والمشاركة المجتمعية من خلال مجموعة متنوعة من البرامج والفعاليات الهادفة والممتعة.',
    valuesTitle: 'قيمنا',
    values: [
      {
        icon: Lightbulb,
        title: 'المعرفة',
        text: 'تعزيز التعلم الإسلامي والعلماني كحجر زاوية في تنمية الفرد والمجتمع.',
      },
      {
        icon: Handshake,
        title: 'المجتمع',
        text: 'بناء روابط قوية من الأخوة والأخوة في جو شامل ومرحب.',
      },
      {
        icon: Heart,
        title: 'الخدمة',
        text: 'غرس روح الخدمة والمساهمة في الحرم الجامعي والمجتمع الأوسع.',
      },
    ],
    teamTitle: 'تعرف على الفريق',
    teamSubtitle: 'الأفراد المتفانون الذين يقودون مجتمعنا.',
    team: [
      { id: '1', name: 'أحمد خان', role: 'الرئيس', imageId: 'team-member-1' },
      { id: '2', name: 'فاطمة السيد', role: 'نائب الرئيس', imageId: 'team-member-2' },
      { id: '3', name: 'يوسف أحمد', role: 'أمين الصندوق', imageId: 'team-member-3' },
    ],
  },
};

export default function AboutPage() {
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  const pageContent = content[lang];
  const missionImage = PlaceHolderImages.find((img) => img.id === 'about-mission');

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex justify-end mb-8">
        <div className="flex items-center space-x-2 rounded-lg bg-secondary p-1">
          <Button
            variant={lang === 'en' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setLang('en')}
            className={cn('transition-all', lang === 'en' && 'bg-background shadow text-primary')}
          >
            English
          </Button>
          <Button
            variant={lang === 'ar' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setLang('ar')}
            className={cn('transition-all', lang === 'ar' && 'bg-background shadow text-primary')}
          >
            العربية
          </Button>
        </div>
      </div>

      <header className="text-center mb-16" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary">
          {pageContent.title}
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          {pageContent.subtitle}
        </p>
      </header>

      {/* Mission Section */}
      <section className="mb-24" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="font-headline text-3xl font-semibold mb-4">{pageContent.missionTitle}</h2>
            <p className="text-muted-foreground leading-relaxed">{pageContent.missionText}</p>
          </div>
          <div className="order-1 md:order-2">
            {missionImage && (
              <Image
                src={missionImage.imageUrl}
                alt={missionImage.description}
                width={600}
                height={400}
                className="rounded-lg shadow-lg object-cover w-full h-auto"
                data-ai-hint={missionImage.imageHint}
              />
            )}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="mb-24" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl font-bold">{pageContent.valuesTitle}</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {pageContent.values.map((value) => (
            <Card key={value.title} className="text-center bg-card">
              <CardHeader>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground mb-4">
                  <value.icon className="h-8 w-8" />
                </div>
                <CardTitle className="font-headline text-2xl">{value.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{value.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section dir={lang === 'ar' ? 'rtl' : 'ltr'}>
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl font-bold">{pageContent.teamTitle}</h2>
          <p className="mt-2 text-lg text-muted-foreground">{pageContent.teamSubtitle}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          {pageContent.team.map((member) => {
            const memberImage = PlaceHolderImages.find((img) => img.id === member.imageId);
            return (
              <div key={member.id} className="text-center flex flex-col items-center">
                {memberImage && (
                  <Image
                    src={memberImage.imageUrl}
                    alt={member.name}
                    width={150}
                    height={150}
                    className="rounded-full shadow-md mb-4 object-cover"
                    data-ai-hint={memberImage.imageHint}
                  />
                )}
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-primary font-medium">{member.role}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
