# 📊 Dashboard de Analytics - Maior Demanda

## 🎯 Visão Geral

Dashboard web completo mostrando **onde teve maior demanda** no WhatsApp, com gráficos interativos e estatísticas em tempo real!

## 🚀 Como Acessar

### URL:
```
http://localhost:3000/analytics.html
```

Ou se estiver com ngrok:
```
https://sua-url.ngrok.io/analytics.html
```

### Abrir agora:
```bash
open http://localhost:3000/analytics.html
```

---

## 📊 O Que o Dashboard Mostra

### 1. 📈 Estatísticas Gerais (Cards no topo)

```
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│  💬              │  │  👥              │  │  📅              │
│  Total Mensagens│  │  Usuários Únicos│  │  Agendamentos   │
│     1,234       │  │       156       │  │       89        │
└─────────────────┘  └─────────────────┘  └─────────────────┘

┌─────────────────┐
│  🔥              │
│ Serviço +Usado  │
│  Agendamento    │
└─────────────────┘
```

### 2. 📋 Demanda por Serviço (Gráfico Pizza)

Mostra **qual opção do menu** os usuários mais clicam:

- 📋 Consulta de Conta
- 📄 Segunda Via
- 📅 Agendamento
- 📞 Fale Conosco
- 🚨 Emergências

**Exemplo:**
```
Agendamento: 45%  (mais demandado! 🔥)
Consulta: 25%
Segunda Via: 15%
Fale Conosco: 10%
Emergências: 5%
```

### 3. 📅 Agendamentos por Tipo (Gráfico de Barras)

Mostra **qual tipo de agendamento** é mais solicitado:

- 💧 Ligação de Água
- 🚽 Ligação de Esgoto
- 🔧 Manutenção
- 🔍 Vistoria

**Exemplo:**
```
Água: ████████████ 45
Manutenção: ████████ 30
Esgoto: █████ 20
Vistoria: ███ 10
```

### 4. ⏰ Horários de Pico (Gráfico de Linha)

Mostra **em qual hora** do dia tem mais demanda:

```
Mensagens por Hora
     │
 50  │         ╱╲
 40  │        ╱  ╲
 30  │    ╱╲╱    ╲
 20  │   ╱        ╲╱╲
 10  │  ╱            ╲
  0  │─────────────────────────
     0h 4h 8h 12h 16h 20h 24h
```

**Insight:** Pico às 14h (horário de almoço)

### 5. 📆 Demanda por Dia da Semana (Gráfico de Barras)

Mostra **qual dia** da semana tem mais demanda:

```
Segunda: ████████████ 120
Terça:   ██████████   100
Quarta:  ████████████ 115
Quinta:  ██████████   95
Sexta:   ████████     80
Sábado:  ██           15
Domingo: █            10
```

### 6. 📋 Tabela de Agendamentos Recentes

Lista dos últimos 10 agendamentos:

| Protocolo | Serviço | Cliente | Data | Status | Criado |
|-----------|---------|---------|------|--------|--------|
| SAAE123 | 💧 Água | João | 16/01 14h | ✅ Confirmado | 15/01 10:30 |
| SAAE124 | 🔧 Manutenção | Maria | 17/01 14h | ⏳ Pendente | 15/01 11:15 |

### 7. 🔥 Top 10 Serviços Mais Acessados

Ranking completo com barra de progresso:

| Pos | Serviço | Acessos | % |
|-----|---------|---------|---|
| 🥇 | Agendamento | 450 | ████████████ 45% |
| 🥈 | Consulta de Conta | 250 | ███████ 25% |
| 🥉 | Segunda Via | 150 | ████ 15% |

---

## 🎨 Filtros de Tempo

Clique nos botões no topo para filtrar:

- **Hoje** - Dados de hoje
- **7 Dias** - Última semana
- **30 Dias** - Último mês
- **Tudo** - Todos os dados históricos

---

## 🔄 Atualização Automática

O dashboard se atualiza automaticamente a cada **30 segundos**.

Ou clique em **🔄 Atualizar Dados** para atualizar manualmente.

---

## 📊 Métricas Importantes

### 🔥 Maior Demanda

O dashboard mostra claramente:

1. **Serviço mais procurado** (card no topo)
2. **Horário de pico** (gráfico de linha)
3. **Dia com mais demanda** (gráfico de barras)
4. **Tipo de agendamento mais solicitado** (gráfico de barras)

### 💡 Insights que Você Pode Obter

- Quais serviços precisam de mais atendentes
- Melhor horário para manutenção do sistema
- Dias com menor movimento para treinamento
- Quais serviços podem ser melhorados

---

## 🎯 Como Usar os Dados

### Exemplo de Análise:

```
📊 Dados de Hoje:
   Total de Mensagens: 234
   Usuários Únicos: 89
   Agendamentos: 45

🔥 Maior Demanda:
   Serviço: Agendamento (45%)
   Horário: 14h às 16h
   Dia: Segunda-feira

💡 Ação:
   → Adicionar mais atendentes às segundas 14-16h
   → Melhorar processo de agendamento
   → Considerar chat bot para consultas simples
```

---

