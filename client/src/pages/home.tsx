import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";
import AircraftSpecs from "@/components/aircraft-specs";
import WingSystem from "@/components/wing-system";
import MediaGallery from "@/components/media-gallery";
import TacticalMap from "@/components/tactical-map";
import ContactSection from "@/components/contact-section";
import ChatBot from "@/components/chatbot";

export default function Home() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-cyber-dark text-cyber-muted">
      {/* Header */}
      <header className="bg-cyber-secondary/80 backdrop-blur-sm cyber-glow sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-center flex-1">
              <h1 className="font-black text-3xl md:text-4xl text-cyber-primary animate-glow">
                VANTH-X9 "Oblivion Warden"
              </h1>
              <p className="text-cyber-accent text-sm md:text-base mt-1">
                Aeronave VTOL Autônoma de Última Geração
              </p>
            </div>
            
            <Button
              onClick={toggleTheme}
              size="icon"
              className="ml-4 bg-cyber-primary text-cyber-dark hover:bg-cyber-accent cyber-glow-strong"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-cyber-secondary/60 backdrop-blur-sm border-b border-cyber-primary/20">
        <div className="container mx-auto px-6">
          <ul className="flex flex-wrap justify-center gap-6 py-3">
            <li><a href="#introducao" className="text-cyber-accent hover:text-cyber-primary transition-colors duration-300">Introdução</a></li>
            <li><a href="#dimensoes" className="text-cyber-accent hover:text-cyber-primary transition-colors duration-300">Dimensões</a></li>
            <li><a href="#asas" className="text-cyber-accent hover:text-cyber-primary transition-colors duration-300">Asas Retráteis</a></li>
            <li><a href="#media" className="text-cyber-accent hover:text-cyber-primary transition-colors duration-300">Galeria</a></li>
            <li><a href="#mapa" className="text-cyber-accent hover:text-cyber-primary transition-colors duration-300">Mapa Tático</a></li>
            <li><a href="#contato" className="text-cyber-accent hover:text-cyber-primary transition-colors duration-300">Contato</a></li>
          </ul>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-8 max-w-6xl">
        {/* Introduction */}
        <section id="introducao" className="mb-16">
          <div className="bg-cyber-secondary/30 rounded-2xl p-8 cyber-glow">
            <h2 className="font-bold text-2xl md:text-3xl text-cyber-primary mb-6 border-b-2 border-cyber-primary pb-3">
              <i className="fas fa-rocket mr-3"></i>
              Teoria da Criação da Aeronave
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <p className="text-cyber-muted leading-relaxed">
                  O VANTH-X9 "Oblivion Warden" foi projetado para redefinir os parâmetros da aviação autônoma com foco em 
                  <span className="text-cyber-primary font-semibold"> eficiência</span>, 
                  <span className="text-cyber-primary font-semibold"> furtividade</span> e 
                  <span className="text-cyber-primary font-semibold"> adaptabilidade</span> em missões militares e civis.
                </p>
                
                <p className="text-cyber-muted leading-relaxed">
                  Sua estrutura VTOL (decolagem e pouso vertical) possibilita operações em ambientes urbanos e remotos, 
                  com alta capacidade de carga e alcance estendido graças a tecnologias híbridas de propulsão e materiais compósitos ultraleves.
                </p>
                
                <div className="bg-cyber-primary/10 border border-cyber-primary/30 rounded-lg p-4">
                  <h3 className="text-cyber-primary font-semibold mb-2">
                    <i className="fas fa-shield-alt mr-2"></i>
                    Características Principais
                  </h3>
                  <ul className="space-y-2 text-cyber-accent">
                    <li><i className="fas fa-check-circle mr-2 text-cyber-primary"></i>Assinatura acústica e térmica minimizada</li>
                    <li><i className="fas fa-check-circle mr-2 text-cyber-primary"></i>IA embarcada para autonomia máxima</li>
                    <li><i className="fas fa-check-circle mr-2 text-cyber-primary"></i>Design aerodinâmico com asas retráteis</li>
                  </ul>
                </div>
              </div>
              
              <div className="flex justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                  alt="Conceito futurista de aeronave militar VTOL" 
                  className="rounded-xl cyber-glow-strong w-full max-w-md h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Aircraft Specifications */}
        <AircraftSpecs />

        {/* Wing System */}
        <WingSystem />

        {/* Media Gallery */}
        <MediaGallery />

        {/* Tactical Map */}
        <TacticalMap />

        {/* Contact Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <footer className="bg-cyber-secondary/80 backdrop-blur-sm cyber-glow border-t border-cyber-primary/20">
        <div className="container mx-auto px-6 py-6 text-center">
          <p className="text-cyber-accent">
            <i className="fas fa-code mr-2"></i>
            Desenvolvido com <span className="text-cyber-primary">💙</span> por Henry Gabriel da Silva Americo
          </p>
          <p className="text-cyber-muted text-sm mt-2">
            VANTH-X9 "Oblivion Warden" - Projeto Conceitual de Aeronave VTOL Autônoma
          </p>
        </div>
      </footer>

      {/* ChatBot */}
      <ChatBot />
    </div>
  );
}
