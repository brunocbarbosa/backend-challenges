import { Router } from 'express';
import { UrlController } from './controllers/UrlController';

const router = Router();

const urlController = new UrlController();

router.post('/urlshortened', urlController.create);
router.get('/urlshortened', urlController.getAll);
router.put('/urlshortened/:id', urlController.renewShortUrl);
router.get('/urlshortened/:shorteredUrl', urlController.redirectAnotherPage);

export { router }