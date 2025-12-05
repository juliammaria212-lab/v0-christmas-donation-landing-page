# Como Configurar o Domínio na UmbrellaPag

## Problema Atual

Você está recebendo o erro **"Hostname não identificado"** porque o domínio `v0-christmas-donation-landing-page-six.vercel.app` ainda não está autorizado na sua conta UmbrellaPag.

## Solução: Adicionar Domínio Autorizado

### Passo 1: Acessar o Dashboard da UmbrellaPag

1. Faça login em: https://dashboard.umbrellapag.com
2. Use suas credenciais da Liberpay

### Passo 2: Adicionar o Domínio

1. No menu lateral, procure por **"Configurações"** ou **"Settings"**
2. Encontre a seção **"Domínios Autorizados"** ou **"Allowed Domains"**
3. Clique em **"Adicionar Domínio"** ou **"Add Domain"**
4. Insira: `v0-christmas-donation-landing-page-six.vercel.app`
5. Se estiver testando localmente, adicione: `localhost` e `127.0.0.1`
6. **Para produção futura**: quando migrar, adicione também `doeparaonatal.online` e `*.doeparaonatal.online`
7. Salve as alterações

### Passo 3: Aguardar Propagação

- A autorização pode levar de **alguns minutos a 15 minutos** para propagar
- Após adicionar, aguarde uns 5-10 minutos antes de testar novamente

### Passo 4: Testar

1. Limpe o cache do navegador (Ctrl+Shift+Delete)
2. Tente fazer uma doação novamente
3. O erro "Hostname não identificado" não deve mais aparecer

## Observações Importantes

- **Sem esse domínio autorizado, NENHUMA requisição funcionará**
- Você está usando o domínio de teste da Vercel: `v0-christmas-donation-landing-page-six.vercel.app`
- Quando migrar para produção (`doeparaonatal.online`), adicione esse domínio também
- Para subdomínios, use o formato: `*.seudominio.com`
- Ambientes de desenvolvimento (localhost) também precisam ser adicionados se você for testar localmente

## Em Caso de Dúvidas

Entre em contato com o suporte da UmbrellaPag/Liberpay:
- Email: suporte@umbrellapag.com
- WhatsApp: [número do suporte]
- Dashboard: https://dashboard.umbrellapag.com

## Próximos Passos

Após configurar o domínio:
1. ✅ Domínio autorizado no dashboard
2. ✅ Product ID configurado no `.env.local`
3. ✅ Webhook configurado (se aplicável)
4. 🎉 Sistema pronto para processar pagamentos!
