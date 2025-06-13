# 📁 Guia: Como Adicionar Suas Imagens, Vídeos e Modelo 3D

## 🖼️ IMAGENS DA AERONAVE

### Onde colocar:
Pasta: `client/public/assets/images/`

### Nomes dos arquivos (use exatamente estes nomes):
- `hangar-view.jpg` - Vista da aeronave no hangar
- `flight-test.jpg` - Teste de voo VTOL
- `night-mission.jpg` - Missão noturna  
- `cockpit-systems.jpg` - Sistemas da cabine
- `carrier-ops.jpg` - Operações navais
- `formation-flight.jpg` - Voo em formação
- `supersonic-test.jpg` - Teste supersônico
- `urban-ops.jpg` - Operações urbanas

### Formatos aceitos:
- .jpg, .jpeg, .png, .webp
- Resolução recomendada: 1920x1080 ou superior
- Tamanho máximo: 5MB por imagem

---

## 🎥 VÍDEOS DA AERONAVE

### Onde colocar:
Pasta: `client/public/assets/videos/`

### Nome do arquivo:
- `vtol-test.mp4` - Demonstração VTOL

### Formatos aceitos:
- .mp4 (preferido), .webm, .mov
- Resolução recomendada: 1920x1080
- Tamanho máximo: 50MB
- Duração recomendada: até 2 minutos

---

## 🎯 MODELO 3D

### Onde colocar:
Pasta: `client/public/assets/models/`

### Nome do arquivo:
- `vanth-x9.glb` (formato preferido)
- OU `vanth-x9.gltf`

### Formatos aceitos:
- .glb (recomendado - arquivo único)
- .gltf (com texturas separadas)
- Tamanho máximo: 10MB

---

## 🚀 COMO ADICIONAR OS ARQUIVOS

### Método 1: Arrastar e Soltar (Replit)
1. Abra o explorador de arquivos do Replit
2. Navegue até a pasta correspondente
3. Arraste seus arquivos diretamente para a pasta

### Método 2: Upload Manual
1. No Replit, clique com botão direito na pasta
2. Selecione "Upload file"
3. Escolha seus arquivos

### Método 3: Via Terminal
```bash
# Para copiar arquivos locais (se estiver rodando localmente)
cp suas_imagens/* client/public/assets/images/
cp seus_videos/* client/public/assets/videos/
cp seu_modelo_3d/* client/public/assets/models/
```

---

## ✅ VERIFICAÇÃO

Após adicionar os arquivos:
1. O site detectará automaticamente seus arquivos
2. Se um arquivo não for encontrado, será usado um placeholder temporário
3. Verifique a galeria de mídia no site
4. O modelo 3D aparecerá com controles interativos

---

## 🔧 DICAS IMPORTANTES

### Para Imagens:
- Use nomes exatos listados acima
- Otimize as imagens para web (compressão ~80%)
- Mantenha proporção 16:9 quando possível

### Para Vídeos:
- Codifique em H.264 para melhor compatibilidade
- Use bitrate de 2-5 Mbps para 1080p
- Inclua áudio se necessário

### Para Modelo 3D:
- Otimize o modelo (máximo 50k polígonos)
- Use texturas PBR (Physically Based Rendering)
- Inclua normais e materiais
- Teste em visualizadores 3D antes do upload

---

## 🆘 PROBLEMAS COMUNS

**Imagem não aparece:**
- Verifique o nome do arquivo
- Confirme que está na pasta correta
- Verifique o formato do arquivo

**Vídeo não carrega:**
- Confirme formato MP4
- Verifique tamanho do arquivo
- Teste em outro player primeiro

**Modelo 3D não funciona:**
- Use formato .glb
- Verifique se o modelo não está corrompido
- Teste em https://gltf-viewer.donmccurdy.com/

---

## 📞 NEED HELP?

Se tiver problemas, verifique:
1. Nomes dos arquivos estão corretos
2. Arquivos estão nas pastas certas
3. Formatos são suportados
4. Tamanhos estão dentro dos limites

O sistema está configurado para detectar automaticamente seus arquivos!