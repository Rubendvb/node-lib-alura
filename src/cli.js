#!/usr/bin/env node

import chalk from "chalk";
import fs from "fs";
import pegaArquivo from "../index.js";
import listaValidada from "./http-validacao.js";

const caminho = process.argv; //  retorna uma array de strings com a instalação do Node.js e o caminho do arquivo .js em execução nas duas primeiras posições.

async function imprimeLisa(valida, resultado, identificador = "") {
  if (valida) {
    console.log(
      chalk.yellow("Lista validada"),
      chalk.black.bgGreen(identificador),
      await listaValidada(resultado)
    );
  } else {
    console.log(
      chalk.yellow("Lista de links"),
      chalk.black.bgGreen(identificador),
      resultado
    );
  }
}

async function processaTexto(argumentos) {
  const caminho = argumentos[2];
  const valida = argumentos[3] === "--valida";

  try {
    fs.lstatSync(caminho);
  } catch (error) {
    if (error.code === "ENOENT") {
      console.log("Arquivo ou diretório não existe");
      return;
    }
  }

  if (fs.lstatSync(caminho).isFile()) {
    const resultado = await pegaArquivo(caminho);

    imprimeLisa(valida, resultado);
  } else if (fs.lstatSync(caminho).isDirectory()) {
    const arquivos = await fs.promises.readdir(caminho);
    arquivos.forEach(async (nomeArquivo) => {
      const lista = await pegaArquivo(`${caminho}/${nomeArquivo}`);
      imprimeLisa(valida, lista, nomeArquivo);
    });
  }
}

processaTexto(caminho);
