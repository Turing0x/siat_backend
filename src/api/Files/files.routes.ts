import { Router } from 'express';

import { FilesControllers } from './infraestructure/files.controllers';

const router = Router();

router

  .get('/', FilesControllers.getAllFiles)
  .get('/download', FilesControllers.sendFileToFront) 

  .post('/', FilesControllers.saveFile)

  export const FilesRouter = router

