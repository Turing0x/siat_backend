import multer from 'multer'
import { v4 as uuidv4 } from 'uuid';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if( file.fieldname === 'exFile' ){
      cb(null, './uploads/exercises/')
    } else if ( file.fieldname === 'possibleSolFile' ) {
      cb(null, './uploads/possibleSolFile/')
    } else if ( file.fieldname === 'solutionFile' ) {
      cb(null, './uploads/solutionFile/')
    }
  },
  filename: function (req, file, cb) {
    cb(null, `${uuidv4()}.${file.originalname.split('.')[1]}`)
  }
})

export const upload = multer({ storage: storage })