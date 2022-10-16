import chalk from "chalk";
import fs from "fs";

function trataErro(erro) {
  throw new Error(chalk.red(erro.code, "não há arquivos"));
}

function extraiLinks(texto) {
  // console.log(chalk.green(texto));

  const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
  // const capturas = regex.exec(texto); // Uma forma de fazer
  const capturas = [...texto.matchAll(regex)];
  const resultados = capturas.map((captura) => ({
    [captura[1]]: captura[2],
  }));

  return resultados.length !== 0
    ? resultados
    : chalk.red("Não há links no arquivo");
}

// async/await

async function pegaArquivo(caminhoDoArquivo) {
  try {
    const encoding = "utf-8";
    const texto = await fs.promises.readFile(caminhoDoArquivo, encoding);

    return extraiLinks(texto);
  } catch (erro) {
    trataErro(erro);
  }
}

export default pegaArquivo;

// Promises com then()

// function pegaArquivo(caminhoDoArquivo) {
//   const encoding = "utf-8";

//   fs.promises
//     .readFile(caminhoDoArquivo, encoding)
//     .then((texto) => console.log(texto))
//     .catch(trataErro);
// }

// function pegaArquivo(caminhoDoArquivo) {
//   const encoding = "utf-8";

//   fs.readFile(caminhoDoArquivo, encoding, (erro, texto) => {
//     if (erro) {
//       trataErro(erro);
//     }
//     console.log(chalk.green(texto));
//   });
// }
