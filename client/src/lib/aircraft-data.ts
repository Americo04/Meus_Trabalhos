export interface AircraftSpec {
  id: string;
  title: string;
  value: string;
  icon: string;
  description: string;
}

export const aircraftSpecs: AircraftSpec[] = [
  {
    id: "length",
    title: "Comprimento",
    value: "14.2m",
    icon: "fas fa-arrows-alt-h",
    description: "Fuselagem aerodinâmica com seção frontal stealth e compartimento de carga modular"
  },
  {
    id: "wingspan", 
    title: "Envergadura",
    value: "18.6m",
    icon: "fas fa-expand-arrows-alt",
    description: "Asas adaptáveis: 12.4m retraídas / 18.6m estendidas com tecnologia morphing"
  },
  {
    id: "height",
    title: "Altura", 
    value: "4.8m",
    icon: "fas fa-arrows-alt-v",
    description: "Incluindo sistema de pouso retrátil e rotores VTOL em configuração vertical"
  },
  {
    id: "weight",
    title: "Peso Máx.",
    value: "8.750kg", 
    icon: "fas fa-weight-hanging",
    description: "MTOW com combustível máximo (2.100L), carga útil de 1.800kg e armamentos"
  },
  {
    id: "speed",
    title: "Velocidade Máx.",
    value: "Mach 1.85",
    icon: "fas fa-tachometer-alt",
    description: "Velocidade supersônica em voo horizontal com pós-combustores ativados"
  },
  {
    id: "range",
    title: "Alcance",
    value: "3.200km",
    icon: "fas fa-route",
    description: "Raio de ação com carga padrão, extensível para 4.800km com tanques auxiliares"
  },
  {
    id: "ceiling",
    title: "Teto Operacional",
    value: "18.500m",
    icon: "fas fa-mountain",
    description: "Altitude máxima operacional com sistemas pressurizados e suporte vital"
  },
  {
    id: "payload",
    title: "Carga Útil",
    value: "1.800kg",
    icon: "fas fa-box",
    description: "Capacidade de armamentos, sensores, contramedidas ou carga civil modular"
  }
];

export interface MediaItem {
  id: string;
  title: string;
  description: string;
  type: "image" | "video" | "model3d";
  src: string;
  alt: string;
}

// Função para verificar se um arquivo existe
const checkFileExists = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
};

// Função para obter o caminho da imagem (local ou fallback)
const getImagePath = (filename: string, fallbackUrl: string): string => {
  const localPath = `/assets/images/${filename}`;
  // Em produção, sempre tenta o arquivo local primeiro
  return localPath;
};

// Função para obter o caminho do vídeo
const getVideoPath = (filename: string): string => {
  return `/assets/videos/${filename}`;
};

// Função para obter o caminho do modelo 3D
const getModelPath = (filename: string): string => {
  const localPath = `/assets/models/${filename}`;
  return localPath;
};

export const mediaItems: MediaItem[] = [
  {
    id: "hangar-view",
    title: "Vista em Hangar",
    description: "VANTH-X9 em configuração de manutenção com asas retraídas",
    type: "image",
    src: getImagePath("hangar-view.jpg", "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&h=600"),
    alt: "Aeronave VANTH-X9 em hangar militar com iluminação técnica"
  },
  {
    id: "flight-test",
    title: "Teste de Voo VTOL", 
    description: "Primeira decolagem vertical em ambiente controlado",
    type: "image",
    src: getImagePath("flight-test.jpg", "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&h=600"),
    alt: "VANTH-X9 realizando decolagem vertical durante testes"
  },
  {
    id: "night-mission",
    title: "Missão Noturna",
    description: "Operação stealth com sistemas de navegação infravermelha",
    type: "image",
    src: getImagePath("night-mission.jpg", "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&h=600"),
    alt: "VANTH-X9 em voo noturno com sistemas de stealth ativados"
  },
  {
    id: "cockpit-systems",
    title: "Sistemas da Cabine",
    description: "Interface holográfica e controles neurais integrados", 
    type: "image",
    src: getImagePath("cockpit-systems.jpg", "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&h=600"),
    alt: "Interior da cabine com displays holográficos e controles avançados"
  },
  {
    id: "carrier-ops",
    title: "Operações Navais",
    description: "Pouso em porta-aviões com sistema de arresto automático",
    type: "image",
    src: getImagePath("carrier-ops.jpg", "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&h=600"),
    alt: "VANTH-X9 pousando em porta-aviões com ganchos de arresto"
  },
  {
    id: "formation-flight",
    title: "Voo em Formação",
    description: "Esquadrão de 4 unidades em missão de reconhecimento",
    type: "image",
    src: getImagePath("formation-flight.jpg", "https://images.unsplash.com/photo-1562113530-57ba3e374de6?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&h=600"),
    alt: "Formação de aeronaves VANTH-X9 em voo coordenado"
  },
  {
    id: "supersonic-test",
    title: "Teste Supersônico",
    description: "Quebra da barreira do som a Mach 1.85",
    type: "image",
    src: getImagePath("supersonic-test.jpg", "https://images.unsplash.com/photo-1560707303-4e980ce876ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&h=600"),
    alt: "VANTH-X9 quebrando a barreira do som com cone de vapor"
  },
  {
    id: "urban-ops",
    title: "Operações Urbanas",
    description: "Pouso VTOL em ambiente urbano densamente povoado",
    type: "image",
    src: getImagePath("urban-ops.jpg", "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&h=600"),
    alt: "VANTH-X9 realizando pouso vertical em área urbana"
  },
  {
    id: "vtol-demo",
    title: "Demonstração VTOL",
    description: "Sequência completa de decolagem e pouso vertical",
    type: "video",
    src: getVideoPath("vtol-test.mp4"),
    alt: "Vídeo demonstrando capacidades VTOL da aeronave VANTH-X9"
  },
  {
    id: "3d-model",
    title: "Modelo 3D Técnico", 
    description: "Visualização interativa completa com especificações",
    type: "model3d",
    src: getModelPath("vanth-x9.glb"),
    alt: "Modelo 3D detalhado da aeronave VANTH-X9 para análise técnica"
  }
];
