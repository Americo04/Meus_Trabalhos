import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface RoutePoint {
  x: number;
  y: number;
}

interface Route {
  from: RoutePoint;
  to: RoutePoint;
  progress: number;
}

export default function TacticalMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const routes: Route[] = [
      { from: { x: 50, y: 380 }, to: { x: 280, y: 80 }, progress: 0 },
      { from: { x: 120, y: 360 }, to: { x: 420, y: 120 }, progress: 0.25 },
      { from: { x: 200, y: 340 }, to: { x: 520, y: 180 }, progress: 0.5 },
      { from: { x: 80, y: 320 }, to: { x: 380, y: 220 }, progress: 0.75 }
    ];

    const drawMap = () => {
      if (!isVisible) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Background gradient
      const gradient = ctx.createRadialGradient(canvas.width/2, canvas.height/2, 0, canvas.width/2, canvas.height/2, Math.max(canvas.width, canvas.height)/2);
      gradient.addColorStop(0, 'rgba(0, 34, 51, 0.8)');
      gradient.addColorStop(1, 'rgba(0, 17, 34, 0.95)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Advanced grid with radar sweep effect
      ctx.strokeStyle = 'rgba(0, 255, 255, 0.15)';
      ctx.lineWidth = 1;
      
      const gridSize = 25;
      for (let i = 0; i < canvas.width; i += gridSize) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
      }
      
      for (let i = 0; i < canvas.height; i += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
      }

      // Radar center and sweep
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radarRadius = Math.min(canvas.width, canvas.height) * 0.4;
      
      // Radar circles
      ctx.strokeStyle = 'rgba(0, 255, 255, 0.3)';
      ctx.lineWidth = 1;
      for (let r = radarRadius / 4; r <= radarRadius; r += radarRadius / 4) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Radar sweep
      const sweepAngle = (Date.now() / 2000) % (Math.PI * 2);
      const sweepGradient = ctx.createConicGradient(sweepAngle, centerX, centerY);
      sweepGradient.addColorStop(0, 'rgba(0, 255, 255, 0.1)');
      sweepGradient.addColorStop(0.1, 'rgba(0, 255, 255, 0.3)');
      sweepGradient.addColorStop(0.2, 'rgba(0, 255, 255, 0)');
      ctx.fillStyle = sweepGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Terrain features
      const terrainFeatures = [
        { x: canvas.width * 0.2, y: canvas.height * 0.3, type: 'mountain' },
        { x: canvas.width * 0.7, y: canvas.height * 0.6, type: 'city' },
        { x: canvas.width * 0.5, y: canvas.height * 0.8, type: 'base' },
        { x: canvas.width * 0.8, y: canvas.height * 0.2, type: 'carrier' }
      ];

      terrainFeatures.forEach(feature => {
        ctx.fillStyle = feature.type === 'mountain' ? 'rgba(100, 100, 100, 0.6)' :
                       feature.type === 'city' ? 'rgba(255, 255, 0, 0.4)' :
                       feature.type === 'base' ? 'rgba(0, 255, 0, 0.6)' :
                       'rgba(0, 100, 255, 0.6)';
        
        if (feature.type === 'mountain') {
          ctx.beginPath();
          ctx.moveTo(feature.x - 8, feature.y + 8);
          ctx.lineTo(feature.x, feature.y - 8);
          ctx.lineTo(feature.x + 8, feature.y + 8);
          ctx.closePath();
          ctx.fill();
        } else {
          ctx.fillRect(feature.x - 6, feature.y - 6, 12, 12);
        }
      });

      // Enhanced aircraft routes
      routes.forEach((route, index) => {
        const currentX = route.from.x + (route.to.x - route.from.x) * route.progress;
        const currentY = route.from.y + (route.to.y - route.from.y) * route.progress;
        
        // Route trail with fade effect
        const trailLength = 50;
        for (let i = 0; i < trailLength; i++) {
          const trailProgress = Math.max(0, route.progress - (i / trailLength) * 0.3);
          const trailX = route.from.x + (route.to.x - route.from.x) * trailProgress;
          const trailY = route.from.y + (route.to.y - route.from.y) * trailProgress;
          
          ctx.strokeStyle = `rgba(0, 255, 255, ${(1 - i / trailLength) * 0.6})`;
          ctx.lineWidth = Math.max(1, 3 - (i / trailLength) * 2);
          ctx.beginPath();
          ctx.arc(trailX, trailY, 1, 0, Math.PI * 2);
          ctx.stroke();
        }
        
        // Aircraft icon with direction
        const angle = Math.atan2(route.to.y - route.from.y, route.to.x - route.from.x);
        
        ctx.save();
        ctx.translate(currentX, currentY);
        ctx.rotate(angle);
        
        // Aircraft shape
        ctx.fillStyle = '#00FFFF';
        ctx.beginPath();
        ctx.moveTo(8, 0);
        ctx.lineTo(-4, -3);
        ctx.lineTo(-2, 0);
        ctx.lineTo(-4, 3);
        ctx.closePath();
        ctx.fill();
        
        // Wing indicators
        ctx.strokeStyle = '#00FFFF';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(-2, -6);
        ctx.lineTo(-2, 6);
        ctx.stroke();
        
        ctx.restore();
        
        // Speed and altitude indicators
        ctx.fillStyle = 'rgba(0, 255, 255, 0.8)';
        ctx.font = '10px monospace';
        ctx.fillText(`VANTH-${index + 1}`, currentX + 12, currentY - 8);
        ctx.fillText(`Mach 1.${2 + index}`, currentX + 12, currentY + 4);
        ctx.fillText(`${15000 + index * 1000}m`, currentX + 12, currentY + 16);
        
        // Destination marker with pulse effect
        if (route.progress >= 1) {
          const pulseRadius = 8 + Math.sin(Date.now() / 300) * 3;
          ctx.strokeStyle = '#55FFFF';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(route.to.x, route.to.y, pulseRadius, 0, Math.PI * 2);
          ctx.stroke();
          
          ctx.fillStyle = 'rgba(85, 255, 255, 0.3)';
          ctx.beginPath();
          ctx.arc(route.to.x, route.to.y, 4, 0, Math.PI * 2);
          ctx.fill();
        }
        
        route.progress += 0.002 + index * 0.0005;
        if (route.progress > 1.3) route.progress = 0;
      });

      // Mission data overlay
      ctx.fillStyle = 'rgba(0, 255, 255, 0.7)';
      ctx.font = 'bold 12px monospace';
      ctx.fillText('SISTEMA DE NAVEGAÇÃO TÁTICA VANTH-X9', 10, 25);
      
      ctx.font = '10px monospace';
      ctx.fillText(`TEMPO: ${new Date().toLocaleTimeString('pt-BR')}`, 10, 45);
      ctx.fillText('ESQUADRÃO: 4 AERONAVES ATIVAS', 10, 60);
      ctx.fillText('STATUS: MISSÃO EM ANDAMENTO', 10, 75);
      ctx.fillText('ALTITUDES: 15.000m - 18.000m', 10, 90);

      animationRef.current = requestAnimationFrame(drawMap);
    };

    // Intersection Observer for performance
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
          if (entry.isIntersecting) {
            drawMap();
          } else if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(canvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      observer.disconnect();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isVisible]);

  return (
    <section id="mapa" className="mb-16">
      <div className="bg-cyber-secondary/20 rounded-2xl p-8">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="font-bold text-2xl md:text-3xl text-cyber-primary mb-8 text-center"
        >
          <i className="fas fa-map-marked-alt mr-3"></i>
          Sistema de Navegação Tática
        </motion.h2>
        
        <div className="bg-cyber-dark/60 rounded-xl p-6 tactical-grid">
          <canvas 
            ref={canvasRef}
            className="w-full max-w-4xl mx-auto cyber-glow-strong rounded-lg bg-cyber-secondary/20"
            style={{ height: '400px' }}
            aria-label="Mapa tático com rotas de voo em tempo real"
          />
        </div>
        
        <div className="mt-6 grid md:grid-cols-3 gap-4">
          {[
            {
              icon: "fas fa-route",
              title: "Rotas Dinâmicas",
              description: "Planejamento automático de trajetória"
            },
            {
              icon: "fas fa-satellite-dish",
              title: "GPS Militar", 
              description: "Sistema de posicionamento de precisão"
            },
            {
              icon: "fas fa-eye",
              title: "Reconhecimento",
              description: "Análise de terreno em tempo real"
            }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center bg-cyber-secondary/30 rounded-lg p-4"
            >
              <i className={`${feature.icon} text-cyber-primary text-2xl mb-2`}></i>
              <h3 className="text-cyber-primary font-semibold">{feature.title}</h3>
              <p className="text-cyber-muted text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
