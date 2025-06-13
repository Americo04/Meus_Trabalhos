import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function WingSystem() {
  const [wingsExtended, setWingsExtended] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [systemStatus, setSystemStatus] = useState<"ready" | "extending" | "retracting">("ready");

  const toggleWings = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setSystemStatus(wingsExtended ? "retracting" : "extending");
    
    setTimeout(() => {
      setWingsExtended(!wingsExtended);
      setSystemStatus("ready");
      setIsAnimating(false);
    }, 600);
  };

  return (
    <section id="asas" className="mb-16">
      <div className="bg-gradient-to-r from-cyber-secondary/20 to-cyber-primary/10 rounded-2xl p-8">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="font-bold text-2xl md:text-3xl text-cyber-primary mb-8 text-center"
        >
          <i className="fas fa-paper-plane mr-3"></i>
          Sistema de Asas Retráteis
        </motion.h2>
        
        <div className="flex flex-col items-center mb-8">
          {/* Status Display */}
          <div className="mb-4 bg-cyber-secondary/40 rounded-lg px-4 py-2 border border-cyber-primary/30">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${
                systemStatus === "ready" ? "bg-green-400" : 
                systemStatus === "extending" ? "bg-yellow-400 animate-pulse" : 
                "bg-orange-400 animate-pulse"
              }`}></div>
              <span className="text-cyber-primary font-mono text-sm">
                STATUS: {
                  systemStatus === "ready" ? "SISTEMA PRONTO" :
                  systemStatus === "extending" ? "ESTENDENDO ASAS..." :
                  "RETRAINDO ASAS..."
                }
              </span>
            </div>
          </div>

          {/* Wing Animation Container */}
          <div className="relative">
            <motion.div
              className={`wing-system cyber-glow-strong cursor-pointer ${wingsExtended ? 'extended' : ''} ${isAnimating ? 'pointer-events-none' : ''}`}
              onClick={toggleWings}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggleWings();
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={wingsExtended ? 'Asas estendidas - clique para retrair' : 'Asas retraídas - clique para estender'}
              whileHover={!isAnimating ? { scale: 1.05 } : {}}
              whileTap={!isAnimating ? { scale: 0.95 } : {}}
              animate={{
                width: wingsExtended ? 420 : 260,
                background: wingsExtended 
                  ? 'linear-gradient(45deg, #00bbbb, #007777)' 
                  : 'linear-gradient(45deg, #007777, #004444)',
                boxShadow: wingsExtended
                  ? '0 0 30px rgba(0, 255, 255, 0.6)'
                  : '0 0 20px rgba(0, 255, 255, 0.3)'
              }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-semibold text-cyber-primary text-sm">
                  {isAnimating ? "ATIVANDO..." : "CLIQUE PARA ATIVAR"}
                </span>
              </div>
              
              {/* Wing Extension Indicators */}
              <AnimatePresence>
                {wingsExtended && (
                  <>
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      className="absolute -left-8 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-cyber-primary/60 rounded-full flex items-center justify-center"
                    >
                      <i className="fas fa-arrow-left text-xs text-cyber-dark"></i>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      className="absolute -right-8 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-cyber-primary/60 rounded-full flex items-center justify-center"
                    >
                      <i className="fas fa-arrow-right text-xs text-cyber-dark"></i>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Technical Readouts */}
          <div className="mt-6 grid grid-cols-2 gap-4 w-full max-w-md">
            <div className="bg-cyber-secondary/30 rounded-lg p-3 text-center">
              <div className="text-cyber-primary font-mono text-xs mb-1">CONFIGURAÇÃO</div>
              <div className="text-cyber-accent font-semibold">
                {wingsExtended ? "ESTENDIDA" : "RETRAÍDA"}
              </div>
            </div>
            <div className="bg-cyber-secondary/30 rounded-lg p-3 text-center">
              <div className="text-cyber-primary font-mono text-xs mb-1">ENVERGADURA</div>
              <div className="text-cyber-accent font-semibold">
                {wingsExtended ? "18.6m" : "12.4m"}
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-cyber-accent mb-4">
            <i className="fas fa-mouse-pointer mr-2"></i>
            Clique na asa para demonstrar o sistema de retração/extensão
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <motion.div 
              className="bg-cyber-secondary/30 rounded-lg p-5 border border-cyber-primary/20"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-cyber-primary font-semibold mb-3 flex items-center">
                <i className="fas fa-compress-arrows-alt mr-2"></i>
                Modo Retraído
              </h3>
              <ul className="text-cyber-muted text-sm space-y-2">
                <li><i className="fas fa-check text-cyber-accent mr-2"></i>Envergadura: 12.4m</li>
                <li><i className="fas fa-check text-cyber-accent mr-2"></i>Perfil reduzido 35%</li>
                <li><i className="fas fa-check text-cyber-accent mr-2"></i>Ideal para hangares</li>
                <li><i className="fas fa-check text-cyber-accent mr-2"></i>Transporte naval</li>
              </ul>
            </motion.div>
            
            <motion.div 
              className="bg-cyber-secondary/30 rounded-lg p-5 border border-cyber-primary/20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-cyber-primary font-semibold mb-3 flex items-center">
                <i className="fas fa-expand-arrows-alt mr-2"></i>
                Modo Estendido
              </h3>
              <ul className="text-cyber-muted text-sm space-y-2">
                <li><i className="fas fa-check text-cyber-accent mr-2"></i>Envergadura: 18.6m</li>
                <li><i className="fas fa-check text-cyber-accent mr-2"></i>Eficiência +25%</li>
                <li><i className="fas fa-check text-cyber-accent mr-2"></i>Alcance máximo</li>
                <li><i className="fas fa-check text-cyber-accent mr-2"></i>Estabilidade superior</li>
              </ul>
            </motion.div>

            <motion.div 
              className="bg-cyber-secondary/30 rounded-lg p-5 border border-cyber-primary/20"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-cyber-primary font-semibold mb-3 flex items-center">
                <i className="fas fa-cogs mr-2"></i>
                Sistema Morphing
              </h3>
              <ul className="text-cyber-muted text-sm space-y-2">
                <li><i className="fas fa-check text-cyber-accent mr-2"></i>Transição: 8 segundos</li>
                <li><i className="fas fa-check text-cyber-accent mr-2"></i>Atuadores hidráulicos</li>
                <li><i className="fas fa-check text-cyber-accent mr-2"></i>Redundância tripla</li>
                <li><i className="fas fa-check text-cyber-accent mr-2"></i>Auto-diagnóstico</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
