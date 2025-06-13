import { motion } from "framer-motion";
import { aircraftSpecs } from "@/lib/aircraft-data";

export default function AircraftSpecs() {
  return (
    <section id="dimensoes" className="mb-16">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="font-bold text-2xl md:text-3xl text-cyber-primary mb-8 text-center"
      >
        <i className="fas fa-ruler-combined mr-3"></i>
        Especificações Técnicas
      </motion.h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {aircraftSpecs.map((spec, index) => (
          <motion.div
            key={spec.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="bg-gradient-to-br from-cyber-secondary/50 to-cyber-primary/10 rounded-xl p-6 text-center cyber-glow hover:cyber-glow-strong transition-all duration-300 cursor-pointer border border-cyber-primary/20"
          >
            <div className="bg-cyber-primary/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <i className={`${spec.icon} text-cyber-primary text-2xl`}></i>
            </div>
            <h3 className="font-semibold text-cyber-primary text-lg mb-2">{spec.title}</h3>
            <p className="text-2xl md:text-3xl font-bold text-cyber-accent mb-3 cyber-text-glow">{spec.value}</p>
            <p className="text-xs text-cyber-muted/90 leading-relaxed">{spec.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
