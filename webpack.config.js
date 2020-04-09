// const webpack = require("webpack");
const path = require("path");

const entry = [path.join(__dirname, 'src/js/resim.js')];

const output = {
   path: path.join(__dirname, 'dist/js'),
   filename: 'resim.min.js'
}

const _module = {
   rules : [
      {
         test : /\.js$/,
         exclude : /node_modules/,
         loader: 'babel-loader'
      }

   ]
}

module.exports = {
   entry,
   output,
   module:_module
}


// console.log(__dirname);
