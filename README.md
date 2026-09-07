# ReciclaRota Mobile

O **ReciclaRota Mobile** é um aplicativo mobile desenvolvido para motoristas e coletores de veículos de coleta seletiva urbana. Ele funciona de forma integrada a um painel web municipal de monitoramento, permitindo que os operadores visualizem rotas otimizadas, registrem a coleta de resíduos recicláveis em tempo real e reportem problemas ou ocorrências nas vias urbanas [1].

O aplicativo adota uma abordagem **Offline-First**. Como a coleta ocorre em trânsito e muitas vezes em zonas com conectividade móvel instável ou inexistente, todo o roteamento e registro de coletas podem ser feitos de forma local [2, 3]. Os dados são salvos em uma fila de sincronização no dispositivo e enviados automaticamente ao servidor municipal assim que a conexão com a internet for restabelecida [3, 4].

---

## Sobre o app

O aplicativo é desenvolvido com React Native e Expo, utilizando TypeScript para tipagem estática e segurança do código [5]. A arquitetura de componentes visuais segue estritamente a metodologia do **Atomic Design** (separação modular em Átomos, Moléculas, Organismos e Templates) para promover o reaproveitamento máximo de código [6, 7].

### Funcionalidades Básicas (Checklist de Requisitos)
*   [ ] **Autenticação de Operadores:** Login integrado e persistente para identificar o motorista e o veículo associado [3].
*   [ ] **Visualização de Rotas do Dia:** Exibição detalhada dos pontos ecológicos de coleta ordenados para otimização do trajeto.
*   [ ] **Registro Offline de Coletas:** Cadastro local da quantidade e tipo de resíduo coletado (peso em kg por categoria: plástico, metal, papel, vidro) sem dependência de rede [3].
*   [ ] **Fila de Sincronização Assíncrona:** Gerenciamento de estado global com Zustand persistido no AsyncStorage para envio automático em segundo plano [4, 8].
*   [ ] **Registro de Ocorrências:** Envio de alertas rápidos sobre lixeiras depredadas, vias obstruídas ou ausência de material reciclável no ponto.

### Funcionalidades Adicionais (Trabalhos Futuros)
*   [ ] **Navegação GPS Ativa:** Integração com mapas locais (Google Maps/Apple Maps) para navegação dinâmica no trânsito.
*   [ ] **Agendamento Sob Demanda:** Recebimento de ordens de serviço geradas por moradores locais em tempo real.
*   [ ] **Métricas de Impacto Ambiental:** Painel de estatísticas mostrando os quilos totais coletados e o equivalente de CO2 poupado pelo veículo.

---

## Protótipos de tela

A interface foi projetada especificamente para uso em trânsito, focando em botões amplos, alto contraste e facilidade de leitura para os motoristas [9]. O fluxo de navegação completo foi prototipado no Figma.

