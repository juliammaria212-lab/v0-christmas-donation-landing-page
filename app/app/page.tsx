"use client"

import DonationCard from "@/components/donation-card"
import SnowEffect from "@/components/snow-effect"

const donationOptions = [
  {
    label: "A ESPERANÇA MÍNIMA",
    title: "A Esperança Mínima",
    amount: "19,90",
    icon: "🧸",
    subtitle: "Ajuda na logística e garante a esperança de uma criança.",
    priceKey: "19.90",
    badge: null,
    microCopyPrefix: "🔥",
    featured: false,
    href: "https://app.umbrellapag.com/link/0f8ec114-5b13-4a46-9470-cdee896b5475",
  },
  {
    label: "O PRESENTE GARANTIDO",
    title: "O Presente Garantido",
    amount: "29,90",
    icon: "🎈",
    subtitle: "Garante um presente simples, mas completo.",
    priceKey: "29.90",
    badge: null,
    microCopyPrefix: "✨",
    featured: false,
    href: "https://app.umbrellapag.com/link/97911ebe-9cf7-4fda-b281-4c6f6fb039c4",
  },
  {
    label: "O PACOTE MÁGICO",
    title: "O Pacote Mágico",
    amount: "49,90",
    icon: "🎁",
    subtitle: "O presente completo: brinquedo + logística + entrega garantida.",
    priceKey: "49.90",
    badge: "⭐ MAIS ESCOLHIDO – 78% DOS DOADORES",
    microCopyPrefix: "💫",
    featured: true,
    href: "https://app.umbrellapag.com/link/6bb31378-da30-4316-96ec-9db525064282",
  },
  {
    label: "O DUPLO IMPACTO",
    title: "O Duplo Impacto",
    amount: "79,90",
    icon: "🎁🎁",
    subtitle: "Dois presentes completos para duas crianças.",
    priceKey: "79.90",
    badge: null,
    microCopyPrefix: "✨",
    featured: false,
    href: "https://app.umbrellapag.com/link/d4772782-7bde-40cb-99d5-ff28913e737a",
  },
  {
    label: "O PAPAI NOEL OURO",
    title: "O Papai Noel Ouro",
    amount: "97,00",
    icon: "👑",
    subtitle: "Dois presentes completos ou um presente especial de alto valor.",
    priceKey: "97.00",
    badge: "🏅 VIP",
    microCopyPrefix: "🏆",
    featured: false,
    href: "https://app.umbrellapag.com/link/a13b5097-e589-4292-9033-6fda5716defd",
  },
  {
    label: "O TRANSFORMADOR",
    title: "O Transformador",
    amount: "197,90",
    icon: "🏆",
    subtitle: "Garante o Natal completo de uma família – múltiplos presentes.",
    priceKey: "197.90",
    badge: "💎 ELITE",
    microCopyPrefix: "🔥",
    featured: false,
    href: "https://app.umbrellapag.com/link/807fce81-9fa1-4b84-9189-5ca3ccc23abc",
  },
]

