/* eslint-disable no-console */
const fs = require('fs');
const net = require('net');
const { host, port } = require('../config');

const pathFile = './src/mock/source-3';

const socket = new net.Socket();
socket.connect(port, host, () => {
  console.log('Conectou! Enviando...');
  fs.createReadStream(pathFile).pipe(socket).on('end', () => {
    console.log('Terminou de enviar.');
  });
});
