import mongoose from 'mongoose';

const ExerciseSchema = new mongoose.Schema({

    description: {
      type: String,
      require: true
    },
    posible_solution: {
      type: String,
      require: true
    },
    solution: {
      type: String,
      require: true
    },
    anotations: {
      type: String,
      require: false
    },
    exercise_files_info: {
      type: Array,
      require: true
    }
  
  });
  
  export const ExerciseModel = mongoose.model('excercises', ExerciseSchema);