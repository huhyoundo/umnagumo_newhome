import Header from './components/Header';
import Hero from './components/Hero';
import ClinicSection from './components/ClinicSection';
import DoctorSection from './components/DoctorSection';
import StatsSection from './components/StatsSection';
import BeforeAfterSection from './components/BeforeAfterSection';
import ContentGrid from './components/ContentGrid';
import Footer from './components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ClinicSection />
        <DoctorSection />
        <StatsSection />
        <BeforeAfterSection />
        <ContentGrid />
      </main>
      <Footer />
    </>
  );
}
