# Integração Pix - UmbrellaPag/Liberpay

A landing page "Operação Papai Noel" está configurada para processar pagamentos via Pix usando a API da UmbrellaPag/Liberpay.

## Configuração Necessária

### 1. Credenciais da API

Você precisa de **3 variáveis** no arquivo `.env.local`:

\`\`\`env
LIBERPAY_API_BASE=https://api-gateway.umbrellapag.com/api
LIBERPAY_API_TOKEN=4413ea15-0f94-4c3d-9add-eadb78a7f5ae
LIBERPAY_PRODUCT_ID=SEU_PRODUCT_ID_AQUI
NEXT_PUBLIC_BASE_URL=https://v0-christmas-donation-landing-page-six.vercel.app
\`\`\`

**Nota:** Quando migrar para produção, altere `NEXT_PUBLIC_BASE_URL` para `https://doeparaonatal.online`

### 2. Como Obter as Credenciais

#### API Token
1. Acesse [umbrellapag.com](https://umbrellapag.com) e faça login
2. Vá em **Configurações > API**
3. Copie seu **API Token**
4. Cole no arquivo `.env.local`

#### Product ID (uniqueProductLinkId)
1. No dashboard da UmbrellaPag, acesse **Produtos**
2. Clique em **Criar Produto**
3. Preencha:
   - **Nome**: "Doação Natal"
   - **Tipo**: Serviço
   - **Valor**: pode deixar "0" (será sobrescrito em cada doação)
4. Após criar, copie o **uniqueProductLinkId** do produto
5. Cole no arquivo `.env.local` como `LIBERPAY_PRODUCT_ID`

### 3. Configurar Webhook

Para receber notificações de pagamento confirmado:

1. No dashboard da UmbrellaPag, acesse **Configurações > Webhooks**
2. Adicione a URL: `https://v0-christmas-donation-landing-page-six.vercel.app/api/webhooks/payment`
3. Selecione os eventos de transação (especialmente `transaction.paid`)

**Quando migrar para produção:** atualize para `https://doeparaonatal.online/api/webhooks/payment`

## Como Funciona

### Fluxo de Pagamento (2 Etapas)

1. **Usuário preenche formulário** → nome (obrigatório), email e telefone (opcionais)
2. **Backend cria pedido de checkout** → `POST /api/public/checkout/create-order/{productId}`
3. **Backend cria pagamento Pix** → `POST /api/public/checkout/payment/{orderId}`
4. **Frontend exibe QR Code e copia-e-cola** → dados retornados da API
5. **Polling automático** → verifica status a cada 10 segundos
6. **Webhook confirma pagamento** → atualiza status para "PAID"
7. **Redirect automático** → usuário vai para página de obrigado

### Endpoints

**Backend (seu Next.js):**
- `POST /api/donations/create` - Cria pedido + pagamento Pix
- `POST /api/webhooks/payment` - Recebe confirmação de pagamento
- `GET /api/donations/status/[id]` - Consulta status da doação

**UmbrellaPag API (chamadas internas):**
- `POST /api/public/checkout/create-order/{productId}` - Cria pedido
- `POST /api/public/checkout/payment/{orderId}` - Cria pagamento Pix

## Estrutura das Requisições

### Etapa 1: Criar Pedido

\`\`\`json
POST /api/public/checkout/create-order/{productId}
{
  "metadata": {
    "internalDonationId": "uuid-v4",
    "donorName": "João Silva",
    "donorEmail": "joao@exemplo.com",
    "donorPhone": "11912345678",
    "source": "main"
  }
}
\`\`\`

### Etapa 2: Criar Pagamento

\`\`\`json
POST /api/public/checkout/payment/{orderId}
{
  "amount": 4990,
  "paymentMethod": "PIX",
  "postbackUrl": "https://v0-christmas-donation-landing-page-six.vercel.app/api/webhooks/payment",
  "customer": {
    "name": "João Silva",
    "email": "joao@exemplo.com",
    "phone": "11912345678"
  }
}
\`\`\`

## Resposta da API

\`\`\`json
{
  "id": "transaction-id",
  "status": "PENDING",
  "pix": {
    "qrCode": "base64-image",
    "copyAndPaste": "00020126580014br.gov.bcb.pix...",
    "payUrl": "https://..."
  }
}
\`\`\`

## Webhook de Confirmação

Quando o pagamento é confirmado, a UmbrellaPag envia:

\`\`\`json
{
  "transactionId": "transaction-id",
  "status": "PAID"
}
\`\`\`

O webhook atualiza o status internamente e o frontend redireciona automaticamente.

## Troubleshooting

### Erro "Configuração de produto não foi concluída"

1. Verifique se você criou um produto no dashboard da UmbrellaPag
2. Certifique-se que copiou o `uniqueProductLinkId` correto
3. Cole no `.env.local` como `LIBERPAY_PRODUCT_ID`
4. Reinicie o servidor Next.js

### Erro 404 "Cannot POST /api/public/checkout/create-order"

1. Verifique se o `LIBERPAY_PRODUCT_ID` está correto
2. Confirme que o produto existe no dashboard
3. Teste o endpoint manualmente com Postman

### Pagamento não confirma automaticamente

1. Verifique se o webhook está configurado corretamente
2. Teste manualmente: `GET /api/donations/status/[donationId]`
3. Confira os logs do servidor para erros no webhook

### QR Code não aparece

1. Verifique se `LIBERPAY_API_TOKEN` está correto
2. Confira os logs do console do navegador
3. Verifique se ambas as etapas (pedido + pagamento) funcionaram

## Produção

Quando for para produção:

1. Configure webhook com URL de produção: `https://doeparaonatal.online/api/webhooks/payment`
2. Substitua `NEXT_PUBLIC_BASE_URL` por `https://doeparaonatal.online` no `.env.local`
3. Adicione `doeparaonatal.online` nos domínios autorizados do dashboard da UmbrellaPag
4. Implemente armazenamento em banco de dados (substitua `lib/donation-store.ts`)
5. Configure monitoramento e alertas
6. Verifique se o produto está ativo no dashboard

## Suporte

- Documentação oficial: [docs.umbrellapag.com](https://docs.umbrellapag.com)
- Suporte técnico: suporte@umbrellapag.com
