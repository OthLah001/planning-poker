import * as express from 'express';
import * as helmet from 'helmet';
import * as cors from 'cors';
import * as morgan from 'morgan';


const app = express();

// Protect from some well-known web vulnerabilities by setting HTTP headers appropriately
app.use(helmet());

// To enable CORS with various options
app.use(cors());

// Parse incoming data
app.use(express.json());
app.use(express.urlencoded());

// Set logger console request
app.use(morgan('\n:url\n:method :status :total-time[3]'));

import { userRouter } from 'src/app/modules/user/user.routes';
app.use('/api/user', userRouter);

import { roomRouter } from 'src/app/modules/room/room.routes';
app.use('/api/room', roomRouter);


const port = process.env.port || 9999;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
