
import { ConnectionOptions, connect } from "mongoose";

const connectDB = async () => {
  try {
    const MongoURI = process.env.DB
    const options: ConnectionOptions = {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    };
    await connect(MongoURI, options);
    console.log("DB Connected");
  } catch (err) {
    console.error(err.message);
   
  
  }
};

export default connectDB;
