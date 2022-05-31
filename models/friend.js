//Mongoose provides a straight-forward, schema-based solution to model your application data.
import mongoose from "mongoose";

//Everything in Mongoose starts with a Schema.
//Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.
const friendSchema = mongoose.Schema({
  username: { type: String, required: true },
  friendId: { type: String, required: true },
  userId: { type: String, required: true },
});

//To use our schema definition, we need to convert our friendSchema into a Model we can work with.
//To do so, we pass it into mongoose.model(modelName, schema)
export default mongoose.model("Friend", friendSchema);
