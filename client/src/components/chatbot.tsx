import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { apiRequest } from "@/lib/queryClient";

interface ChatMessage {
  id: string;
  sender: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      sender: "assistant",
      content: `Bem-vindo ao sistema de consulta técnica do VANTH-X9 "Oblivion Warden"!

🎯 SOU ESPECIALISTA EM:
• Especificações técnicas e dimensões
• Sistemas de armamento e sensores
• Capacidades VTOL e performance
• Tecnologia stealth e IA embarcada
• Operação e manutenção
• Análise de custos e investimento

💡 PERGUNTAS POPULARES:
- "Como funciona o sistema VTOL?"
- "Quais são as capacidades de armamento?"
- "Qual é o alcance operacional?"
- "Como funciona a tecnologia stealth?"

Digite sua pergunta ou escolha um dos tópicos acima!`,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const chatMutation = useMutation({
    mutationFn: async (message: string) => {
      const response = await apiRequest("POST", "/api/chat", { message });
      return response.json();
    },
    onSuccess: (data) => {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        sender: "assistant",
        content: data.response,
        timestamp: new Date()
      }]);
    },
    onError: () => {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        sender: "assistant", 
        content: "Desculpe, ocorreu um erro ao processar sua mensagem. Tente novamente.",
        timestamp: new Date()
      }]);
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || chatMutation.isPending) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: "user",
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    chatMutation.mutate(inputValue);
    setInputValue("");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-16 right-0 w-80 bg-cyber-secondary/95 backdrop-blur-sm rounded-2xl cyber-glow-strong shadow-2xl overflow-hidden"
          >
            <div className="bg-cyber-primary/20 p-4 border-b border-cyber-primary/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <i className="fas fa-robot text-cyber-primary mr-2"></i>
                  <h3 className="text-cyber-primary font-semibold">Assistente VANTH-X9</h3>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-cyber-accent hover:text-cyber-primary h-8 w-8 p-0"
                >
                  <i className="fas fa-times"></i>
                </Button>
              </div>
            </div>
            
            <ScrollArea className="h-80 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`${
                      message.sender === "user" 
                        ? "ml-6" 
                        : "mr-2"
                    }`}
                  >
                    <div className={`p-4 rounded-lg border ${
                      message.sender === "user" 
                        ? "bg-cyber-primary/15 border-cyber-primary/30 text-cyber-primary" 
                        : "bg-cyber-secondary/30 border-cyber-accent/20 text-cyber-muted"
                    }`}>
                      <div className="flex items-start gap-2 mb-2">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                          message.sender === "user"
                            ? "bg-cyber-primary text-cyber-dark"
                            : "bg-cyber-accent text-cyber-dark"
                        }`}>
                          {message.sender === "user" ? "U" : "AI"}
                        </div>
                        <span className="font-semibold text-xs opacity-75">
                          {message.sender === "user" ? "Você" : "VANTH-X9 Assistant"}
                        </span>
                        <span className="text-xs opacity-50 ml-auto">
                          {message.timestamp.toLocaleTimeString('pt-BR', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </span>
                      </div>
                      
                      <div className={`text-sm leading-relaxed ${
                        message.sender === "user" ? "text-cyber-primary" : "text-cyber-accent"
                      }`}>
                        {message.content.split('\n').map((line, index) => (
                          <div key={index} className={line.startsWith('•') ? 'ml-4' : ''}>
                            {line.includes('🚀') || line.includes('📡') || line.includes('🔧') || 
                             line.includes('💰') || line.includes('🎯') || line.includes('🛡️') ||
                             line.includes('⚙️') || line.includes('✈️') || line.includes('🧠') ||
                             line.includes('👁️') || line.includes('🌐') || line.includes('🤖') ||
                             line.includes('🌫️') || line.includes('🔇') || line.includes('🌡️') ||
                             line.includes('🤝') || line.includes('🛣️') || line.includes('⛽') ||
                             line.includes('🔄') || line.includes('💥') || line.includes('📏') ||
                             line.includes('📐') || line.includes('🚁') || line.includes('⚡') ||
                             line.includes('💵') || line.includes('📊') || line.includes('🌍') ||
                             line.includes('🏆') || line.includes('🏭') || line.includes('💡') ? (
                              <div className="font-semibold text-cyber-primary mt-3 mb-1">{line}</div>
                            ) : line.startsWith('•') ? (
                              <div className="flex items-start gap-2 py-0.5">
                                <span className="text-cyber-accent mt-1">•</span>
                                <span>{line.substring(1).trim()}</span>
                              </div>
                            ) : line.startsWith('-') ? (
                              <div className="italic opacity-75 ml-2">{line}</div>
                            ) : line.trim() ? (
                              <div className="mb-1">{line}</div>
                            ) : (
                              <div className="h-2"></div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
                {chatMutation.isPending && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-cyber-secondary/40 mr-4 p-3 rounded-lg"
                  >
                    <p className="text-cyber-accent text-sm">
                      <strong className="text-cyber-primary">Assistente:</strong>{" "}
                      <i className="fas fa-spinner fa-spin mr-1"></i>
                      Processando...
                    </p>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
            
            <form onSubmit={handleSubmit} className="p-4 border-t border-cyber-primary/30">
              <div className="flex gap-2">
                <Input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Digite sua pergunta..."
                  disabled={chatMutation.isPending}
                  className="bg-cyber-dark/60 border-cyber-primary/30 text-cyber-muted focus:border-cyber-primary"
                />
                <Button 
                  type="submit"
                  disabled={chatMutation.isPending || !inputValue.trim()}
                  className="bg-cyber-primary text-cyber-dark hover:bg-cyber-accent px-4"
                >
                  <i className="fas fa-paper-plane"></i>
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-cyber-primary text-cyber-dark p-4 rounded-full cyber-glow-strong hover:bg-cyber-accent shadow-lg h-12 w-12"
        >
          <i className="fas fa-robot text-xl"></i>
        </Button>
      </motion.div>
    </div>
  );
}
