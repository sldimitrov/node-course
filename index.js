// const fs = require('fs');
// const http = require('http');
// const url = require('url');
//
// // Fill templates with data
// const replaceTemplate = (temp, product) => {
//   let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
//   output = output.replace(/{%IMAGE%}/g, product.image);
//   output = output.replace(/{%PRICE%}/g, product.price);
//   output = output.replace(/{%FROM%}/g, product.from);
//   output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
//   output = output.replace(/{%QUANTITY%}/g, product.quantity);
//   output = output.replace(/{%DESCRIPTION%}/g, product.description);
//   output = output.replace(/{%ID%}/g, product.id);
//
//   if (!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
//   return output;
// }
//
// // TEMPLATE DATA
// const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8')
// const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8')
// const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8')
//
// // READ FILES
// const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
// const dataObj = JSON.parse(data);
//
//
// // SERVER
// const server = http.createServer((req, res) => {
//   const pathName = req.url;
//
//   const { query, pathname} = url.parse(req.url, true);
//
//   if (pathName === '/' || pathName === '/overview') {
//     res.writeHead(200, {'Content-type': 'text/html'})
//
//     const cardsHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('')
//     const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml)
//     res.end(output);
//   } else if (pathname === '/product') {
//     const product = dataObj[query.id];
//     const output = replaceTemplate(tempProduct, product)
//     res.end(output)
//   } else if (pathName === '/api') {
//     res.writeHead(200, {
//       'Content-type': 'application/json',
//       'my-own-header': 'api-header'
//     })
//
//     res.end(data);
//   } else {
//     res.writeHead(404, {
//       'Content-type': 'text/html',
//       'my-own-header': 'hello-world'
//     });
//     res.end('<h1>Page not found</h1>');
//   }
// })
//
// server.listen(8000, '127.0.0.1', () => {
//   console.log('Listening to requests on port 8000')
// })


// Asynchronous JS: Promises and Async/Await
const fs = require('fs');
const superagent = require('superagent');

const readFilePromise = file => new Promise((resolve, reject) => {
  fs.readFile(file, 'utf-8', (err, data) => {
    if (err) reject('File not found!');
    resolve(data);
  });
});

const writeFilePromise = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, err => {
      if (err) reject('Could not write file!');
      resolve('success');
    });
  });
};

readFilePromise(`${__dirname}/dev-data/dog.txt`)
  .then(data => {
    console.log('Breed: ', data);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
  })
  .then(res => {
    console.log(res.body.message);
    return writeFilePromise(`${__dirname}/dev-data/dog-img.txt`, res.body.message);
  })
  .then(() => {
    console.log('Random dog image saved to file!');
  })
  .catch(err => {
    console.log(err.message);
  })
