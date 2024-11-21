import colors from 'colors';
import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const {connection} = await mongoose.connect(process.env.DATABASE_URL, {});
    const url = `${connection.host}:${connection.port}`;
    console.log(colors.magenta.bold(`MongoDB conectado en ${url}`));
  } catch (error) {
    console.log(colors.red(error.message));
    process.exit(1);
  }
};
