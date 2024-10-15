import express from 'express';

const server = express();

server.get('/', (req, res) => {
  res.send('Hola mundo');
});

export default server;
