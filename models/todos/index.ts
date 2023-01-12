import mongoose, { Schema, model } from "mongoose";

// create an interface representing a document in MongoDB
interface ITodo {
  title: string;
  isCompleted: boolean;
}

//create a schema corresponding to the document interface
const todoSchema = new Schema<ITodo>(
  {
    title: { type: String, required: true },
    isCompleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const TodoModel = mongoose.model("todo", todoSchema);
export default TodoModel;
