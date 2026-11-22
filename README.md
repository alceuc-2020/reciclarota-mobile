# ReciclaRota Mobile
O  **ReciclaRota Mobile**  é um aplicativo mobile desenvolvido para motoristas e coletores de veículos de coleta seletiva urbana. Ele funciona de forma integrada a um painel web municipal de monitoramento, permitindo que os operadores visualizem rotas otimizadas, registrem a coleta de resíduos recicláveis em tempo real e reportem problemas ou ocorrências nas vias urbanas.
O aplicativo adota uma abordagem  **Offline-First** . Como a coleta ocorre em trânsito e muitas vezes em zonas com conectividade móvel instável ou inexistente, todo o roteamento e registro de coletas podem ser feitos de forma local. Os dados são salvos em uma fila de sincronização no dispositivo e enviados automaticamente ao servidor municipal assim que a conexão com a internet for restabelecida.

--------------------------------------------------------------------------------

## Sobre o App
O aplicativo é desenvolvido com React Native e Expo, utilizando TypeScript para tipagem estática e segurança do código. A arquitetura de componentes visuais segue estritamente a metodologia do  **Atomic Design**  (separação modular em Átomos, Moléculas, Organismos e Templates) para promover o reaproveitamento máximo de código.
### Funcionalidades Básicas (Checklist de Requisitos)
*  [x]  **Autenticação de Operadores:**  Login com validação de códigos autorizados (`MOT-01`, `MOT-02`, `REC-102`), exibição de alertas para entradas inválidas e isolamento dos dados salvos por conta no dispositivo.
*  [x]  **Visualização de Rotas do Dia:**  Exibição detalhada dos pontos ecológicos de coleta ordenados para otimização do trajeto, com botão **"Novo Dia"** para reiniciar a rota apenas do motorista logado.  *(Implementado com `routes.tsx`, `PointCard` e `StatusBadge`!)*
*  [x]  **Registro Offline de Coletas:**  Cadastro local do peso coletado em kg (com seletor incremental, atalhos rápidos e validação de peso maior que zero) sem dependência de rede, salvando o status `COMPLETED` no estado isolado da conta.
*  [/]  **Fila de Sincronização Assíncrona:**  Gerenciamento de estado global com Zustand persistido no AsyncStorage para envio automático em segundo plano.  *(Fila local `pendingSyncQueue` por motorista e persistência física com AsyncStorage já totalmente configuradas!)*
*  [ ]  **Registro de Ocorrências:**  Envio de alertas rápidos sobre lixeiras depredadas, vias obstruídas ou ausência de material reciclável no ponto.
### Funcionalidades Adicionais (Trabalhos Futuros)
*  [ ]  **Navegação GPS Ativa:**  Integração com mapas locais (Google Maps/Apple Maps) para navegação dinâmica no trânsito.
*  [ ]  **Agendamento Sob Demanda:**  Recebimento de ordens de serviço geradas por moradores locais em tempo real.
*  [ ]  **Métricas de Impacto Ambiental:**  Painel de estatísticas mostrando os quilos totais coletados e o equivalente de CO2 poupado pelo veículo.

--------------------------------------------------------------------------------

