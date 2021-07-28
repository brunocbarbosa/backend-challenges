import 'express-async-errors';
import express from 'express';

import { router } from './router';
import { errors } from './middlewares/errors'

const app = express();
app.use(express.json());
app.use(router)
app.use(errors)

app.listen(3000, () => console.log('Server is running!!'));