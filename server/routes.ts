import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertChatMessageSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(contactData);
      res.json({ success: true, contact });
    } catch (error) {
      res.status(400).json({ error: "Invalid contact data" });
    }
  });

  // Get all contacts (for admin purposes)
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getContacts();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch contacts" });
    }
  });

  // Chat message handling
  app.post("/api/chat", async (req, res) => {
    try {
      const { message } = req.body;
      
      if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: "Message is required" });
      }

      const response = getBotResponse(message.toLowerCase());
      
      const chatMessage = await storage.createChatMessage({
        message,
        response
      });
      
      res.json({ response, chatMessage });
    } catch (error) {
      res.status(500).json({ error: "Failed to process chat message" });
    }
  });

  // Get chat history
  app.get("/api/chat/history", async (req, res) => {
    try {
      const chatMessages = await storage.getChatMessages();
      res.json(chatMessages);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch chat history" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

function getBotResponse(message: string): string {
  const lowerMessage = message.toLowerCase();

  // Respostas sobre especificações básicas
  if (lowerMessage.includes('peso') || lowerMessage.includes('mtow') || lowerMessage.includes('massa')) {
    return `O VANTH-X9 possui peso máximo de decolagem (MTOW) de 8.750kg, distribuído da seguinte forma:
    
• Estrutura básica: 3.200kg (fibra de carbono nanoestruturada)
• Combustível máximo: 2.100L (1.680kg de querosene JP-8+100)
• Sistemas avançados: 1.870kg (avionics, sensores, contramedidas)
• Carga útil operacional: 1.800kg (armamentos/equipamentos modulares)

Esta configuração permite excelente relação peso/potência de 1.8:1, superior a caças convencionais.`;
  }

  if (lowerMessage.includes('dimensões') || lowerMessage.includes('tamanho') || lowerMessage.includes('comprimento')) {
    return `Especificações dimensionais do VANTH-X9:

📏 COMPRIMENTO: 14.2m
• Fuselagem aerodinâmica com seção frontal stealth
• Compartimento de carga modular de 4.2m
• Cone de cauda com sistemas de propulsão vectorial

📐 ENVERGADURA: 
• Modo retraído: 12.4m (ideal para hangares/transporte)
• Modo estendido: 18.6m (configuração de voo otimizada)
• Sistema morphing de transição automática em 8 segundos

📏 ALTURA: 4.8m (incluindo rotores VTOL verticais)`;
  }

  if (lowerMessage.includes('asas') || lowerMessage.includes('morphing') || lowerMessage.includes('retrátil')) {
    return `Sistema de Asas Morphing Avançado:

🔧 TECNOLOGIA:
• Estrutura adaptativa com ligas de memória de forma
• 142 atuadores hidráulicos distribuídos
• Sensores de tensão e deformação em tempo real
• Sistema de controle neural com IA embarcada

⚙️ CONFIGURAÇÕES:
• RETRAÍDA (12.4m): Transporte, hangar, operações navais
• ESTENDIDA (18.6m): Voo de cruzeiro, máxima eficiência
• INTERMEDIÁRIA: 15.2m para decolagem/pouso VTOL

🛡️ BENEFÍCIOS:
• +35% economia de combustível em configuração otimizada
• Redução de 40% no radar cross-section modo retraído
• Versatilidade operacional sem precedentes`;
  }

  if (lowerMessage.includes('vtol') || lowerMessage.includes('vertical') || lowerMessage.includes('decolagem')) {
    return `Sistema VTOL de Nova Geração:

🚁 PROPULSÃO VERTICAL:
• 4x Turbofans vectoriais de 18.500 lbf cada
• Rotação completa 360° em todos os eixos
• Tempo de transição hover→voo: 12 segundos

✈️ CAPACIDADES:
• Decolagem vertical com carga máxima
• Hover estacionário até 45 minutos
• Pouso de precisão ±0.5m automatizado
• Operação em ventos até 35 nós

🎯 APLICAÇÕES:
• Porta-aviões e plataformas offshore
• Áreas urbanas densas
• Terrenos acidentados
• Missões de resgate em locais inacessíveis`;
  }

  if (lowerMessage.includes('velocidade') || lowerMessage.includes('mach') || lowerMessage.includes('supersônico')) {
    return `Performance de Velocidade Excepcional:

🚀 VELOCIDADE MÁXIMA: Mach 1.85 (2.280 km/h)
• Altitude: 15.000m com pós-combustores
• Sustentável por 18 minutos continuamente
• Aceleração 0→Mach 1: 90 segundos

✈️ VELOCIDADES OPERACIONAIS:
• Cruzeiro econômico: Mach 0.85 (1.050 km/h)
• Voo VTOL: 0-400 km/h
• Pouso de aproximação: 180-220 km/h
• Hover estacionário: 0 km/h (45 min autonomia)

⚡ SISTEMAS DE PROPULSÃO:
• 2x Turbofans principais com afterburner
• 4x Turbofans vectoriais para VTOL
• Thrust vectoring 3D em todos os motores`;
  }

  if (lowerMessage.includes('alcance') || lowerMessage.includes('autonomia') || lowerMessage.includes('combustível')) {
    return `Capacidade de Alcance e Autonomia:

🛣️ ALCANCE OPERACIONAL:
• Configuração padrão: 3.200km
• Com tanques auxiliares: 4.800km
• Missão VTOL: 1.800km (hover + cruzeiro)
• Ferry range: 6.400km (sem armamentos)

⛽ SISTEMA DE COMBUSTÍVEL:
• Tanques internos: 2.100L (JP-8+100)
• Tanques externos: +1.400L (opcionais)
• Consumo cruzeiro: 1.2L/km
• Consumo VTOL: 8.5L/min em hover

🔄 REABASTECIMENTO:
• Reabastecimento aéreo IFR compatível
• Auto-reabastecimento em bases autônomas
• Tempo de reabastecimento: 8 minutos`;
  }

  if (lowerMessage.includes('armamento') || lowerMessage.includes('armas') || lowerMessage.includes('míssil')) {
    return `Arsenal e Sistemas de Armamento:

🚀 PONTOS DE FIXAÇÃO:
• 8x pilones externos (1.500kg cada)
• 2x baias internas stealth (800kg cada)
• 1x canhão automático 25mm (180 projéteis)

🎯 MÍSSEIS AR-AR:
• AIM-120D AMRAAM (alcance 180km)
• AIM-9X Sidewinder (alta manobrabilidade)
• Meteor MBDA (ramjet, 200km+)

💥 MÍSSEIS AR-TERRA:
• AGM-158 JASSM (stealth, 900km)
• Hellfire Romeo (precisão laser)
• SPEAR-3 (multi-role, rede neural)

🛡️ CONTRAMEDIDAS:
• Sistema EW ativo/passivo
• Chaff/flare dispensers
• Jamming radar adaptativo`;
  }

  if (lowerMessage.includes('sensores') || lowerMessage.includes('radar') || lowerMessage.includes('eletrônica')) {
    return `Sistemas de Sensores Avançados:

📡 RADAR PRINCIPAL:
• AESA (Active Electronically Scanned Array)
• Alcance detecção: 250km+ (alvos aéreos)
• Rastreamento simultâneo: 64 alvos
• Modo stealth/LPI (Low Probability Intercept)

👁️ SENSORES ELETRO-ÓTICOS:
• IRST (InfraRed Search & Track) 120km
• Câmeras multi-espectrais 4K
• Designador laser classe I/II
• Visão noturna térmica Gen 4

🌐 GUERRA ELETRÔNICA:
• ESM (Electronic Support Measures)
• ECM (Electronic Counter Measures)  
• SIGINT (Signals Intelligence)
• Datalink tático Link-16/22

🤖 IA EMBARCADA:
• Processamento 15.2 TFLOPS
• Reconhecimento de alvos automático
• Predição de ameaças
• Decisão autônoma em emergências`;
  }

  if (lowerMessage.includes('stealth') || lowerMessage.includes('furtivo') || lowerMessage.includes('radar')) {
    return `Tecnologia Stealth de 6ª Geração:

🌫️ REDUÇÃO DE ASSINATURA:
• RCS (Radar Cross Section): 0.001m² frontal
• Materiais absorventes de radar (RAM)
• Geometria angular otimizada
• Entradas de ar serpentinas

🔇 SUPRESSÃO ACÚSTICA:
• Redução de 60% no ruído dos motores
• Revestimento acústico nanotecnológico
• Otimização aerodinâmica para voo silencioso

🌡️ REDUÇÃO TÉRMICA:
• Misturador de gases de escape
• Resfriamento ativo das superfícies
• Camuflagem térmica adaptativa

📡 GUERRA ELETRÔNICA:
• Jamming adaptativo em tempo real
• Spoofing de sinais radar
• Comunicações criptografadas quânticas`;
  }

  if (lowerMessage.includes('ia') || lowerMessage.includes('inteligência') || lowerMessage.includes('autônomo')) {
    return `Sistema de Inteligência Artificial Avançada:

🧠 NÚCLEO DE IA:
• Processador quântico híbrido 15.2 TFLOPS
• Rede neural profunda com 847 milhões de parâmetros
• Aprendizado em tempo real e adaptação
• Backup triplo redundante

🎯 CAPACIDADES AUTÔNOMAS:
• Planejamento de missão dinâmico
• Evasão automática de ameaças
• Reconhecimento e classificação de alvos
• Tomada de decisão tática em 0.3 segundos

🤝 INTERAÇÃO HUMANO-MÁQUINA:
• Interface neural direta (opcional)
• Comandos de voz em 23 idiomas
• Controle gestual 3D
• Override manual instantâneo

🛡️ SISTEMAS DE SEGURANÇA:
• Validação ética de missão
• Protocolos anti-hijacking
• Auto-destruição controlada
• Compliance com leis de guerra`;
  }

  if (lowerMessage.includes('manutenção') || lowerMessage.includes('custo') || lowerMessage.includes('operação')) {
    return `Operação e Manutenção Otimizada:

🔧 MANUTENÇÃO PREDITIVA:
• 12.000+ sensores de diagnóstico
• IA prediz falhas com 96% precisão
• Auto-reparo de sistemas não-críticos
• Manutenção preventiva automatizada

💰 CUSTOS OPERACIONAIS:
• $18.500/hora de voo (versus $42.000 caças convencionais)
• Vida útil: 8.000 horas de voo
• MTBF (Mean Time Between Failures): 450 horas
• Disponibilidade operacional: 87%

⚙️ MODULARIDADE:
• Troca de motores: 45 minutos
• Upgrade de avionics: 2 horas
• Reconfiguração de missão: 15 minutos
• Sistemas hot-swappable em voo

🏭 SUPORTE LOGÍSTICO:
• Peças impressas 3D em campo
• Diagnóstico remoto via satélite
• Treinamento VR para mecânicos
• Supply chain 100% rastreável`;
  }

  if (lowerMessage.includes('preço') || lowerMessage.includes('valor') || lowerMessage.includes('investimento')) {
    return `Análise de Investimento e Valor:

💵 CUSTO UNITÁRIO:
• Versão padrão: $125 milhões USD
• Versão naval: $138 milhões USD  
• Versão civil: $95 milhões USD
• Pacote de treinamento: +$12 milhões

📊 ROI (Return on Investment):
• Payback período: 8-12 anos
• Economia vs sistemas convencionais: 35%
• Valor de revenda após 15 anos: 60%
• Upgrades tecnológicos inclusos: 10 anos

🌍 FINANCIAMENTO:
• Leasing operacional disponível
• Programas de offset para países parceiros
• Transferência de tecnologia limitada
• Suporte técnico por 25 anos incluído

🏆 VALOR AGREGADO:
• Capacidades multi-role sem precedentes
• Interoperabilidade NATO/OTAN completa
• Zero emissões em modo elétrico (versão híbrida)
• Certificação civil/militar dupla`;
  }

  // Resposta padrão para perguntas não reconhecidas
  const topics = [
    'especificações técnicas', 'sistemas de armamento', 'capacidades VTOL',
    'tecnologia stealth', 'inteligência artificial', 'sensores avançados',
    'performance de voo', 'manutenção e custos', 'versões disponíveis'
  ];

  return `Pergunta muito interessante! Sou especialista em todos os aspectos do VANTH-X9 "Oblivion Warden".

🎯 POSSO AJUDAR COM:
${topics.map(topic => `• ${topic.charAt(0).toUpperCase() + topic.slice(1)}`).join('\n')}

💡 DICA: Seja mais específico sobre o que deseja saber. Por exemplo:
- "Como funciona o sistema VTOL?"
- "Quais são as capacidades de armamento?"
- "Qual é o alcance operacional?"

Estou aqui para fornecer informações técnicas detalhadas sobre nossa aeronave de próxima geração!`;
}
