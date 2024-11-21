import colors from 'colors';
import { config } from 'dotenv';
import server from './server';

config();

const port = process.env.PORT || 4000;

server.listen(port, () => {
  console.log(colors.cyan.bold(`Servidor escuchando en el puerto ${port}`));
});
