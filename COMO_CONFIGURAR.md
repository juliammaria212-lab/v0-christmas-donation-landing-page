# Como Configurar a Integração de Pagamento

## Estado Atual

A landing page está **100% funcional em MODO DE TESTE**. Você pode:
- Navegar por toda a página
- Clicar nos botões de doação
- Preencher o formulário
- Ver um Pix de demonstração
- Testar o fluxo completo até a página de agradecimento

## O que falta para PRODUÇÃO

Para processar pagamentos reais via UmbrellaPag, você precisa configurar apenas 2 credenciais:

### Passo 1: Obter credenciais da UmbrellaPag

1. Acesse [umbrellapag.com](https://umbrellapag.com) e crie sua conta
2. Faça login no painel administrativo
3. Vá em **Configurações** → **API**
4. Copie seu **API Token**
5. Vá em **Produtos** e copie o **Product ID** do seu produto de doação

### Passo 2: Configurar o arquivo .env.local

1. Na raiz do projeto, abra o arquivo `.env.local`
2. Substitua os valores placeholder pelas credenciais reais:

\`\`\`env
# Substitua estas linhas:
LIBERPAY_API_TOKEN=seu_token_aqui
LIBERPAY_PRODUCT_ID=seu_product_id_aqui

# Por suas credenciais reais:
LIBERPAY_API_TOKEN=sk_live_abc123xyz789...
LIBERPAY_PRODUCT_ID=prod_def456uvw012...
\`\`\`

3. Salve o arquivo

### Passo 3: Reiniciar o servidor

\`\`\`bash
# Se estiver em desenvolvimento local
npm run dev

# Se estiver em produção (Vercel)
# Faça deploy novamente ou adicione as variáveis no painel da Vercel
\`\`\`

### Passo 4: Configurar webhook (opcional, mas recomendado)

Para receber notificações automáticas de pagamentos confirmados:

1. No painel da UmbrellaPag, vá em **Configurações** → **Webhooks**
2. Adicione a URL: `https://seu-dominio.com/api/webhooks/payment`
3. Marque os eventos: `payment.paid`, `payment.refused`, `payment.expired`

**Importante:** Em desenvolvimento local, use [ngrok](https://ngrok.com) para expor sua URL:

\`\`\`bash
ngrok http 3000
# Use a URL gerada (ex: https://abc123.ngrok.io/api/webhooks/payment)
\`\`\`

## Verificando se está funcionando

Quando configurado corretamente:

- ✅ O banner "MODO DE TESTE" não aparecerá mais
- ✅ Os QR Codes serão reais e escaneáveis
- ✅ O sistema verificará automaticamente quando o pagamento for confirmado
- ✅ Você receberá notificações via webhook

## Troubleshooting

### Erro: "Hostname não identificado"
**Causa:** Credenciais inválidas ou não configuradas  
**Solução:** Verifique se copiou corretamente o API Token e Product ID

### Erro: "Configuração de pagamento incompleta"
**Causa:** Variáveis de ambiente não foram carregadas  
**Solução:** Verifique se o arquivo `.env.local` está na raiz do projeto e reinicie o servidor

### Pagamento não é confirmado automaticamente
**Causa:** Webhook não configurado ou inacessível  
**Solução:** Configure o webhook conforme Passo 4 acima

## Suporte

- Documentação UmbrellaPag: [docs.umbrellapag.com](https://docs.umbrellapag.com)
- Suporte UmbrellaPag: suporte@umbrellapag.com

---

**Nota:** O modo de teste permite que você demonstre a landing page para clientes/investidores sem processar pagamentos reais.