*   **Link público para o Figma:** [Acesse o Protótipo do ReciclaRota Mobile](https://www.figma.com/file/exemplo-link-publico-do-seu-projeto)

> 💡 **Fluxo de Navegação:** O protótipo demonstra o percurso completo do operador desde a autenticação, seleção de rota, visualização do mapa interativo com pontos de coleta e fluxo de preenchimento offline do formulário de coletas.

### Mapa de Telas (Opcional)
Caso queira conferir a exportação estática de todas as telas unificadas em um fluxo:

![Mapa de Telas ReciclaRota](https://raw.githubusercontent.com/username/reciclarota-mobile/main/assets/readme_map_telas.png "Visualização de Fluxo das Telas do Aplicativo")

---

## Modelagem do banco

A persistência de dados do **ReciclaRota Mobile** é estruturada de forma híbrida para garantir operação ininterrupta (Offline-first) conectando-se assincronamente a uma API centralizada [2, 3].

### 1. Implementação Local (Dispositivo Móvel)
*   **Gerenciador de Estado:** **Zustand** com middleware `persist` [10].
*   **Armazenamento Físico:** `@react-native-async-storage/async-storage` para persistir as rotas e fila de sincronização [4, 8, 11].
*   **Estruturas Otimizadas:** Uso de Mapas e Conjuntos (Map/Set) no Zustand para acesso indexado rápido aos pontos de rota, utilizando serializadores customizados para salvamento JSON no armazenamento do celular [12-14].

*   **Schema JSON do Estado Local:**
```json
{
  "active_route_id": "route-2026-09-07",
  "pending_sync_queue": [
    {
      "collection_point_id": "ponto-abc-123",
      "status": "COMPLETED",
      "weight_kg": 27.5,
      "categories": ["Plásticos", "Metais"],
      "timestamp": "2026-09-07T13:00:00Z"
    }
  ]
}

2. Implementação Remota (Servidor Central)

    Backend: API REST desenvolvida em Laravel 10.
    Banco de Dados: Banco relacional PostgreSQL hospedado na nuvem municipal.
    Diagrama Entidade-Relacionamento (Parcial consumida pelo Mobile):

+-------------------+         1 : N         +-------------------+
|      VEICULO      | --------------------- |       ROTA        |
+-------------------+                       +-------------------+
| id (PK) - INT     |                       | id (PK) - INT     |
| placa - VARCHAR   |                       | data - DATE       |
| motorista -VARCHAR|                       | status - VARCHAR  |
+-------------------+                       | veiculo_id (FK)   |
                                            +-------------------+
                                                      | 1
+-------------------+                                 |
|   PONTO_COLETA    | 1                               |
+-------------------+ \                               |
| id (PK) - INT     |  \                              |
| nome - VARCHAR    |   \ N                           | N
| latitude - DOUBLE |    \ +-------------------------+
| longitude - DOUBLE|      |     REGISTRO_COLETA     |
+-------------------+      +-------------------------+
                           | id (PK) - INT           |
                           | status_visita - VARCHAR |
                           | peso_estimado_kg-FLOAT  |
                           | rota_id (FK)            |
                           | ponto_coleta_id (FK)    |
                           +-------------------------+

    Link público da modelagem: Acesse o Diagrama do Banco no Diagrams.net/Draw.io

Planejamento de sprints
O cronograma do projeto está organizado em 5 Sprints quinzenais ao longo de 10 semanas, definindo metas claras e realistas de desenvolvimento:
Cronograma de Desenvolvimento (Road-map)
Sprint
	
Duração Prevista
	
Funcionalidades / Entregas Focadas
Sprint 1
	
Semanas 1 e 2
	
Setup inicial do Expo + TypeScript; Criação da estrutura de diretórios do Atomic Design; Desenvolvimento dos primeiros Átomos (StatusBadge, Buttons).
Sprint 2
	
Semanas 3 e 4
	
Criação das telas de Login e Dashboard de rotas; Navegação tipada instalada; Estado global de autenticação com Zustand.
Sprint 3
	
Semanas 5 e 6
	
Integração com Mapas nativos; Criação do Card de Ponto de Coleta (Molécula); Persistência offline de dados de rota via AsyncStorage.
Sprint 4
	
Semanas 7 e 8
	
Criação do formulário de coleta; Implementação da fila de sincronização offline e verificação ativa de rede (NetInfo).
Sprint 5
	
Semanas 9 e 10
	
Conexão definitiva com a API Laravel remota; Testes completos em simuladores; Polimento de interface e geração de Build de produção (APK).
Metas por Checkpoints da Disciplina:

    Checkpoint 1 (Sprints 1 e 2): Estrutura e padrões visuais funcionais, componentes de interface bem segmentados com Atomic Design e navegação fluida de login.
    Checkpoint 2 (Sprints 3 e 4): Persistência offline-first em pleno funcionamento; capacidade de coletar e navegar sem conexão de dados ativa.
    Checkpoint 3 (Sprint 5): Sincronização final de dados com o backend centralizado e fechamento da build de produção do app móvel.