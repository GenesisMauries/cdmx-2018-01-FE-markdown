const fs = require('fs');
const fetch = require('node-fetch');
const path = require('path');

// Funcion encargada de obtener la ruta absoluta
const checkRute = (ruta) => {
  const rute = (path.isAbsolute(ruta) === true) ? ruta : path.resolve(ruta);
  console.log(rute);
  return rute;
};

// Funcion encargada de leer y obtener los links del readme
const readFile = (path) => {
  fs.readFile(path, 'utf-8', err = (err, md) => {
    const readLink = err ? 'Tienes un error, verifica' : md.match(/(http:\/\/|https:\/\/|www\.)[^\s][^)]+/g);
    // console.log(readLink);
    onlyLinks(readLink);
    runArray(readLink);
    return readLink;
  });
};
readFile(checkRute('./README.md'));

// Funcion encargada de mostrar los links como lineas de texto plano 
const onlyLinks = (readFile) => {
  let onlyTxt = '';
  for (let x = 0; x < readFile.length; x++) {
    onlyTxt += readFile[x] + '\n';
  }
  // console.log(onlyTxt);
  return onlyTxt;
};

// Funcion encargada de iterar el array y obtener las promesas
const runArray = (results) => {  
  for (let i = 0; i <= results.length; i++) {
    fetch(results[i])      
      .catch(error=> error)
      .then((res) => {
        linkObjet({
          href: res.url,
          status: res.status,
          text: res.statusText
        });
      });
  }
};

const linkObjet = (link) =>{
  console.log(link.href, link.status, link.text);
};

module.exports = {
  readFile,
  runArray,
  onlyLinks,
  linkObjet
};
