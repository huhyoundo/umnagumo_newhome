import Header from './components/Header';
import Hero from './components/Hero';
import ClinicSection from './components/ClinicSection';
import DoctorSection from './components/DoctorSection';
import StatsSection from './components/StatsSection';
import TrustSystemSection from './components/TrustSystemSection';
import BeforeAfterSection from './components/BeforeAfterSection';
import ContentGrid from './components/ContentGrid';
import YouTubeFeaturedSection from './components/YouTubeFeaturedSection';
import Footer from './components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ClinicSection />
        <StatsSection />
        <TrustSystemSection />
        <DoctorSection />
        <YouTubeFeaturedSection />
        <BeforeAfterSection />
        <ContentGrid />
      </main>
      <Footer />
    </>
  );
}
