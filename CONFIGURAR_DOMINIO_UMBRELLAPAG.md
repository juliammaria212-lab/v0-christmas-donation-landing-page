# Como Configurar o Domínio na UmbrellaPag

## Problema Atual

Você está recebendo o erro **"Hostname não identificado"** porque o domínio `doeparaonatal.online` ainda não está autorizado na sua conta UmbrellaPag.

## Solução: Adicionar Domínio Autorizado

### Passo 1: Acessar o Dashboard da UmbrellaPag

1. Faça login em: https://dashboard.umbrellapag.com
2. Use suas credenciais da Liberpay

### Passo 2: Adicionar o Domínio

1. No menu lateral, procure por **"Configurações"** ou **"Settings"**
2. Encontre a seção **"Domínios Autorizados"** ou **"Allowed Domains"**
3. Clique em **"Adicionar Domínio"** ou **"Add Domain"**
4. Insira: `doeparaonatal.online`
5. Também adicione (se tiver ambiente de staging): `*.doeparaonatal.online`
6. Se estiver testando localmente, adicione: `localhost` e `127.0.0.1`
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
- Você precisa adicionar TODOS os domínios onde o site estará hospedado
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
