/* eslint-disable no-console */
const fs = require('fs');
const stream = require('stream');
const net = require('net');
const json = require('JSONStream');
const { port } = require('../config');
const { zap, vivaReal } = require('../src/businessRules');

class CheckType extends stream.Transform {
  constructor(filter, opts) {
    super({ ...opts, objectMode: true });
    this.filter = filter;
  }

  // eslint-disable-next-line no-underscore-dangle
  _transform(obj, encoding, callback) {
    if (this.filter(obj)) this.push(obj);
    callback();
  }
}

const buildJsonPipes = () => {
  const parseStream = json.parse(true); // [true] if is array [{}, ... , {}]

  const jsonZap = json.stringify();
  const jsonVivaReal = json.stringify();

  jsonZap.pipe(fs.createWriteStream('./tcp/output/output-zap'));
  jsonVivaReal.pipe(fs.createWriteStream('./tcp/output/output-viva'));

  parseStream.pipe(new CheckType(zap.main)).pipe(jsonZap);
  parseStream.pipe(new CheckType(vivaReal.main)).pipe(jsonVivaReal);

  return parseStream;
};

const server = net.createServer((socket) => {
  console.log('Conectou! Recebendo...');
  const strm = buildJsonPipes();

  socket.pipe(strm).on('close', () => {
    console.log('Terminou de receber.');
    server.close();
  });
});

server.listen(port);
