const fs = require('fs');
const fetch = require('node-fetch');
const path = require('path');

// Funcion encargada de obtener la ruta absoluta
const checkRute = (ruta) => {
  const rute = (path.isAbsolute(ruta) === true) ? ruta : path.resolve(ruta);
  // console.log(rute);
};
checkRute('./README.md');

// Funcion encargada de leer y obtener los links del readme
const readFile = () => {
  fs.readFile('README.md', 'utf-8', callback = (err, md) => {
    const readLink = err ? 'Tienes un error, verifica' : md.match(/(http:\/\/|https:\/\/|www\.)[^\s][^)]+/g);
    onlyLinks(readLink);
    runArray(readLink);
  });
};
readFile();

// Funcion encargada de mostrar los links como lineas de texto plano 
const onlyLinks = (readFile) => {
  readFile.forEach((element)=>{
    // console.log(elemment);
    element;
  });
};

// Funcion encargada de iterar el array y obtener las promesas
const runArray = (readFile) => {  
  readFile.forEach((element)=>{
    fetch(element).then((res) =>{
      linkObjet({
        href: res.url,
        status: res.status,
        text: res.statusText
      });
    });
  });
  // for (let i = 0; i <= results.length; i++) {
  //   fetch(results[i]).then((res) => {
  //     linkObjet({
  //       href: res.url,
  //       status: res.status,
  //       text: res.statusText
  //     });
  //   });
  // }
};

const linkObjet = (link) =>{
  // console.log(link.href, link.status, link.text);
};

module.exports = {
  readFile,
  runArray,
  onlyLinks,
  linkObjet
};