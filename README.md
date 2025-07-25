# 🍽️ Roleta de Comidas

Um app divertido para escolher comidas aleatoriamente usando uma roleta interativa!

## 📱 Funcionalidades

- **Roleta Interativa**: Gire a roleta para escolher uma comida aleatoriamente
- **Gerenciamento de Comidas**: Adicione ou remova comidas da roleta
- **Histórico**: Veja as últimas comidas sorteadas com data e hora
- **Estatísticas**: Acompanhe quais comidas foram mais sorteadas
- **Responsivo**: Funciona perfeitamente em mobile e desktop
- **PWA**: Pode ser instalado como app nativo

## 🚀 Como usar

1. Abra o arquivo `index.html` no navegador
2. Adicione suas comidas favoritas ou use as padrão
3. Gire a roleta e descubra o que comer!
4. Acompanhe seu histórico e estatísticas

## 📱 Instalação como PWA

### No Android (Chrome):
1. Abra o site no Chrome
2. Toque no menu (3 pontos)
3. Selecione "Adicionar à tela inicial"
4. Confirme a instalação

### No iOS (Safari):
1. Abra o site no Safari
2. Toque no botão de compartilhar
3. Selecione "Adicionar à Tela de Início"
4. Confirme a instalação

## 🔧 Preparação dos Ícones

1. Abra o arquivo `generate-icons.html` no navegador
2. Clique com o botão direito em cada ícone
3. Salve com o nome indicado (ex: `icon-192.png`)
4. Coloque todos os ícones na pasta raiz do projeto

## 📦 Publicação no Android

### Opção 1: PWA Builder (Recomendado)
1. Acesse [PWABuilder.com](https://www.pwabuilder.com/)
2. Digite a URL do seu site
3. Clique em "Start" e aguarde a análise
4. Baixe o pacote Android
5. Publique na Google Play Store

### Opção 2: Trusted Web Activity (TWA)
1. Use o [Bubblewrap](https://github.com/GoogleChromeLabs/bubblewrap)
2. Instale: `npm i -g @bubblewrap/cli`
3. Execute: `bubblewrap init --manifest https://seusite.com/manifest.json`
4. Build: `bubblewrap build`
5. Publique o APK gerado

### Opção 3: Capacitor
1. Instale o Capacitor: `npm install @capacitor/core @capacitor/cli`
2. Inicialize: `npx cap init`
3. Adicione Android: `npx cap add android`
4. Build: `npx cap build android`
5. Abra no Android Studio: `npx cap open android`

## 🌐 Hospedagem

### GitHub Pages (Gratuito):
1. Crie um repositório no GitHub
2. Faça upload dos arquivos
3. Vá em Settings > Pages
4. Selecione a branch main
5. Seu site estará em: `https://seuusuario.github.io/nome-repo`

### Netlify (Gratuito):
1. Acesse [Netlify.com](https://netlify.com)
2. Arraste a pasta do projeto
3. Seu site estará online instantaneamente

### Vercel (Gratuito):
1. Acesse [Vercel.com](https://vercel.com)
2. Conecte seu repositório GitHub
3. Deploy automático a cada commit

## 🔧 Tecnologias Utilizadas

- HTML5 Canvas para a roleta
- CSS3 com Flexbox/Grid
- JavaScript ES6+
- Service Worker para PWA
- LocalStorage para persistência

## 📋 Checklist para Publicação

- [ ] Gerar todos os ícones necessários
- [ ] Testar em diferentes dispositivos
- [ ] Hospedar em servidor HTTPS
- [ ] Verificar PWA no Lighthouse
- [ ] Testar instalação como app
- [ ] Preparar screenshots para loja
- [ ] Criar descrição e metadados

## 🎨 Personalização

Você pode personalizar:
- Cores no arquivo `style.css`
- Comidas padrão no arquivo `script.js`
- Ícones e nome do app no `manifest.json`
- Animações e efeitos visuais

## 📱 Requisitos para Google Play

- Ícone de alta resolução (512x512)
- Screenshots de diferentes tamanhos
- Descrição detalhada
- Política de privacidade
- Conta de desenvolvedor Google Play ($25)

## 🐛 Solução de Problemas

**PWA não instala:**
- Verifique se está em HTTPS
- Confirme se o manifest.json está correto
- Teste no Lighthouse

**Roleta não gira no mobile:**
- Verifique se touch events estão funcionando
- Teste em diferentes navegadores

**Dados não salvam:**
- Confirme se localStorage está habilitado
- Verifique console para erros

## 📄 Licença

Este projeto é de código aberto. Sinta-se livre para usar e modificar!