## 🖥️ Interface do Dashboard

### Design Moderno:

- ✅ Cards coloridos com hover animado
- ✅ Gráficos interativos (Chart.js)
- ✅ Tabelas responsivas
- ✅ Auto-refresh
- ✅ Filtros de tempo
- ✅ Design responsivo (funciona no celular)

### Cores:

- 🟣 Roxo (#667eea) - Primária
- 🟣 Roxo Escuro (#764ba2) - Secundária
- 🟢 Verde - Sucesso
- 🟡 Amarelo - Aviso
- 🔴 Vermelho - Perigo

---

## 📱 Responsivo

O dashboard funciona perfeitamente em:

- ✅ Desktop
- ✅ Tablet
- ✅ Mobile

Você pode acessar do celular!

---

## 🔧 Personalização

### Alterar Cores

Edite `public/analytics.html`:

```javascript
const chartColors = {
    primary: '#667eea',    // ← Sua cor primária
    secondary: '#764ba2',  // ← Sua cor secundária
    // ...
};
```

### Adicionar Novos Gráficos

O dashboard usa Chart.js. Você pode adicionar:

- Gráfico de pizza
- Gráfico de linha
- Gráfico de barras empilhadas
- Gráfico de área
- E muito mais!

Documentação: https://www.chartjs.org/

---

## 🧪 Testar Agora

```bash
# Abrir dashboard
open http://localhost:3000/analytics.html

# Ver dados da API
curl http://localhost:3000/api/analytics?filter=all
```

---

## 📊 API de Analytics

### Endpoint:
```
GET /api/analytics?filter=today
```

### Filtros disponíveis:
- `today` - Dados de hoje
- `week` - Últimos 7 dias
- `month` - Últimos 30 dias
- `all` - Todos os dados

### Resposta:
```json
{
  "success": true,
  "filter": "today",
  "stats": {
    "totalMessages": 234,
    "uniqueUsers": 89,
    "totalAppointments": 45,
    "topService": "Agendamento"
  },
  "serviceData": {
    "labels": ["Agendamento", "Consulta", ...],
    "values": [105, 58, ...]
  },
  "hourlyData": { ... },
  "weekdayData": { ... },
  "recentAppointments": [ ... ],
  "topServices": [ ... ]
}
```

---

## 💾 Dados do Banco

O dashboard busca dados destas tabelas:

- **conversations** - Todas as mensagens
- **appointments** - Agendamentos
- **users** - Usuários únicos

---

## 🎯 Próximas Funcionalidades

- [ ] Exportar relatório em PDF
- [ ] Comparação entre períodos
- [ ] Alertas de demanda alta
- [ ] Previsão de demanda
- [ ] Mapa de calor (heatmap)
- [ ] Taxa de conversão
- [ ] Tempo médio de resposta

---

## 📸 Preview

```
┌──────────────────────────────────────────────┐
│  📊 Analytics do Bot WhatsApp                │
│  Estatísticas de Demanda e Uso               │
│                                              │
│  [Hoje] [7 Dias] [30 Dias] [Tudo]           │
│  [🔄 Atualizar Dados]                        │
├──────────────────────────────────────────────┤
│  💬           👥           📅          🔥    │
│  1,234        156          89    Agendamento│
│  Mensagens   Usuários  Agendamentos  Mais  │
│                                       Usado │
├──────────────────────────────────────────────┤
│  📋 Demanda por Serviço  │  📅 Agendamentos │
│  ┌──────────────────────┐│ ┌────────────────┤
│  │   Gráfico Pizza      ││ │ Gráfico Barras ││
│  │      (45%)           ││ │                ││
│  │  Agendamento         ││ │   Água: 45     ││
│  └──────────────────────┘│ └────────────────┤
├──────────────────────────────────────────────┤
│  ⏰ Horários de Pico     │  📆 Por Dia      │
│  ┌──────────────────────┐│ ┌────────────────┤
│  │   Gráfico Linha      ││ │ Gráfico Barras ││
│  │    Pico: 14h         ││ │ Segunda: 120   ││
│  └──────────────────────┘│ └────────────────┤
├──────────────────────────────────────────────┤
│  📋 Agendamentos Recentes                    │
│  ┌────────────────────────────────────────┐ │
│  │ Tabela com últimos 10 agendamentos     │ │
│  └────────────────────────────────────────┘ │
├──────────────────────────────────────────────┤
│  🔥 Top 10 Serviços Mais Acessados           │
│  ┌────────────────────────────────────────┐ │
│  │ 🥇 Agendamento  450  ██████████ 45%    │ │
│  │ 🥈 Consulta     250  █████ 25%         │ │
│  │ 🥉 Segunda Via  150  ███ 15%           │ │
│  └────────────────────────────────────────┘ │
└──────────────────────────────────────────────┘
```

---

## 🎉 Pronto para Usar!

Seu dashboard de analytics está implementado e funcionando!

**Acesse agora:**
```bash
open http://localhost:3000/analytics.html
```

**Ou teste a API:**
```bash
curl http://localhost:3000/api/analytics?filter=all
```

---

**Dados reais do seu bot WhatsApp com visualização profissional! 🚀**

