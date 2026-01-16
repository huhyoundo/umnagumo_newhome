import Header from './components/Header';
import Hero from './components/Hero';
import YouTubeFeaturedSectionDeferred from './components/deferred/YouTubeFeaturedSectionDeferred';
import BeforeAfterSectionDeferred from './components/deferred/BeforeAfterSectionDeferred';
import ClinicSectionDeferred from './components/deferred/ClinicSectionDeferred';
import ContentGridDeferred from './components/deferred/ContentGridDeferred';
import DoctorSectionDeferred from './components/deferred/DoctorSectionDeferred';
import FooterDeferred from './components/deferred/FooterDeferred';
import StatsSectionDeferred from './components/deferred/StatsSectionDeferred';
import TrustSystemSectionDeferred from './components/deferred/TrustSystemSectionDeferred';
import type { Metadata } from 'next';
import { createPageMetadata } from './lib/seo';

export const metadata: Metadata = createPageMetadata({
  path: '/',
});

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ClinicSectionDeferred />
        <StatsSectionDeferred />
        <TrustSystemSectionDeferred />
        <DoctorSectionDeferred />
        <YouTubeFeaturedSectionDeferred />
        <BeforeAfterSectionDeferred />
        <ContentGridDeferred />
      </main>
      <FooterDeferred />
    </>
  );
}
