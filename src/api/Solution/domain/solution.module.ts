import mongoose from 'mongoose';

const SolutionSchema = new mongoose.Schema({

    solution_files_info: {
        type: Array,
        require: true
    },
    student_id: {
        type: String,
        require: true,
        ref: 'users'
    },
    exercise_id: {
        type: String,
        require: true,
        ref: 'excercises'
    },
    evaluation: {
        type: Number,
        require: true,
        default: 0
    },
    anotations: {
        type: String,
        require: false
    }
  
  });
  
  export const SolutionModel = mongoose.model('solution', SolutionSchema);