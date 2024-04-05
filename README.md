# Instalacao modulo Dynamic

## Requisitos:
- nvm (node version manager)
- Node.js instalado

## Como configurar:

Primeiramente, rode o comando: `nvm use` em seu terminal,
o mesmo ira baixar a versao necessaria nesse projeto que se encontra dentro do arquivo `.nvmrc`.

Apos isso, rode o comando: `npm install` ou semelhante ao seu package manager.

Quando todas as dependencias tiverem instaladas, rode o comando: `npm run dev` e o ambiente de desenvolvimento ira subir na sua maquina na porta 3000.

## Como subir o ambiente de producao:

Primeiramente instale as dependencias, apos isso, rode o comando: `npm run build ; npm run start` e o ambiente de producao ira subir.
