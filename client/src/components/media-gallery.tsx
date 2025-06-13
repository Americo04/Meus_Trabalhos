import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { mediaItems } from "@/lib/aircraft-data";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

export default function MediaGallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const categories = [
    { id: "all", name: "Todas", icon: "fas fa-th" },
    { id: "operations", name: "Operações", icon: "fas fa-fighter-jet" },
    { id: "technical", name: "Técnicas", icon: "fas fa-cogs" },
    { id: "3d", name: "3D/VR", icon: "fas fa-cube" }
  ];

  const getCategoryForItem = (itemId: string) => {
    if (itemId.includes('test') || itemId.includes('mission') || itemId.includes('ops') || itemId.includes('formation')) return 'operations';
    if (itemId.includes('systems') || itemId.includes('hangar') || itemId.includes('supersonic')) return 'technical';
    if (itemId.includes('3d')) return '3d';
    return 'operations';
  };

  const filteredItems = selectedCategory === "all" 
    ? mediaItems 
    : mediaItems.filter(item => getCategoryForItem(item.id) === selectedCategory);

  return (
    <section id="media" className="mb-16">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="font-bold text-2xl md:text-3xl text-cyber-primary mb-8 text-center"
      >
        <i className="fas fa-photo-video mr-3"></i>
        Arsenal Visual e Documentação
      </motion.h2>

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {categories.map((category) => (
          <motion.button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-3 rounded-lg border transition-all duration-300 ${
              selectedCategory === category.id
                ? "bg-cyber-primary text-cyber-dark border-cyber-primary cyber-glow-strong"
                : "bg-cyber-secondary/30 text-cyber-accent border-cyber-primary/30 hover:border-cyber-primary/60"
            }`}
          >
            <i className={`${category.icon} mr-2`}></i>
            {category.name}
          </motion.button>
        ))}
      </div>

      {/* Media Grid */}
      <motion.div 
        layout
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -6 }}
              className="group relative bg-gradient-to-br from-cyber-secondary/40 to-cyber-primary/10 rounded-xl overflow-hidden cyber-glow hover:cyber-glow-strong transition-all duration-500 border border-cyber-primary/20"
            >
              <Dialog>
                <DialogTrigger asChild>
                  <div className="cursor-pointer">
                    {item.type === "image" && (
                      <div className="relative overflow-hidden">
                        <img 
                          src={item.src}
                          alt={item.alt}
                          className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                          onError={(e) => {
                            // Fallback para imagem não encontrada
                            const target = e.target as HTMLImageElement;
                            if (target.src.includes('/assets/')) {
                              const fallbackUrls: Record<string, string> = {
                                'hangar-view.jpg': 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&h=600',
                                'flight-test.jpg': 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&h=600',
                                'night-mission.jpg': 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&h=600',
                                'cockpit-systems.jpg': 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&h=600',
                                'carrier-ops.jpg': 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&h=600',
                                'formation-flight.jpg': 'https://images.unsplash.com/photo-1562113530-57ba3e374de6?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&h=600',
                                'supersonic-test.jpg': 'https://images.unsplash.com/photo-1560707303-4e980ce876ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&h=600',
                                'urban-ops.jpg': 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&h=600'
                              };
                              const filename = target.src.split('/').pop() || '';
                              if (fallbackUrls[filename]) {
                                target.src = fallbackUrls[filename];
                              }
                            }
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute top-3 right-3">
                          <Badge variant="secondary" className="bg-cyber-primary/20 text-cyber-primary border-cyber-primary/30">
                            <i className="fas fa-image mr-1"></i>
                            HD
                          </Badge>
                        </div>
                        <div className="absolute bottom-3 left-3 right-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          <div className="flex items-center gap-2 text-cyber-primary">
                            <i className="fas fa-expand-arrows-alt"></i>
                            <span className="text-sm font-semibold">Ampliar Imagem</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {item.type === "video" && (
                      <div className="relative overflow-hidden">
                        <video
                          className="w-full h-56 object-cover"
                          controls
                          preload="metadata"
                          poster={item.src.replace('.mp4', '-poster.jpg')}
                        >
                          <source src={item.src} type="video/mp4" />
                          Seu navegador não suporta vídeo HTML5.
                        </video>
                        <div className="absolute top-3 right-3">
                          <Badge variant="secondary" className="bg-green-400/20 text-green-400 border-green-400/30">
                            <i className="fas fa-play mr-1"></i>
                            VIDEO
                          </Badge>
                        </div>
                      </div>
                    )}
                    
                    {item.type === "model3d" && (
                      <div className="relative w-full h-56 bg-gradient-to-br from-cyber-primary/30 to-cyber-secondary/50 flex flex-col items-center justify-center overflow-hidden">
                        {/* Modelo 3D Real usando model-viewer */}
                        <model-viewer
                          src={item.src}
                          alt={item.alt}
                          camera-controls
                          auto-rotate
                          rotation-per-second="30deg"
                          style={{
                            width: '100%',
                            height: '100%',
                            background: 'transparent'
                          }}
                          onError={() => {
                            // Fallback para modelo não encontrado
                            console.log('Modelo 3D não encontrado, usando fallback');
                          }}
                        >
                          {/* Fallback caso modelo não carregue */}
                          <div slot="poster" className="w-full h-full flex flex-col items-center justify-center">
                            <motion.div
                              animate={{ 
                                rotateY: [0, 360],
                                scale: [1, 1.1, 1]
                              }}
                              transition={{ 
                                duration: 8, 
                                repeat: Infinity, 
                                ease: "linear" 
                              }}
                              className="relative"
                            >
                              <i className="fas fa-cube text-cyber-primary text-6xl mb-4"></i>
                              <div className="absolute inset-0 bg-cyber-primary/20 rounded-full blur-xl"></div>
                            </motion.div>
                            <div className="text-center relative z-10">
                              <p className="text-cyber-primary font-bold text-lg mb-1">Modelo 3D</p>
                              <p className="text-cyber-accent text-sm">Carregando modelo...</p>
                            </div>
                          </div>
                        </model-viewer>
                        
                        <div className="absolute top-3 right-3">
                          <Badge variant="secondary" className="bg-cyber-accent/20 text-cyber-accent border-cyber-accent/30">
                            <i className="fas fa-vr-cardboard mr-1"></i>
                            3D
                          </Badge>
                        </div>
                        <div className="absolute bottom-3 left-3 right-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          <div className="flex items-center gap-2 text-cyber-primary">
                            <i className="fas fa-cube"></i>
                            <span className="text-sm font-semibold">Visualizar em 3D</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </DialogTrigger>

                <DialogContent className="max-w-4xl bg-cyber-secondary border-cyber-primary/30">
                  <div className="relative">
                    {item.type === "image" && (
                      <img 
                        src={item.src}
                        alt={item.alt}
                        className="w-full max-h-[70vh] object-contain rounded-lg"
                      />
                    )}
                    {item.type === "model3d" && (
                      <div className="w-full h-96 bg-gradient-to-br from-cyber-primary/20 to-cyber-secondary/40 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <i className="fas fa-cube text-cyber-primary text-8xl mb-4"></i>
                          <p className="text-cyber-primary font-bold text-xl mb-2">Modelo 3D Interativo</p>
                          <p className="text-cyber-accent">Funcionalidade completa em desenvolvimento</p>
                        </div>
                      </div>
                    )}
                  </div>
                </DialogContent>
              </Dialog>

              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-cyber-primary font-bold text-lg leading-tight">{item.title}</h3>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-cyber-primary rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-cyber-accent rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-cyber-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
                
                <p className="text-cyber-muted text-sm leading-relaxed mb-4">{item.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-cyber-accent">
                    <i className="fas fa-clock"></i>
                    <span>Atualizado recentemente</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-cyber-primary">
                    <i className="fas fa-eye"></i>
                    <span>Visualizar</span>
                  </div>
                </div>
              </div>

              {/* Hover overlay effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyber-primary/5 to-cyber-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Statistics */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="mt-12 bg-cyber-secondary/20 rounded-xl p-6 border border-cyber-primary/20"
      >
        <div className="grid md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl font-bold text-cyber-primary mb-1">{mediaItems.length}</div>
            <div className="text-cyber-muted text-sm">Arquivos de Mídia</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-cyber-accent mb-1">4K</div>
            <div className="text-cyber-muted text-sm">Resolução Ultra HD</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-cyber-primary mb-1">360°</div>
            <div className="text-cyber-muted text-sm">Visualização 3D</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-cyber-accent mb-1">100%</div>
            <div className="text-cyber-muted text-sm">Conteúdo Autêntico</div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
