import mongoose,{ Document,model, Schema } from "mongoose";


export interface IUser extends Document {
  email: string;
  username:string;
  password: string;
};

const userSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

// const User: Model<IUser> = model("User", userSchema);

export default model<IUser>("User", userSchema)