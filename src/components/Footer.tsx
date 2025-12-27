import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="py-8 border-t border-border/50"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <a href="#" className="font-display font-bold text-xl text-foreground hover:text-primary transition-colors">
            NL<span className="text-primary">.</span>
          </a>
          
          <p className="text-muted-foreground text-sm text-center">
            © {currentYear} Neel Lathiya. All rights reserved.
          </p>

          <p className="text-muted-foreground text-sm">
            Crafted with passion & motion
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
