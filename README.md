# ✨ Gupy Enhancer

**Gupy Enhancer** é uma extensão de navegador que **eleva sua experiência na plataforma Gupy**, revelando informações ocultas, aprimorando etapas da aplicação e exibindo dados detalhados das vagas, tudo para oferecer uma visão mais completa e transparente dos seus processos seletivos.


## Recursos Principais

- **Exibe etapas ocultas** do processo seletivo.  
- **Mostra detalhes adicionais** sobre cada etapa e sobre a vaga.  
- **Aprimora a visualização** das páginas da Gupy para análise detalhada.  
- **Controle fácil** via popup:
  - **Habilitar Extensão:** ativa ou desativa as melhorias.
  - **Melhorar página de aplicação:** exibe informações avançadas e etapas extras.


## Instalação (Modo Desenvolvedor)

#### Navegadores baseados no Chromium (Chrome, Edge, Brave, Vivaldi...)

#### Opção 1 - Arquivo zipado

1. Baixe a última versão da extensão zipada: [Baixar última release](https://github.com/kayckmatias/gupy-enhancer-extension/releases/latest)
2. Acesse no seu navegador: ```chrome://extensions/``` *(Mesmo utilizando outro navegador baseado em Chromium, este link funciona e redireciona corretamente.)*
3. Ative o **Modo do desenvolvedor** (no canto superior direito, o local/nome pode variar entre navegadores).  
3. **Arraste o arquivo zipado para a página** e a instalação será realizada automaticamente.
4. A extensão **Gupy Enhancer** aparecerá na sua lista, **habilite-a e eleve sua experiência na Gupy!**

#### Opção 2 - Pasta descompactada

1. Baixe a última versão da extensão zipada e extraia: [Baixar última release](https://github.com/kayckmatias/gupy-enhancer-extension/releases/latest)
2. Acesse no seu navegador: ```chrome://extensions/``` *(Mesmo utilizando outro navegador baseado em Chromium, este link funciona e redireciona corretamente.)*
3. Ative o **Modo do desenvolvedor** (no canto superior direito, o local/nome pode variar entre navegadores).  
4. Clique em **Carregar sem compactação**.
5. Selecione a pasta do projeto (`Gupy-Enhancer-x.x.x`).  
6. A extensão **Gupy Enhancer** aparecerá na sua lista, **habilite-a e eleve sua experiência na Gupy!**


## Como Utilizar

1. Acesse uma de suas candidaturas no site da [Gupy](https://portal.gupy.io/my/applications).  
2. Clique no ícone da extensão na barra do navegador e certifique-se de que ela está **ativa**.  
3. Recarregue a página da sua candidatura na Gupy e veja as melhorias em ação!

## Estrutura do Projeto
```bash
gupy-enhancer-extension/
├── manifest.json
├── public/
│   ├── icons/           # Ícones da extensão
│   └── img/             # Imagens em diferentes resoluções da extensão
└── src/
    ├── assets/          # Recursos estáticos
    ├── contentScript/
    │   ├── handlers/    # Manipuladores das páginas da Gupy
    │   └── inject/
    │       └── application/  # Scripts injetados nas páginas de aplicação
    ├── popup/           # Interface do popup da extensão
    ├── types/
    │   ├── intercept/   # Tipagens relacionadas à interceptação de dados
    │   │   └── responses/
    │   └── messages/    # Tipos de mensagens trocadas entre scripts
    └── utils/           # Funções auxiliares
```

## TODO List

- [ ] Adicionar detalhes de resultados de testes nas páginas de aplicação

- [ ] Adicionar botão para ver detalhes de candidaturas mesmo que finalizadas

## Contribuindo

Contribuições são muito bem-vindas!
Abra uma **issue** ou envie um **pull request** com melhorias, correções ou novas ideias! :)

## Licença

Este projeto está licenciado sob a [MIT License](https://github.com/KayckMatias/gupy-enhancer-extension/blob/main/LICENSE).