# 🚀 Deploy no Vercel - Loja do Japão

## 📋 Passo a Passo para Deploy

### **1. Acesse o Vercel**
- Vá para: https://vercel.com
- Clique em "Sign Up" ou "Login"
- Conecte com sua conta GitHub

### **2. Importar Projeto**
- Clique em "New Project"
- Selecione "Import Git Repository"
- Escolha: `ReinaldoCandeo/japaloja`
- Clique em "Import"

### **3. Configurações do Deploy**
- **Project Name:** `loja-do-japao`
- **Framework Preset:** `Other` (ou deixe automático)
- **Root Directory:** `/` (raiz)
- **Build Command:** (deixe vazio)
- **Output Directory:** (deixe vazio)

### **4. Deploy**
- Clique em "Deploy"
- Aguarde o processo (1-2 minutos)
- Você receberá uma URL como: `https://loja-do-japao.vercel.app`

## 🔄 Deploy Automático

### **Como Funciona:**
- ✅ **Push no GitHub** → Deploy automático no Vercel
- ✅ **Mudanças em tempo real** visíveis na URL
- ✅ **Histórico de deploys** no painel do Vercel
- ✅ **Rollback** para versões anteriores

### **Fluxo de Trabalho:**
1. **Faça mudanças** no código local
2. **Commit e push** para GitHub
3. **Vercel detecta** automaticamente
4. **Deploy automático** em 1-2 minutos
5. **Site atualizado** na URL

## 🛠️ Comandos Úteis

### **Deploy Manual (se necessário):**
```bash
# Instalar Vercel CLI
npm install -g vercel

# Login no Vercel
vercel login

# Deploy do projeto
vercel

# Deploy para produção
vercel --prod
```

### **Comandos Git para Atualizações:**
```bash
# Adicionar mudanças
git add .

# Commit com mensagem
git commit -m "Descrição da mudança"

# Push para GitHub
git push origin main
```

## 📱 Recursos do Vercel

### **Funcionalidades Incluídas:**
- ✅ **HTTPS automático**
- ✅ **CDN global** (carregamento rápido)
- ✅ **Deploy automático** do GitHub
- ✅ **Preview de branches** (teste antes de publicar)
- ✅ **Analytics** de performance
- ✅ **Domínio personalizado** (opcional)

### **URLs do Projeto:**
- **Produção:** `https://loja-do-japao.vercel.app`
- **Preview:** `https://loja-do-japao-git-main.vercel.app`
- **Admin:** https://vercel.com/dashboard

## 🔧 Configurações Avançadas

### **Domínio Personalizado:**
1. Vá para o painel do Vercel
2. Selecione seu projeto
3. Vá em "Settings" → "Domains"
4. Adicione seu domínio personalizado

### **Variáveis de Ambiente:**
- Configure no painel do Vercel
- Útil para APIs e configurações

### **Analytics:**
- Ative no painel do Vercel
- Monitore performance e uso

## 🎯 Resultado Final

Após o deploy, você terá:
- ✅ **Site online** e acessível
- ✅ **URL pública** para compartilhar
- ✅ **Deploy automático** a cada push
- ✅ **Performance otimizada**
- ✅ **HTTPS seguro**

## 📞 Suporte

- **Vercel Docs:** https://vercel.com/docs
- **GitHub:** https://github.com/ReinaldoCandeo/japaloja
- **Projeto:** Loja do Japão

---

**Deploy configurado com sucesso! 🎌✨**
