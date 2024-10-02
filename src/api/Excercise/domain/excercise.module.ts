import mongoose from 'mongoose';

const ExerciseSchema = new mongoose.Schema({

    title: {
      type: String,
    },
    description: {
      type: String,
    },
    posible_solution: {
      type: String,
    },
    solution: {
      type: String,
    },
    annotations: {
      type: String,
    },
    exercise_files: {
      type: String,
    }
  
  });
  
  export const ExerciseModel = mongoose.model('excercises', ExerciseSchema);