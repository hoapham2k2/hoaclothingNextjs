// import mongoose
import mongoose, { mongo } from "mongoose";
//connect to mongoose
const { MONGOOSE_URI } = process.env;

// connect function
export const connect = async () => {
  const conn = await mongoose
    .connect(MONGOOSE_URI as string)
    .catch((err) => console.log(err));
  console.log("Mongoose Connection Established");

  return conn;
};
