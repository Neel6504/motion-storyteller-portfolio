import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Maximize2, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ResumeSection = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const resumePdfUrl = '/resume.pdf'; // Place your resume.pdf in the public folder

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = resumePdfUrl;
    link.download = 'Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="resume" className="py-20 px-4 md:px-8 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 mb-6">
            <FileText className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Professional Resume</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            View My Resume
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore my professional experience, skills, and qualifications
          </p>
        </motion.div>

        {/* PDF Viewer Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          {/* Controls Bar */}
          <div className="flex justify-between items-center mb-4 p-4 rounded-t-xl bg-card/50 backdrop-blur-sm border border-border/50">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              <span className="font-medium">Resume.pdf</span>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownload}
                className="gap-2"
              >
                <Download className="w-4 h-4" />
                Download
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="gap-2"
              >
                {isFullscreen ? (
                  <>
                    <Minimize2 className="w-4 h-4" />
                    Exit Fullscreen
                  </>
                ) : (
                  <>
                    <Maximize2 className="w-4 h-4" />
                    Fullscreen
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* PDF Viewer */}
          <div
            className={`relative rounded-b-xl overflow-hidden border border-border/50 bg-card/30 backdrop-blur-sm transition-all duration-300 ${
              isFullscreen
                ? 'fixed inset-4 z-50 rounded-xl'
                : 'w-full'
            }`}
          >
            {isFullscreen && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsFullscreen(false)}
                className="absolute top-4 right-4 z-50 bg-background/80 backdrop-blur-sm hover:bg-background"
              >
                <Minimize2 className="w-5 h-5" />
              </Button>
            )}
            
            <iframe
              src={`${resumePdfUrl}#toolbar=1&navpanes=0&scrollbar=1`}
              className={`w-full ${
                isFullscreen ? 'h-full' : 'h-[800px]'
              } border-0`}
              title="Resume PDF Viewer"
            />
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        </motion.div>

        {/* Alternative Text for browsers that don't support PDF viewing */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-8 text-sm text-muted-foreground"
        >
          <p>
            Having trouble viewing? {' '}
            <button
              onClick={handleDownload}
              className="text-primary hover:underline font-medium"
            >
              Download the PDF instead
            </button>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ResumeSection;
