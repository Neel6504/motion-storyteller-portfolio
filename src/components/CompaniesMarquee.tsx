import { motion } from 'framer-motion';

const companies = [
  { name: 'VOSAP', logo: 'Vosap' },
  { name: 'Shilin Media', logo: 'AB' },
  { name: 'Metaloop', logo: 'MT' },
  { name: 'Lotus Herbals', logo: 'AP' },
  { name: 'Flipkart', logo: 'GO' },
  { name: 'Meta Ads', logo: 'AZ' },
  { name: 'Yuzi', logo: 'MS' },
  { name: 'Dizinfinity', logo: 'MS' },
];


const CompaniesMarquee = () => {
  return (
    <section className="py-12 md:py-16 border-b border-border/50 overflow-hidden bg-background/50" aria-label="Companies worked with">
      <div className="container mx-auto px-4 md:px-6 mb-6 md:mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="text-primary font-medium mb-2 tracking-widest uppercase text-xs md:text-sm">Trusted By</p>
          <h2 className="font-display text-xl md:text-3xl font-bold">Companies I've Worked With</h2>
        </motion.div>
      </div>

      {/* Marquee */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-background to-transparent z-10" />

        <div className="flex overflow-hidden">
          <motion.div
            className="flex gap-4 md:gap-6"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear', repeatType: 'loop' }}
          >
            {[...companies, ...companies, ...companies, ...companies].map((company, index) => (
              <div
                key={`${company.name}-${index}`}
                className="flex items-center px-6 md:px-8 py-4 bg-card/30 border border-border/30 rounded-lg hover:border-primary/50 hover:bg-card/50 transition-all duration-300 flex-shrink-0 group"
              >
                <span className="text-foreground/80 group-hover:text-foreground font-medium text-sm md:text-base whitespace-nowrap transition-colors">
                  {company.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CompaniesMarquee;
