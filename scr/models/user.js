import {Schema, model} from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new Schema({
    username: {
     type: String,
     unique: true 
},
    email: {
     type: String,
     unique: true 
},
    password: {
     type: String,
     required: true 
},
    roles: [{
         
         ref: "Role",
         type: Schema.Types.ObjectId
    }]
}, {
     timestamps: true,
     versionKey: false
})

userSchema.statics.encryptPassword = async (password) => {
    try {
         const salt = await bcrypt.genSalt(10);
         return await bcrypt.hash(password, salt);
    } catch (error) {
         console.log(error);
    }

}

userSchema.statics.comparePassword = async (receivedPassword, userPassword) => {
    try {
         return await bcrypt.compare(receivedPassword, userPassword);
    } catch (error) {
         console.log(error);
    }
}
export default model('User', userSchema);
