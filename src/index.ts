import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import dbOptions from '@config/dbConfig';
import DatabaseHandler from '@services/DatabaseHandler';

dotenv.config();

const app: any = express();
const port: any = process.env.PORT || 9000;

const dbHandler: DatabaseHandler = new DatabaseHandler(dbOptions);

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.disable('x-powered-by');

app.get('/api/:id', (req: Request, res: Response) => {
  res.json({ message: `Getting id: ${req.params.id}` });
});

app.post('/api/create', (req: Request, res: Response) => {
  res.json({ message: 'Creating something' });
});

app.put('/api/update', (req: Request, res: Response) => {
  res.json({ message: 'Hi from update point' });
});

app.delete('/api/delete/:id', (req: Request, res: Response) => {
  res.json({ message: `Deleting id: ${req.params.id}` });
});

app.listen(port, () => console.log(`[server] App listerning on port ${port}`));
