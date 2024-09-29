import multer from 'multer'
import { v4 as uuidv4 } from 'uuid';

export const id_file_name = uuidv4();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, `${id_file_name}.rar`)
  }
})

export const upload = multer({ storage: storage })