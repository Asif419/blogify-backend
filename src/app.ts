import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors({ origin: ['http://localhost:5173'] }));
app.use(cookieParser());

// application routes
// app.use('/api/v1', router);

app.get('/api/v1/test', (req: Request, res: Response) => {
  console.log('Working');
  res.status(200).json({ message: 'POST request successful!' });
});

app.get('/', (req: Request, res: Response) => {});

export default app;