## Protótipos de Tela
A interface foi projetada especificamente para uso em trânsito, focando em botões amplos, alto contraste e facilidade de leitura para os motoristas. O fluxo de navegação completo foi prototipado no Figma.
*   **Link público para o Figma:**  [Acesse o Protótipo do ReciclaRota Mobile no Figma](https://www.figma.com/file/COLE_AQUI_SEU_LINK_PUBLICO_DO_FIGMA)
💡  **Fluxo de Navegação:**  O protótipo demonstra o percurso completo do operador desde a autenticação, seleção de rota, visualização do mapa interativo com pontos de coleta e fluxo de preenchimento offline do formulário de coletas.
### Mapa de Telas
Caso queira conferir a exportação estática de todas as telas unificadas em um fluxo:

--------------------------------------------------------------------------------

## Modelagem do Banco de Dados
A persistência de dados do  **ReciclaRota Mobile**  é estruturada de forma híbrida para garantir operação ininterrupta (Offline-first) conectando-se assincronamente a uma API centralizada.
### 1. Implementação Local (Dispositivo Móvel)
*   **Gerenciador de Estado:**   **Zustand**  com middleware `persist`.
*   **Armazenamento Físico:**  `@react-native-async-storage/async-storage` para persistir as rotas e fila de sincronização.
*   **Isolamento por Conta:**  O estado global (`useRouteStore.ts`) mantém o mapa `accountsData` indexado pelo código do motorista (`currentDriverCode`), garantindo que `MOT-01`, `MOT-02` e `REC-102` tenham suas próprias rotas (`activeRoute`) e filas de sincronização (`pendingSyncQueue`) independentes.
#### Schema JSON do Estado Local Implementado:
```json
{
  "state": {
    "currentDriverCode": "MOT-01",
    "accountsData": {
      "MOT-01": {
        "activeRoute": {
          "points": [
            {
              "id": "1",
              "name": "Ecoponto Rápido - Praça Central",
              "status": "COMPLETED",
              "weightKg": 45
            },
            {
              "id": "2",
              "name": "Condomínio Residencial Green",
              "status": "PENDING",
              "weightKg": 0
            }
          ]
        },
        "pendingSyncQueue": [
          {
            "id": "1",
            "name": "Ecoponto Rápido - Praça Central",
            "status": "COMPLETED",
            "weightKg": 45
          }
        ]
      }
    }
  },
  "version": 0
}
```
### 2. Implementação Remota (Servidor Central)
*   **Backend:**  API REST desenvolvida em Laravel 10.
*   **Banco de Dados:**  Banco relacional PostgreSQL hospedado na nuvem municipal.
#### Diagrama Entidade-Relacionamento (Parcial consumida pelo Mobile):
```text
+-------------------+         1 : N         +-------------------+
|      VEICULO      | --------------------- |       ROTA        |
+-------------------+                       +-------------------+
| id (PK) - INT     |                       | id (PK) - INT     |
| placa - VARCHAR   |                       | data - DATE       |
| motorista -VARCHAR|                       | status - VARCHAR  |
+-------------------+                       +-------------------+
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

```
*   **Link público da modelagem:**  [Acesse o Diagrama do Banco no Diagrams.net/Draw.io](https://app.diagrams.net/#Gexemplo-link-diagrama)

--------------------------------------------------------------------------------

## Planejamento de Sprints

O cronograma do projeto está organizado em 5 Sprints quinzenais ao longo de 10 semanas, definindo metas claras e realistas de desenvolvimento. Abaixo estão marcadas as entregas executadas, as novas tarefas incorporadas durante o projeto e as justificativas para os itens não implementados nesta versão final.

### Cronograma de Desenvolvimento (Road-map)
| Sprint | Duração Prevista | Funcionalidades / Entregas Focadas | Status |
| ------ | ------ | ------ | ------ |
| **Sprint 1** | Semanas 1 e 2 | Setup inicial do Expo + TypeScript; Criação da estrutura de diretórios do Atomic Design; Desenvolvimento dos primeiros Átomos (StatusBadge, Buttons). | **100% Concluído** ✅ |
| **Sprint 2** | Semanas 3 e 4 | Criação das telas de Login (`index.tsx`), Dashboard de rotas (`routes.tsx`) e Coleta (`collection.tsx`); Navegação tipada instalada; Estado global com Zustand. | **100% Concluído** ✅ |
| **Sprint 3** | Semanas 5 e 6 | Criação do Card de Ponto de Coleta (`PointCard` - Molécula); Persistência offline de dados de rota via `AsyncStorage`; Integração com Mapas nativos *(ajustada)*. | **Concluído com ajustes** ⚠️ |
| **Sprint 4** | Semanas 7 e 8 | Criação do formulário/registro de coleta; Implementação da fila de sincronização offline (`pendingSyncQueue`); Verificação ativa de rede (`NetInfo`) *(não implementada)*. | **Parcialmente concluído** ⚠️ |
| **Sprint 5** | Semanas 9 e 10 | Geração de Build de produção (`.apk`) via EAS e publicação de Release no GitHub; Conexão definitiva com a API Laravel remota *(não implementada)*. | **Concluído com ajustes** ⚠️ |

### Detalhamento das Tarefas

#### Tarefas Executadas
* [x] **Sprint 1:** Setup inicial do Expo + TypeScript; criação da estrutura de diretórios do Atomic Design em `src/components/`; desenvolvimento do Átomo `StatusBadge`.
* [x] **Sprint 2:** Configuração do Expo Router (`src/app/_layout.tsx`), criação das 3 telas principais (`index.tsx`, `routes.tsx`, `collection.tsx`) e estado global com Zustand.
* [x] **Sprint 3:** Criação da Molécula `PointCard` combinando `StatusBadge` com informações do ecoponto e ação de toque (`onPress`), além da persistência local via `AsyncStorage`.
* [x] **Sprint 4:** Registro local de coleta com atualização de status (`PENDING` / `COMPLETED`), validação de peso (`> 0 kg`) e armazenamento na fila de sincronização offline (`pendingSyncQueue`).
* [x] **Sprint 5:** Configuração do perfil `apk` no `eas.json`, geração do arquivo instalável Android (`.apk`) via EAS e publicação da Release final no GitHub com o `.apk` anexado.

#### Novas Tarefas Adicionadas Durante o Projeto
* [x] **Padronização de layout com Expo Router (`_layout.tsx`):** Configuração centralizada de cabeçalho (`headerStyle`, `headerTintColor`, `title`) para todas as telas da pilha de navegação.
* [x] **Validação de acesso por código de motorista (`index.tsx`):** Bloqueio de login para campos vazios ou códigos não autorizados (`MOT-01`, `MOT-02`, `REC-102`), com alertas compatíveis com Web (`window.alert`) e Mobile (`Alert.alert`).
* [x] **Isolamento de dados por conta (`useRouteStore.ts`):** Persistência segmentada por motorista em `accountsData` no `AsyncStorage`, garantindo que as coletas de uma conta não alterem as demais.
* [x] **Botão "Novo Dia" para reset de expediente (`routes.tsx`):** Funcionalidade com diálogo de confirmação para apagar apenas as coletas anteriores da conta logada e restaurar os pontos para `PENDING` (`weightKg: 0`).
* [x] **Isolamento de dados simulados (`src/mocks/routesData.ts`):** Organização dos mocks de rotas e pontos de coleta para popular a interface de forma limpa e desacoplada.
* [x] **Tipagem estrita com TypeScript:** Criação das interfaces `Point`, `StatusBadgeProps` e `PointCardProps` para garantir segurança e contrato claro entre componentes.
* [x] **Fluxo de trabalho Git com Pull Requests:** Organização do desenvolvimento em branches separadas com abertura de PRs e merges controlados na branch `main`.

#### Tarefas Não Implementadas e Justificativas
* [ ] **Integração com Mapas nativos (Sprint 3):** *Justificativa:* Priorizou-se a listagem objetiva dos pontos de coleta com `PointCard` e `StatusBadge`, garantindo leitura rápida ao operador em trânsito e mantendo o mapa interativo como evolução futura.
* [ ] **Verificação ativa de rede com `NetInfo` (Sprint 4):** *Justificativa:* Como a integração com o servidor remoto não foi realizada nesta entrega, o monitoramento automático de conectividade via `NetInfo` não foi acoplado, mantendo o app operando integralmente em modo *Offline-First* local.
* [ ] **Conexão definitiva com a API Laravel remota (Sprint 5):** *Justificativa:* O escopo desta versão concentrou-se na consolidação da interface mobile, navegação, persistência local com Zustand + AsyncStorage (utilizando `src/mocks/routesData.ts`) e distribuição do aplicativo compilado em `.apk`.

### Metas por Checkpoints da Disciplina
* **Checkpoint 1 (Sprints 1 e 2):** Estrutura e padrões visuais funcionais, componentes de interface bem segmentados com Atomic Design e navegação fluida de login. ✅
* **Checkpoint 2 (Sprints 3 e 4):** Persistência offline-first em pleno funcionamento; capacidade de coletar e navegar sem conexão de dados ativa. ✅
* **Checkpoint 3 (Sprint 5):** Atualização final do `README.md`, geração do `.apk` via EAS, publicação da Release no GitHub, organização de PRs na `main` e vídeo de defesa da implementação. ✅

--------------------------------------------------------------------------------

## Distribuição e Instalação (APK)
* **Build Android via EAS:** Configurado o perfil `apk` no arquivo `eas.json` (`"buildType": "apk"`) e versionamento no `app.json` (`version` e `versionCode`), permitindo que o aplicativo rode diretamente em dispositivos Android sem depender do Expo Go.
* **Release no GitHub:** O arquivo `.apk` final está publicado na aba **Releases** do repositório para download e instalação direta.

--------------------------------------------------------------------------------

## Atualizações desde o último checkpoint
### 🎥 Demonstração em Vídeo
* **Vídeo de Defesa da Implementação (até 7 min):** `INSIRA_AQUI_O_LINK_DO_SEU_VIDEO_FINAL` *(Hospedado no YouTube, Google Drive ou Vimeo com acesso público / não listado, sem exigir login).* 
* **Vídeo anterior (Navegação de até 1 min):**
*  [Assista ao vídeo de demonstração navegando por todas as telas do aplicativo](https://youtu.be/stNuHHzunqM)
### 🛠️ Recursos dos Módulos Anteriores Aplicados
*   **Expo Router:**  Configuração de roteamento baseado em arquivos dentro da pasta src/app/, utilizando o arquivo _layout.tsx para definir e padronizar o cabeçalho (headerStyle, headerTintColor, title) das 3 telas (index.tsx, routes.tsx, collection.tsx).
*   **Estilização com StyleSheet:**  Estilização responsiva das 3 telas principais do aplicativo.
*   **Gerenciamento de Estado com Zustand e AsyncStorage:**  Estado global e persistência no armazenamento físico local do dispositivo para controle das rotas ativas e da fila de sincronização offline (pendingSyncQueue).
*   **TypeScript:**  Tipagem estática rigorosa para os modelos de dados e interfaces de propriedades (Point, StatusBadgeProps, PointCardProps).
### 🧩 Conceitos de Boas Práticas para Criação de Componentes Reutilizáveis
*   **Atomic Design:**  Organização modular dos componentes personalizados na pasta src/components/:
    *   **Átomo (StatusBadge):**  Componente focado na exibição visual do status da coleta (PENDING ou COMPLETED).
    *   **Molécula (PointCard):**  Componente reutilizável que combina o StatusBadge com informações do ecoponto e ação de toque (onPress).
*   **Responsabilidade Única e Desacoplamento:**  Cada componente lida estritamente com sua apresentação, recebendo dados via props sem acoplamento direto com fontes de dados externas.
*   **Mocks Organizados:**  Isolamento dos dados simulados em src/mocks/routesData.ts para popular a interface de forma limpa.
