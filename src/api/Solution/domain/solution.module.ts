import mongoose from 'mongoose';
import { Solution } from '../models/solution.model';

const SolutionSchema = new mongoose.Schema({

    solution_files_info: {
        type: Array,
        require: true
    },
    student_id: {
        type: String,
        require: true
    }
  
  });
  
  export const SolutionModel = mongoose.model('solution', SolutionSchema);