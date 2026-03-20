import { motion } from 'framer-motion';
import { FileText, Download, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMagneticEffect } from '@/hooks/useMagneticEffect';

const ResumeSection = () => {
  const magneticRefView = useMagneticEffect({ strength: 0.2, speed: 0.15 });
  const magneticRefDownload = useMagneticEffect({ strength: 0.2, speed: 0.15 });
  const magneticRefCvView = useMagneticEffect({ strength: 0.2, speed: 0.15 });
  const magneticRefCvDownload = useMagneticEffect({ strength: 0.2, speed: 0.15 });
  const resumePdfUrl = '/resume.pdf'; // Place your resume.pdf in the public folder
  const cvPdfUrl = '/cv.pdf'; // Place your cv.pdf in the public folder

  const handleDownload = (url: string, fileName: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleViewDocument = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <section id="resume" className="py-12 md:py-20 px-4 md:px-8 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-primary/20 bg-primary/5 mb-4 md:mb-6">
            <FileText className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary" />
            <span className="text-xs md:text-sm font-medium text-primary">Professional Resume</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent px-4">
            View My Resume
          </h2>
          <p className="text-muted-foreground text-sm md:text-base lg:text-lg max-w-2xl mx-auto px-4">
            Explore my professional experience, skills, and qualifications
          </p>
        </motion.div>

        {/* PDF Viewer Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative max-w-4xl mx-auto"
        >
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-0 p-3 md:p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50">
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <FileText className="w-4 h-4 md:w-5 md:h-5 text-primary" />
              <span className="font-medium text-sm md:text-base">Resume.pdf</span>
            </div>
            <div className="flex gap-2 justify-center sm:justify-end">
              <div ref={magneticRefView as any}>
                <Button
                  size="sm"
                  onClick={() => handleViewDocument(resumePdfUrl)}
                  className="gap-1.5 md:gap-2 flex-1 sm:flex-initial text-xs md:text-sm"
                >
                  <ExternalLink className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  <span>View Resume</span>
                </Button>
              </div>
              <div ref={magneticRefDownload as any}>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDownload(resumePdfUrl, 'Resume.pdf')}
                  className="gap-1.5 md:gap-2 flex-1 sm:flex-initial text-xs md:text-sm"
                >
                  <Download className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  <span>Download</span>
                </Button>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-0 p-3 md:p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 mt-3 md:mt-4">
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <FileText className="w-4 h-4 md:w-5 md:h-5 text-primary" />
              <span className="font-medium text-sm md:text-base">CV.pdf</span>
            </div>
            <div className="flex gap-2 justify-center sm:justify-end">
              <div ref={magneticRefCvView as any}>
                <Button
                  size="sm"
                  onClick={() => handleViewDocument(cvPdfUrl)}
                  className="gap-1.5 md:gap-2 flex-1 sm:flex-initial text-xs md:text-sm"
                >
                  <ExternalLink className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  <span>View CV</span>
                </Button>
              </div>
              <div ref={magneticRefCvDownload as any}>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDownload(cvPdfUrl, 'CV.pdf')}
                  className="gap-1.5 md:gap-2 flex-1 sm:flex-initial text-xs md:text-sm"
                >
                  <Download className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  <span>Download</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Decorative Elements - hidden on mobile */}
          <div className="hidden md:block absolute -top-20 -left-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
          <div className="hidden md:block absolute -bottom-20 -right-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
};

export default ResumeSection;
