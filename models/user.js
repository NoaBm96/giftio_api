//Mongoose provides a straight-forward, schema-based solution to model your application data.
import mongoose from "mongoose";

//Everything in Mongoose starts with a Schema.
//Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.
const userSchema = mongoose.Schema({
  givenName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, unique: true, required: true },
  role: { type: String, required: true },
  imageUrl: { type: String },
  createdAt: { type: Date, default: new Date() },
});

//To use our schema definition, we need to convert our userSchema into a Model we can work with.
//To do so, we pass it into mongoose.model(modelName, schema)
export default mongoose.model("User", userSchema);
