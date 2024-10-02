import mongoose from 'mongoose';

const SolutionSchema = new mongoose.Schema({

    file_name: {
        type: String,
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
        ref: 'exercises'
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