export default function Home() {
  return (
    <>
      <SnowEffect />

      {/* SEÇÃO 1: HEADER FIXO COM TIMER */}
      <header className="fixed top-0 left-0 w-full z-[10000] bg-[#C41E3A] shadow-md header-timer-pulse">
        <div className="flex items-center justify-center py-2 md:py-2.5">
          <p className="text-white font-extrabold text-[13px] md:text-[15px] tracking-wide flex items-center gap-2">
            <span>⏰</span>
            <span className="hidden sm:inline">O NATAL DE 10.000 CRIANÇAS ACABA EM:</span>
            <span className="sm:hidden">O NATAL ACABA EM:</span>
            <span className="ml-2 tabular-nums">
              <span id="header-days">03</span>D :
              <span id="header-hours" className="ml-1">
                22
              </span>
              H :
              <span id="header-minutes" className="ml-1">
                15
              </span>
              M :
              <span id="header-seconds" className="ml-1">
                42
              </span>
              S
            </span>
          </p>
        </div>
      </header>

      {/* SEÇÃO 2: CONTADOR DE VISUALIZAÇÕES */}
      <div
        id="traffic-bar"
        className="fixed left-0 w-full z-[9998] bg-white border-t-2 border-[#DC2626] flex items-center justify-center h-9 md:h-10"
        style={{ top: "40px" }}
      >
        <p className="text-[12px] md:text-[14px] font-semibold text-[#DC2626] flex items-center gap-1">
          <span className="inline-block w-2 h-2 rounded-full bg-[#EF4444] animate-ping-slow"></span>
          <span>
            <span id="views-counter" className="font-extrabold text-[#C41E3A] tabular-nums">
              400
            </span>{" "}
            pessoas estão visualizando agora
          </span>
        </p>
      </div>

      {/* SEÇÃO 3: HEADLINE + SUBHEADLINE */}
      <section className="pt-24 md:pt-28 px-4 md:px-8 bg-[#F9FAFB]">
        <div className="max-w-3xl mx-auto text-center fade-in-scroll">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FEE2E2] border border-[#FCA5A5] mb-3">
            <span className="text-[13px] font-semibold text-[#B91C1C]">🚨 ALERTA CRÍTICO: NATAL EM RISCO</span>
          </div>

          <h1 className="text-[#C41E3A] text-3xl md:text-5xl font-extrabold uppercase leading-tight tracking-wide">
            O NATAL DE 10.000 CRIANÇAS ESTÁ EM RISCO!
          </h1>

          <h2 className="mt-3 text-[#FFD700] text-xl md:text-2xl font-semibold leading-snug">
            Ainda há tempo de mudar isso!
          </h2>

          <p className="mt-3 text-[#374151] text-[15px] md:text-[17px] leading-relaxed max-w-xl mx-auto">
            Cada doação garante um presente real entregue nas mãos de uma criança que hoje não tem nenhuma outra
            esperança de ganhar algo no Natal.
          </p>
        </div>
      </section>

      {/* SEÇÃO 4: CONTADOR DE ESCASSEZ */}
      <section className="px-4 md:px-8 bg-[#F9FAFB]">
        <div className="max-w-3xl mx-auto">
          <div className="mt-4 md:mt-6 text-center">
            <p className="text-[#C41E3A] font-bold text-[16px] md:text-[18px]">
              Faltam apenas{" "}
              <span
                id="gifts-remaining"
                className="mx-1 inline-block font-extrabold text-[18px] md:text-[20px] text-[#C41E3A] gifts-pulse tabular-nums"
              >
                3222
              </span>{" "}
              presentes para acabar a campanha deste ano!
            </p>
            <p className="mt-1 text-[13px] md:text-[14px] text-[#6B7280]">
              Quando esse número chegar a zero, não será mais possível garantir entrega antes do Natal.
            </p>
          </div>
        </div>
      </section>

      {/* SEÇÃO 5: VSL (VÍDEO YOUTUBE) */}
      <section className="mt-6 md:mt-8 px-4 md:px-8 bg-[#F9FAFB] pb-8">
        <div className="max-w-2xl mx-auto rounded-2xl overflow-hidden shadow-2xl bg-[#111827] relative aspect-video fade-in-scroll">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/ZJzmdhhZuLw?si=4yGEn8VyZIa-uNBU"
            title="Operação Papai Noel - VSL"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
          ></iframe>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-3 flex items-center justify-between">
            <p className="text-white text-[13px] md:text-[14px] font-medium">
              ▶ Assista em menos de 3 minutos e veja como salvar o Natal de uma criança.
            </p>
          </div>
        </div>
      </section>

      {/* SEÇÃO 6: HISTÓRIA DA MARIA */}
      <section className="px-4 md:px-8 py-8 bg-[#F9FAFB]">
        <div className="max-w-3xl mx-auto fade-in-scroll">
          <h3 className="text-center text-[#C41E3A] text-[20px] md:text-[24px] font-extrabold mb-4">
            A História da Maria – 7 anos
          </h3>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6 bg-white border-l-4 md:border-l-4 border-[#C41E3A] rounded-2xl shadow-lg px-4 py-4 md:px-6 md:py-6">
            <img
              src="https://i.imgur.com/WodO6Jd.jpg"
              alt="Maria segurando um presente de Natal"
              className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover shadow-xl border-2 border-[#F59E0B]"
              loading="lazy"
            />
            <div className="text-left">
              <p className="text-[#374151] text-[15px] md:text-[17px] leading-relaxed mb-2">
                <strong className="text-[#C41E3A] font-bold">
                  Maria tem 7 anos. Ela sonha em ganhar uma boneca simples neste Natal.
                </strong>{" "}
                Mas há meses a mãe dela está desempregada. As contas de luz e aluguel estão atrasadas. O que deveria ser
                o dinheiro do presente simplesmente não existe.
              </p>
              <p className="text-[#374151] text-[15px] md:text-[17px] leading-relaxed mb-2">
                Enquanto outras crianças falam dos brinquedos que vão ganhar, Maria já aprendeu a dizer que "tá tudo
                bem" quando perguntam o que ela vai ganhar. Ela finge que não se importa. Mas, por dentro, ela só queria
                ser lembrada.
              </p>
              <p className="text-[#111827] text-[15px] md:text-[16px] leading-relaxed font-semibold">
                A Operação Papai Noel existe justamente para isso:{" "}
                <span className="text-[#C41E3A] font-bold">
                  colocar um presente real nas mãos de crianças como a Maria
                </span>
                . Com uma doação de <span className="text-[#F59E0B] font-bold">R$ 49,90</span>, você pode ser o Papai
                Noel dela este ano.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 7: BARRA DE PROGRESSO + AUTORIDADE */}
      <section className="px-4 md:px-8 pt-4 pb-8 bg-[#F9FAFB]">
        <div className="max-w-3xl mx-auto text-center fade-in-scroll">
          <p className="text-[#C41E3A] font-bold text-[16px] md:text-[18px] mb-3 flex items-center justify-center gap-2">
            <span>⚡</span>
            <span>67% das crianças ainda estão sem presente garantido.</span>
          </p>
          <div className="w-full max-w-xl mx-auto bg-[#E5E7EB] rounded-full h-7 overflow-hidden relative">
            <div
              id="progress-fill"
              className="h-full w-0 bg-gradient-to-r from-[#C41E3A] via-[#DC2626] to-[#F59E0B] rounded-full shadow-[0_0_15px_rgba(220,38,38,0.7)]"
            ></div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto mt-5 fade-in-scroll">
          <blockquote className="relative bg-[#F3F4F6] border-l-4 border-[#F59E0B] rounded-xl px-5 py-4 text-left">
            <span className="absolute -top-3 left-4 text-4xl text-[#E5E7EB] select-none">"</span>
            <p className="text-[#374151] text-[15px] md:text-[17px] italic leading-relaxed pl-3">
              Mais de 2 milhões de crianças vivem em famílias abaixo da linha da pobreza no Brasil.
            </p>
            <footer className="mt-2 pl-3 text-[13px] md:text-[14px] font-semibold text-[#C41E3A]">— IBGE 2024</footer>
          </blockquote>
        </div>
      </section>

      {/* SEÇÃO 8: GALERIA DE PROVAS VISUAIS */}
      <section className="px-4 md:px-8 py-8 bg-white">
        <div className="max-w-5xl mx-auto fade-in-scroll">
          <div className="text-center mb-5">
            <h3 className="text-[#C41E3A] text-[20px] md:text-[24px] font-extrabold">
              Sorrisos Reais, Presentes Reais
            </h3>
            <p className="mt-2 text-[#374151] text-[14px] md:text-[15px] max-w-xl mx-auto">
              Todas as fotos abaixo são de entregas reais de presentes feitas pela operação nos últimos anos. É esse
              tipo de Natal que a sua doação ajuda a criar.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {[
              "https://i.imgur.com/GHGNXeM.jpg",
              "https://i.imgur.com/SOhTypL.jpg",
              "https://i.imgur.com/W09KNcR.jpg",
              "https://i.imgur.com/PwXMrPY.jpg",
              "https://i.imgur.com/2MQdKyT.jpg",
              "https://i.imgur.com/iYil9AO.jpg",
              "https://i.imgur.com/1vQwDGk.jpg",
              "https://i.imgur.com/lakONPc.jpg",
              "https://i.imgur.com/M4xZMZX.jpg",
              "https://i.imgur.com/vpHpXh4.jpg",
              "https://i.imgur.com/mza3Sbj.jpg",
              "https://i.imgur.com/WodO6Jd.jpg",
            ].map((src, index) => (
              <figure
                key={index}
                className="relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 bg-[#F3F4F6]"
              >
                <img
                  src={src || "/placeholder.svg"}
                  alt="Crianças recebendo presentes de Natal"
                  className="w-full h-full object-cover transform hover:scale-[1.03] transition-transform duration-300 opacity-95 hover:opacity-100"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = "/crian-a-feliz-natal.jpg"
                  }}
                />
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO 9: GRADE DE 6 CARDS DE DOAÇÃO */}
      <section id="doacao" className="px-4 md:px-8 py-10 bg-[#F9FAFB]">
        <div className="max-w-5xl mx-auto fade-in-scroll">
          <div className="text-center mb-6">
            <h3 className="text-[#C41E3A] text-[20px] md:text-[26px] font-extrabold uppercase tracking-wide">
              Escolha o nível do seu impacto
            </h3>
            <p className="mt-2 text-[#374151] text-[14px] md:text-[16px] max-w-2xl mx-auto">
              Cada valor abaixo representa Natais reais transformados. Selecione o que mais combina com o tamanho do seu
              gesto e conclua em poucos segundos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {donationOptions.map((opt) => (
              <DonationCard
                key={opt.priceKey}
                label={opt.label}
                title={opt.title}
                amount={opt.amount}
                icon={opt.icon}
                subtitle={opt.subtitle}
                copyId={`count-${opt.priceKey.replace(".", "").replace(",", "")}`}
                badge={opt.badge}
                featured={opt.featured}
                microCopyPrefix={opt.microCopyPrefix}
                href={opt.href}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO 10: VALOR PERSONALIZADO */}
      <section className="px-4 md:px-8 pb-10 bg-[#F9FAFB]">
        <div className="max-w-lg mx-auto mt-6 fade-in-scroll">
          <div className="bg-[#F9FAFB] border-2 border-dashed border-[#F59E0B] rounded-xl px-4 py-5 md:px-6 md:py-6">
            <h4 className="text-[#C41E3A] text-[18px] md:text-[20px] font-extrabold flex items-center gap-2 mb-1">
              💡 Quer doar um valor diferente?
            </h4>
            <p className="text-[#374151] text-[14px] md:text-[15px]">
              No momento, os valores disponíveis estão logo acima. Escolha um dos valores de doação.
            </p>
          </div>
        </div>
      </section>

      {/* SEÇÃO 12: PROVA SOCIAL AVANÇADA */}
      <section className="px-4 md:px-8 py-8 bg-white">
        <div className="max-w-4xl mx-auto text-center fade-in-scroll">
          <p className="text-[#6B7280] text-[13px] md:text-[14px] mb-1">Impacto em tempo real</p>
          <p className="text-[#C41E3A] text-[34px] md:text-[42px] font-extrabold tracking-tight">
            <span id="children-counter" className="tabular-nums">
              1.452
            </span>{" "}
            crianças já ajudadas
          </p>
          <p className="mt-2 text-[#374151] text-[14px] md:text-[15px]">
            Cada número aqui representa um presente real entregue nas mãos de uma criança.
          </p>
        </div>
      </section>

      {/* Nova seção de storytelling PROBLEMA → VILÃO → HERÓI */}
      <section className="px-4 md:px-8 py-10 bg-[#F9FAFB]">
        <div className="max-w-5xl mx-auto fade-in-scroll">
          {/* Subtítulo de contexto */}
          <p className="text-center text-[#6B7280] text-[13px] md:text-[14px] font-medium mb-2">
            Entenda por que a Operação Papai Noel existe e por que a sua ajuda é tão urgente.
          </p>

          {/* Título principal PROBLEMA + VILÃO + HERÓI */}
          <h2 className="text-center text-[#C41E3A] text-[22px] md:text-[30px] font-extrabold leading-tight mb-8">
            O problema é real, o vilão é a indiferença. O herói pode ser você.
          </h2>

          {/* Blocos PROBLEMA/VILÃO e HERÓI lado a lado em desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8">
            {/* Bloco PROBLEMA + VILÃO */}
            <div className="space-y-4">
              <p className="text-[#374151] text-[15px] md:text-[17px] leading-relaxed">
                <strong className="text-[#C41E3A] font-bold">O PROBLEMA É REAL:</strong> Milhares de crianças
                brasileiras não terão presente algum neste Natal, não por falta de amor dos pais, mas porque o dinheiro
                simplesmente não existe. A conta de luz vencida, o aluguel atrasado, o arroz que falta na mesa — tudo
                isso torna o presente uma impossibilidade, não uma escolha.
              </p>
              <p className="text-[#374151] text-[15px] md:text-[17px] leading-relaxed">
                <strong className="text-[#C41E3A] font-bold">O VILÃO NÃO SÃO AS PESSOAS:</strong> O verdadeiro vilão é a
                indiferença. É deixar para depois. É fingir que o problema não existe. É a falta de organização que
                transforma boas intenções em nada. Enquanto nos ocupamos com nossas rotinas, milhares de crianças estão
                aprendendo que o Natal não é para elas.
              </p>
            </div>

            {/* Bloco HERÓI */}
            <div className="bg-white border-l-4 border-[#F59E0B] rounded-xl px-5 py-5 md:px-6 md:py-6 shadow-lg space-y-3">
              <h4 className="text-[#C41E3A] text-[16px] md:text-[18px] font-bold mb-2">
                Quem é o herói desta história?
              </h4>
              <p className="text-[#374151] text-[15px] md:text-[16px] leading-relaxed">
                <strong className="text-[#F59E0B]">Você.</strong> A Operação Papai Noel não é uma organização que se
                coloca como salvadora. Somos apenas o mecanismo que conecta você — o verdadeiro herói — à criança certa,
                garantindo que seu gesto se transforme em presente real e entrega real.
              </p>
              <p className="text-[#374151] text-[15px] md:text-[16px] leading-relaxed">
                Ao doar,{" "}
                <strong className="text-[#F59E0B] font-semibold">você se torna o Papai Noel daquela criança</strong>.
                Você entra para a elite de pessoas que não ignoram a dor dos outros. Você escolhe agir quando seria mais
                fácil apenas seguir em frente.
              </p>
            </div>
          </div>

          {/* Mini-bloco "Sobre o projeto" - 3 bullets */}
          <div className="bg-white rounded-xl px-5 py-5 md:px-6 md:py-6 shadow-md mb-6">
            <div className="max-w-3xl mx-auto space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-[20px] md:text-[22px] flex-shrink-0">✔</span>
                <p className="text-[#374151] text-[14px] md:text-[15px] leading-relaxed">
                  <strong className="font-semibold">Mais de 5 anos</strong> organizando Natais para crianças em situação
                  de vulnerabilidade em todo o Brasil.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[20px] md:text-[22px] flex-shrink-0">🎁</span>
                <p className="text-[#374151] text-[14px] md:text-[15px] leading-relaxed">
                  Presentes reais comprados e entregues por uma equipe dedicada e parceiros locais confiáveis.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[20px] md:text-[22px] flex-shrink-0">📊</span>
                <p className="text-[#374151] text-[14px] md:text-[15px] leading-relaxed">
                  Prestação de contas e transparência total para doadores — você recebe atualizações sobre a entrega.
                </p>
              </div>
            </div>
          </div>

          {/* Faixa de LOGOS DE MÍDIA - Apenas texto estilizado */}
          <div className="bg-white border-t border-[#E5E7EB] rounded-xl px-4 py-4 md:py-5 mb-6">
            <p className="text-center text-[#6B7280] text-[13px] md:text-[14px] font-medium mb-4">
              Destaque em grandes veículos de comunicação
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
              {/* GloboNews - vermelho escuro com fundo branco */}
              <span className="px-3 py-1.5 rounded-md bg-white border border-[#E5E7EB] text-[#C8102E] text-sm md:text-base font-extrabold tracking-tight shadow-sm">
                GloboNews
              </span>

              {/* G1 - vermelho característico */}
              <span className="px-3 py-1.5 rounded-md border border-[#E5E7EB] text-[#C4170C] text-xl md:text-2xl font-black tracking-tighter">
                G1
              </span>

              {/* Veja - azul escuro, maiúsculas */}
              <span className="px-3 py-1.5 rounded-md border border-[#E5E7EB] text-[#003366] text-sm md:text-base font-extrabold tracking-wide uppercase">
                Veja
              </span>

              {/* R7 - azul */}
              <span className="px-3 py-1.5 rounded-md border border-[#E5E7EB] text-[#0071CE] text-xl md:text-2xl font-bold tracking-tight">
                R7
              </span>
            </div>
          </div>

          {/* Depoimentos com FOTOS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {/* Depoimento 1 */}
            <div className="bg-white border border-[#E5E7EB] rounded-xl px-4 py-4 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-3 mb-3">
                <img
                  src="/images/depoimentos/depoimento-1.jpg"
                  alt="Ana Paula - Foto de pessoa real dando depoimento"
                  className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover border-2 border-[#F59E0B] flex-shrink-0 bg-[#F3F4F6]"
                  loading="lazy"
                />
                <div>
                  <p className="text-[#111827] text-[14px] md:text-[15px] font-semibold">Ana Paula</p>
                  <p className="text-[#6B7280] text-[12px] md:text-[13px]">Recife, PE</p>
                </div>
              </div>
              <p className="text-[#374151] text-[14px] md:text-[15px] leading-relaxed">
                "Foi a primeira vez que meu filho ganhou um presente no Natal. Nunca vou esquecer esse gesto."
              </p>
            </div>

            {/* Depoimento 2 */}
            <div className="bg-white border border-[#E5E7EB] rounded-xl px-4 py-4 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-3 mb-3">
                <img
                  src="/images/depoimentos/depoimento-2.jpg"
                  alt="João Carlos - Foto de pessoa real dando depoimento"
                  className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover border-2 border-[#F59E0B] flex-shrink-0 bg-[#F3F4F6]"
                  loading="lazy"
                />
                <div>
                  <p className="text-[#111827] text-[14px] md:text-[15px] font-semibold">João Carlos</p>
                  <p className="text-[#6B7280] text-[12px] md:text-[13px]">Curitiba, PR</p>
                </div>
              </div>
              <p className="text-[#374151] text-[14px] md:text-[15px] leading-relaxed">
                "Doei achando que seria só mais uma campanha. Recebi fotos e vídeos da entrega. Chorei."
              </p>
            </div>

            {/* Depoimento 3 */}
            <div className="bg-white border border-[#E5E7EB] rounded-xl px-4 py-4 shadow-md hover:shadow-lg transition-shadow md:col-span-2 lg:col-span-1">
              <div className="flex items-start gap-3 mb-3">
                <img
                  src="/images/depoimentos/depoimento-3.jpg"
                  alt="Maria Silva - Foto de pessoa real dando depoimento"
                  className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover border-2 border-[#F59E0B] flex-shrink-0 bg-[#F3F4F6]"
                  loading="lazy"
                />
                <div>
                  <p className="text-[#111827] text-[14px] md:text-[15px] font-semibold">Maria Silva</p>
                  <p className="text-[#6B7280] text-[12px] md:text-[13px]">Salvador, BA</p>
                </div>
              </div>
              <p className="text-[#374151] text-[14px] md:text-[15px] leading-relaxed">
                "Minha filha ganhou uma boneca linda. Ela dormiu abraçada com ela por semanas. Obrigada!"
              </p>
            </div>
          </div>

          {/* CTA de reforço */}
          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                const target = document.getElementById("doacao")
                if (target) target.scrollIntoView({ behavior: "smooth", block: "start" })
              }}
              className="inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 rounded-xl bg-gradient-to-r from-[#C41E3A] to-[#F59E0B] text-white font-bold text-[15px] md:text-[16px] tracking-wide shadow-lg hover:shadow-xl transition-all duration-300 btn-cta btn-pulse cta-slide-in"
            >
              QUERO FAZER PARTE DESSA TRANSFORMAÇÃO
            </button>
          </div>
        </div>
      </section>

      {/* SEÇÃO 13: FAQ */}
      <div className="mt-10 bg-[#F9FAFB]">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-10">
          <h2 className="text-[#C41E3A] text-2xl md:text-3xl font-extrabold mb-4 text-center">Perguntas Frequentes</h2>
          <div className="space-y-4">
            <div className="bg-white rounded-xl px-5 py-5 md:px-6 md:py-6 shadow-md">
              <h3 className="text-[#111827] text-[16px] md:text-[18px] font-bold mb-2">Como funciona a doação?</h3>
              <p className="text-[#374151] text-[14px] md:text-[15px] leading-relaxed">
                Ao escolher um dos valores acima, você será redirecionado para uma página de pagamento segura onde
                poderá completar sua doação.
              </p>
            </div>
            <div className="bg-white rounded-xl px-5 py-5 md:px-6 md:py-6 shadow-md">
              <h3 className="text-[#111827] text-[16px] md:text-[18px] font-bold mb-2">Quem recebe os presentes?</h3>
              <p className="text-[#374151] text-[14px] md:text-[15px] leading-relaxed">
                As crianças que mais precisam são selecionadas por nossa equipe de parceiros locais. Cada presente é
                entregue com cuidado e transparência.
              </p>
            </div>
            <div className="bg-white rounded-xl px-5 py-5 md:px-6 md:py-6 shadow-md">
              <h3 className="text-[#111827] text-[16px] md:text-[18px] font-bold mb-2">Meus dados estão seguros?</h3>
              <p className="text-[#374151] text-[14px] md:text-[15px] leading-relaxed">
                Sim, todos os dados são protegidos e utilizados exclusivamente para processar sua doação.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SEÇÃO 14: EXIT-INTENT POPUP */}
      <div
        id="exit-popup"
        className="fixed inset-0 z-[20001] flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm hidden"
      >
        <div className="relative w-full max-w-md bg-white rounded-2xl px-5 py-6 md:px-6 md:py-7 shadow-2xl">
          <button
            type="button"
            id="exit-close"
            className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-[#F3F4F6] text-[#4B5563] text-xl hover:bg-[#E5E7EB] transition-colors"
            aria-label="Fechar"
          >
            ×
          </button>
          <h3 className="text-[#C41E3A] text-[18px] md:text-[20px] font-extrabold mb-2 text-center">
            Espere um pouquinho! 🎄
          </h3>
          <p className="text-[#374151] text-[14px] md:text-[15px] text-center mb-4">
            Você está saindo antes de garantir o Natal de uma criança. Que tal pensar em doar apenas uma vez este ano?
          </p>
          <button
            type="button"
            id="exit-go-donate"
            className="w-full h-[46px] rounded-xl bg-gradient-to-r from-[#C41E3A] to-[#F59E0B] text-white font-bold text-[14px] md:text-[15px] shadow-md hover:shadow-xl hover:scale-[1.01] transition-all duration-300 btn-cta btn-pulse cta-slide-in"
          >
            QUERO DOAR AGORA
          </button>
        </div>
      </div>

      {/* Nova seção de segurança */}
      <section className="bg-[#0F172A] py-6 md:py-8">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <div className="text-center mb-4">
            <h4 className="text-[#E5E7EB] text-[14px] md:text-[15px] font-semibold mb-1">
              Pagamentos 100% Seguros e Regulamentados
            </h4>
            <p className="text-[#9CA3AF] text-[12px] md:text-[13px]">
              Utilizamos o sistema de pagamentos instantâneos Pix, regulamentado pelo Banco Central do Brasil
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            {/* SSL Secure Connection */}
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1E293B] border border-[#334155]">
              <div className="text-2xl">🔒</div>
              <div className="text-left">
                <p className="text-[#E5E7EB] text-[12px] md:text-[13px] font-semibold">Conexão Segura</p>
                <p className="text-[#9CA3AF] text-[10px] md:text-[11px]">Certificado SSL</p>
              </div>
            </div>

            {/* Pix System */}
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1E293B] border border-[#334155]">
              <div className="w-8 h-8 rounded-full bg-[#32BCAD] flex items-center justify-center">
                <span className="text-white text-[14px] font-bold">Pix</span>
              </div>
              <div className="text-left">
                <p className="text-[#E5E7EB] text-[12px] md:text-[13px] font-semibold">Pagamento via Pix</p>
                <p className="text-[#9CA3AF] text-[10px] md:text-[11px]">Sistema instantâneo do Brasil</p>
              </div>
            </div>

            {/* Banco Central Regulated */}
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1E293B] border border-[#334155]">
              <div className="text-2xl">🏛️</div>
              <div className="text-left">
                <p className="text-[#E5E7EB] text-[12px] md:text-[13px] font-semibold">Regulamentado</p>
                <p className="text-[#9CA3AF] text-[10px] md:text-[11px]">Banco Central do Brasil</p>
              </div>
            </div>

            {/* Data Protection */}
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1E293B] border border-[#334155]">
              <div className="text-2xl">✅</div>
              <div className="text-left">
                <p className="text-[#E5E7EB] text-[12px] md:text-[13px] font-semibold">Dados Protegidos</p>
                <p className="text-[#9CA3AF] text-[10px] md:text-[11px]">Privacidade garantida</p>
              </div>
            </div>
          </div>

          <p className="text-center text-[#6B7280] text-[11px] md:text-[12px] mt-4 max-w-2xl mx-auto leading-relaxed">
            Todas as transações são realizadas através de instituições financeiras reguladas pelo Banco Central do
            Brasil. Seus dados pessoais são protegidos e utilizados exclusivamente para processar sua doação.
          </p>
        </div>
      </section>

      {/* SEÇÃO 15: FOOTER */}
      <footer className="mt-10 bg-[#111827] text-[#E5E7EB]">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-10">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 md:gap-10">
            <div className="max-w-md">
              <h4 className="text-[18px] md:text-[20px] font-extrabold text-white mb-2">Operação Papai Noel</h4>
              <p className="text-[13px] md:text-[14px] text-[#9CA3AF] leading-relaxed">
                Iniciativa independente focada em garantir presentes reais para crianças em situação de vulnerabilidade
                no Natal. Cada doação é convertida em presentes físicos entregues com cuidado e transparência.
              </p>
            </div>

            <div className="flex flex-col md:items-end gap-3">
              <div className="flex flex-wrap items-center gap-3 text-[13px]">
                <a href="#termos" className="text-[#F59E0B] hover:underline">
                  Termos de Uso
                </a>
                <span className="text-[#4B5563]">|</span>
                <a href="#privacidade" className="text-[#F59E0B] hover:underline">
                  Política de Privacidade
                </a>
              </div>
              <div className="mt-2 text-[12px] text-[#9CA3AF] text-left md:text-right">
                Operação Papai Noel © {new Date().getFullYear()} – Iniciativa Roda de Brinquedo
                <br />
                CNPJ: 12.345.678/0001-90
              </div>
              <div className="mt-3 flex flex-wrap items-center justify-start md:justify-end gap-2">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#1F2937] text-[11px] text-[#E5E7EB]">
                  🔒 SSL Seguro
                </span>
                <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#1F2937] text-[11px] text-[#E5E7EB]">
                  🧾 Doações Protegidas
                </span>
                <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#1F2937] text-[11px] text-[#E5E7EB]">
                  ✅ Transparência
                </span>
              </div>
              <div className="mt-3 flex items-center justify-start md:justify-end gap-3">
                <a
                  href="#instagram"
                  aria-label="Instagram"
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-[#1F2937] text-[#9CA3AF] hover:text-[#F59E0B] transition-colors"
                >
                  ⓘ
                </a>
                <a
                  href="#whatsapp"
                  aria-label="WhatsApp"
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-[#1F2937] text-[#9CA3AF] hover:text-[#25D366] transition-colors"
                >
                  💬
                </a>
              </div>
            </div>
          </div>

          <div className="mt-6 border-t border-[#1F2937] pt-3 flex flex-col md:flex-row items-center justify-between gap-2">
            <p className="text-[11px] text-[#6B7280]">
              Este site usa cookies apenas para melhorar a experiência e analisar acessos de forma agregada.
            </p>
            <p className="text-[11px] text-[#6B7280]">Dúvidas? Fale com a equipe pelo WhatsApp.</p>
          </div>
        </div>
      </footer>

      {/* STICKY CTA */}
      <button
        id="sticky-cta"
        onClick={() => {
          const target = document.getElementById("doacao")
          if (target) target.scrollIntoView({ behavior: "smooth", block: "start" })
        }}
        className="fixed bottom-4 right-4 md:right-6 md:bottom-6 z-[9997] bg-gradient-to-r from-[#C41E3A] to-[#F59E0B] text-white font-bold text-[13px] md:text-[14px] px-5 md:px-6 h-[44px] md:h-[48px] rounded-full shadow-lg flex items-center gap-2 opacity-0 translate-y-8 transition-all duration-300 btn-cta btn-pulse"
      >
        DOAR AGORA 🎁
      </button>

      {/* Social Proof Popups Container - SINGLE unified system for all screens */}
      <div
        id="social-proof-popups"
        className="fixed bottom-20 left-4 z-[16000] w-[90%] max-w-[320px] md:max-w-[360px] pointer-events-none"
      ></div>
    </>
  )
}
