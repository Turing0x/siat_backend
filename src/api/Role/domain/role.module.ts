import mongoose from 'mongoose';

const RoleSchema = new mongoose.Schema({

    name: {
        type: String,
        require: true
    },
    code: {
        type: String,
        require: true
    }

});

export const RoleModel = mongoose.model('role', RoleSchema)