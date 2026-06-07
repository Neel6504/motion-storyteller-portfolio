import ParticleBackground from '@/components/ParticleBackground';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import CompaniesMarquee from '@/components/CompaniesMarquee';
import InfluencersMarquee from '@/components/InfluencersMarquee';
import PortfolioSection from '@/components/PortfolioSection';
import ToolsMarquee from '@/components/ToolsMarquee';
import AboutSection from '@/components/AboutSection';
import ResumeSection from '@/components/ResumeSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background film-grain">
      <ParticleBackground />
      <Header />
      <main>
        <HeroSection />
        <CompaniesMarquee />
        <InfluencersMarquee />
        <PortfolioSection />
        <ToolsMarquee />
        <AboutSection />
        <ResumeSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
