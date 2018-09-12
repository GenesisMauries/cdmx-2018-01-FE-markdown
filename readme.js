const fs = require('fs');
const fetch = require('node-fetch');
const path = require('path');

// Funcion encargada de obtener la ruta absoluta
const checkRute = (ruta) =>{
  const rute = (path.isAbsolute(ruta) === true) ? ruta : path.resolve(ruta);
  console.log(rute);
};
checkRute('./README.md');

// Funcion encargada de leer y obtener los links del readme
const readFile = () => {
  fs.readFile('README.md', 'utf-8', callback = (err, md) => {
    if (err) {
      console.log('Tienes un error, verifica');
    } else {
      // const data = md;
      const regExp = /(http:\/\/|https:\/\/|www\.)[^\s][^)]+/g;
      const results = md.match(regExp);
      runArray(results);
      onlyLinks(results);
      // console.log(results);
      // console.log(onlyLinks(results));
    }
  });
};
readFile();

// Funcion encargada de mostrar los links como lineas de texto plano 
const onlyLinks = (results) => {
  let onlyTxt = '';
  for (let x = 0; x < results.length; x++) {
    onlyTxt += results[x] + '\n';
  }
  // console.log(onlyTxt);
  return onlyTxt;
};

// Funcion encargada de iterar el array y obtener las promesas
const runArray = (results) => {  
  for (let i = 0; i <= results.length; i++) {
    fetch(results[i]).then((res) => {
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
