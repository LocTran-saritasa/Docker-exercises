import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
import pg from 'pg';
const { Client } = pg;

const client = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
});

const connectToDB = async () => {
  try {
    client.connect().then(() => {
      console.log('Connected to db!')
    });
  } catch (err) {
    console.log(err);
  }
};

export { connectToDB, client }
