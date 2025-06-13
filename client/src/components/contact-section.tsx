import { useState } from "react";
import { motion } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const contactSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  subject: z.string().min(1, "Selecione um assunto"), 
  message: z.string().min(10, "Mensagem deve ter pelo menos 10 caracteres")
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactSection() {
  const { toast } = useToast();
  
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    }
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      return apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Mensagem enviada!",
        description: "Obrigado pelo contato. Responderemos em breve.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Erro ao enviar",
        description: "Ocorreu um erro ao enviar sua mensagem. Tente novamente.",
        variant: "destructive"
      });
    }
  });

  const onSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

  return (
    <section id="contato" className="mb-16">
      <div className="bg-gradient-to-br from-cyber-secondary/30 to-cyber-primary/10 rounded-2xl p-8">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="font-bold text-2xl md:text-3xl text-cyber-primary mb-8 text-center"
        >
          <i className="fas fa-address-book mr-3"></i>
          Contato e Informações
        </motion.h2>
        
        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <div className="bg-cyber-secondary/40 rounded-xl p-6 mb-6">
              <h3 className="text-cyber-primary font-semibold text-xl mb-4">
                Desenvolvedor Principal
              </h3>
              
              <div className="flex items-center space-x-4 mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200" 
                  alt="Henry Gabriel da Silva Americo - Desenvolvedor principal do projeto VANTH-X9" 
                  className="w-20 h-20 rounded-full cyber-glow object-cover"
                />
                <div>
                  <h4 className="text-cyber-primary font-semibold text-lg">Henry Gabriel da Silva Americo</h4>
                  <p className="text-cyber-accent">Engenheiro Aeroespacial</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <i className="fas fa-envelope text-cyber-primary mr-3"></i>
                  <a href="mailto:americo88.h@gmail.com" className="text-cyber-accent hover:text-cyber-primary transition-colors">
                    americo88.h@gmail.com
                  </a>
                </div>
                
                <div className="flex items-center">
                  <i className="fas fa-phone text-cyber-primary mr-3"></i>
                  <a href="tel:+5516993028342" className="text-cyber-accent hover:text-cyber-primary transition-colors">
                    +55 16 99302-8342
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-cyber-secondary/40 rounded-xl p-6">
              <h3 className="text-cyber-primary font-semibold text-lg mb-3">
                <i className="fas fa-copyright mr-2"></i>
                Direitos Autorais
              </h3>
              <p className="text-cyber-muted text-sm">
                © 2024 Henry Gabriel da Silva Americo. Todos os direitos reservados. 
                Projeto VANTH-X9 desenvolvido para fins educacionais e demonstrativos.
              </p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-cyber-primary font-semibold">
                        <i className="fas fa-user mr-2"></i>Nome Completo
                      </FormLabel>
                      <FormControl>
                        <Input 
                          {...field}
                          placeholder="Digite seu nome completo"
                          className="bg-cyber-secondary/60 border-cyber-primary/30 text-cyber-muted focus:border-cyber-primary"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-cyber-primary font-semibold">
                        <i className="fas fa-envelope mr-2"></i>Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="seu.email@exemplo.com"
                          className="bg-cyber-secondary/60 border-cyber-primary/30 text-cyber-muted focus:border-cyber-primary"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-cyber-primary font-semibold">
                        <i className="fas fa-tag mr-2"></i>Assunto
                      </FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-cyber-secondary/60 border-cyber-primary/30 text-cyber-muted focus:border-cyber-primary">
                            <SelectValue placeholder="Selecione um assunto" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-cyber-secondary border-cyber-primary/30">
                          <SelectItem value="specs">Especificações Técnicas</SelectItem>
                          <SelectItem value="demo">Demonstração</SelectItem>
                          <SelectItem value="partnership">Parcerias</SelectItem>
                          <SelectItem value="other">Outros</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-cyber-primary font-semibold">
                        <i className="fas fa-comment mr-2"></i>Mensagem
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          rows={5}
                          placeholder="Digite sua mensagem..."
                          className="bg-cyber-secondary/60 border-cyber-primary/30 text-cyber-muted focus:border-cyber-primary resize-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit"
                  disabled={contactMutation.isPending}
                  className="w-full bg-cyber-primary text-cyber-dark font-bold py-4 hover:bg-cyber-accent cyber-glow-strong"
                >
                  {contactMutation.isPending ? (
                    <>
                      <i className="fas fa-spinner fa-spin mr-2"></i>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-paper-plane mr-2"></i>
                      Enviar Mensagem
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
