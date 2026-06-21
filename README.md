# Trabalho de Conclusão — Integração Contínua para Automação de Testes

Pós-graduação em Automação de Testes de Software (PGATS)

## Sobre o projeto

Este repositório reaproveita o exercício `ServicoDePagamento`, desenvolvido originalmente na disciplina de Programação para Automação de Testes, e o utiliza como base para aplicar os conceitos estudados na disciplina de Integração Contínua.

O objetivo foi configurar uma pipeline de CI no GitHub Actions que execute os testes automatizados da aplicação de três formas diferentes (por push, manualmente e de forma agendada), gerando e publicando um relatório de testes a cada execução.

## A classe ServicoDePagamento

A classe simula um serviço de pagamentos simples. Ela mantém uma lista interna de pagamentos e oferece dois métodos:

- **`pagar(codigoBarras, empresa, valor)`**: registra um novo pagamento. Quando o valor é maior que 100.00, o pagamento recebe a categoria `'cara'`; caso contrário, recebe a categoria `'padrão'`.
- **`consultarUltimoPagamento()`**: retorna o último pagamento registrado.

Exemplo de uso:

```javascript
const servicoDePagamento = new ServicoDePagamento();
servicoDePagamento.pagar('0987-7656-3475', 'Samar', 156.87);
console.log(servicoDePagamento.consultarUltimoPagamento());

// {
//   codigoBarras: '0987-7656-3475',
//   empresa: 'Samar',
//   valor: 156.87,
//   categoria: 'cara'
// }
```

## Estrutura do repositório

```
.
├── .github/
│   └── workflows/
│       └── pipeline.yaml          # Pipeline de Integração Contínua
├── src/
│   └── trabalhoConclusao.js       # Classe ServicoDePagamento
├── test/
│   └── trabalhoConclusao.test.js  # Testes automatizados
├── .gitignore
├── package.json
└── README.md
```

## Tecnologias e ferramentas utilizadas

- **Node.js** — ambiente de execução do JavaScript
- **JavaScript (ES Modules)** — `"type": "module"` configurado no `package.json`
- **Mocha** — framework de testes
- **Node Assert** — biblioteca nativa do Node.js usada nas asserções
- **Mochawesome** — geração de relatórios de testes em HTML
- **Git e GitHub** — versionamento de código
- **GitHub Actions** — automação da pipeline de CI

## Como rodar o projeto localmente

Instalar as dependências:

```bash
npm install
```

Rodar os testes (saída padrão do Mocha no terminal):

```bash
npm test
```

Rodar os testes gerando o relatório com Mochawesome:

```bash
npm run test:report
```

Esse último comando cria a pasta `mochawesome-report`, contendo o arquivo `mochawesome.html` com o relatório visual dos testes.

## Testes automatizados

Os testes cobrem os seguintes cenários:

- O pagamento é corretamente adicionado à lista de pagamentos, com código de barras, empresa e valor armazenados;
- O método `consultarUltimoPagamento` retorna sempre o pagamento mais recente, mesmo havendo vários pagamentos registrados;
- A categoria é definida como `'cara'` quando o valor do pagamento é maior que 100.00;
- A categoria é definida como `'padrão'` quando o valor do pagamento é menor ou igual a 100.00.

## Pipeline de Integração Contínua

O arquivo de configuração da pipeline está em `.github/workflows/pipeline.yaml`.

### Gatilhos de execução

A pipeline foi configurada para rodar de três formas, conforme exigido pelo trabalho:

| Gatilho | Configuração | O que faz |
|---|---|---|
| Push | `push: branches: [main]` | Executa automaticamente sempre que há um push na branch `main` |
| Manual | `workflow_dispatch` | Permite disparar a pipeline manualmente pela aba **Actions** do GitHub, clicando em **Run workflow** |
| Agendado | `schedule: cron: '12 0 * * *'` | Executa automaticamente todos os dias às 00h12 (UTC), equivalente às 21h12 no horário de Brasília |

### Etapas da pipeline

1. **Checkout do código** — `actions/checkout@v4` clona o repositório dentro da máquina virtual do GitHub Actions;
2. **Configuração do Node.js** — `actions/setup-node@v4` instala a versão 24.x do Node;
3. **Instalação das dependências** — `npm ci`, que instala as dependências seguindo exatamente as versões definidas no `package-lock.json`, garantindo consistência entre execuções;
4. **Execução dos testes com geração de relatório** — `npm run test:report`, que roda o Mocha com o reporter do Mochawesome;
5. **Publicação do relatório** — `actions/upload-artifact@v4` salva a pasta `mochawesome-report` como artefato da execução, disponível para download na própria pipeline.

A etapa de publicação do relatório usa `if: ${{ always() }}`, garantindo que o relatório seja salvo mesmo que algum teste falhe — assim é sempre possível consultar o resultado da execução.

## Como visualizar o relatório de testes

1. Acessar a aba **Actions** do repositório no GitHub;
2. Selecionar a execução desejada da **Pipeline Trabalho Final**;
3. Na seção **Artifacts**, baixar o arquivo `relatorio-de-testes`;
4. Extrair o `.zip` baixado e abrir o arquivo `mochawesome.html` em um navegador.

## Como executar a pipeline manualmente

1. Acessar a aba **Actions** do repositório;
2. Selecionar a pipeline **Pipeline Trabalho Final** na lista à esquerda;
3. Clicar no botão **Run workflow**;
4. Confirmar clicando novamente em **Run workflow**.

## Conceitos de Integração Contínua aplicados

- **Integração Contínua (CI)**: o código é testado automaticamente a cada alteração enviada ao repositório, permitindo identificar problemas rapidamente;
- **Pipeline**: sequência automatizada de etapas (checkout, instalação, testes, publicação de relatório) que roda a cada execução;
- **Gatilhos (triggers)**: diferentes eventos podem disparar a pipeline — push, execução manual e agendamento;
- **Artefatos**: arquivos gerados durante a execução da pipeline (no caso, o relatório de testes) ficam armazenados e disponíveis para download;
- **Consistência de ambiente**: o uso de `npm ci` junto ao `package-lock.json` garante que a pipeline sempre instale as mesmas versões de dependência usadas localmente;
- **Versionamento de código**: uso de Git e GitHub para controle de alterações, histórico e colaboração.

## Evidência de execução

A pipeline foi executada com sucesso através do gatilho de push, com o job `tests` concluído e o relatório de testes (`relatorio-de-testes`) publicado como artefato da execução.

## Autor

Beatriz Campos
Disciplina: Integração Contínua para Automação de Testes — PGATS
