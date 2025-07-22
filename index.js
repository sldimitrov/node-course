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
// const fs = require('fs');
// const superagent = require('superagent');
//
// const readFilePromise = file => new Promise((resolve, reject) => {
//   fs.readFile(file, 'utf-8', (err, data) => {
//     if (err) reject('File not found!');
//     resolve(data);
//   });
// });
//
// const writeFilePromise = (file, data) => {
//   return new Promise((resolve, reject) => {
//     fs.writeFile(file, data, err => {
//       if (err) reject('Could not write file!');
//       resolve('success');
//     });
//   });
// };
//
// const getDogPic = async() => {
//   try {
//     const data = await readFilePromise(`${__dirname}/dev-data/dog.txt`);
//     console.log('Breed: ', data);
//
//     const res = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//     const res1 = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//     const res2 = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//
//     const all = await Promise.all([res, res1, res2])
//
//     const images = all.map(el => el.body.message)
//
//     console.log('images', images)
//
//     await writeFilePromise(`${__dirname}/dev-data/dog-img.txt`, images.join('\n'));
//     console.log('Random dog image saved to file!');
//   } catch (err) {
//     console.log(err.message);
//     throw err;
//   }
//
//   return 'Doc pic fetched successfully!';
// }
//
// (async() => {
//   try {
//     console.log('Getting dog pic...');
//     const x = await getDogPic();
//     console.log(x);
//     console.log('Done getting dog pic!');
//   } catch(err) {
//     console.log('ERROR')
//   }
// })()

// First Take On Binary Search
const targetValue = 4;
const sortedArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];

let startIndex = 0;
let endIndex = sortedArray.length;

for (let i = 0; i <= sortedArray.length; i++) {
  //
  let currentArray = sortedArray.slice(startIndex, endIndex);
  // console.log('currentArray', currentArray);

  let midIndex = Math.floor(currentArray.length / 2);

  const currentValue = currentArray[midIndex];
  // console.log(`Value ${currentValue}; Index ${midIndex}`);

  if (currentValue === targetValue) {
    // console.log(`Found Target Value - ${currentValue}; On Index - ${midIndex}`);
    break;
  } else if (currentValue < targetValue) {
    // console.log(`Current Value ${currentValue} is lower than ${targetValue}`);
    startIndex = midIndex;
  } else if (currentValue > targetValue) {
    // console.log(`Current Value ${currentValue} is higher than ${targetValue}`);
    endIndex = midIndex + 1;
  }
}
