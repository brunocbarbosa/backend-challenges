import { Router } from 'express';
import { UrlController } from './controllers/UrlController';

const router = Router();

const urlController = new UrlController();

router.post('/urlshortened', urlController.create);

export { router }