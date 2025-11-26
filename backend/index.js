import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';   
import { createTable } from './model/createTable.js';
import { connectDb } from './db.js';
import route from './routes/todo.js';
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Todo API');
});
app.use('/todos', route);

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT} 🚀`);
  await connectDb();
  await createTable();
});