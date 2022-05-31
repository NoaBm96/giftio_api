// Express.js is a free and open - source w                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   eb application framework for Node.js.
// It is used for designing and building web applications quickly and easily.
import express from "express";

// Body-parser is the Node. js body parsing middleware.
// It is responsible for parsing the incoming request bodies in a middleware before you handle it.
import bodyParser from "body-parser";

// Mongoose provides a straight-forward, schema-based solution to model your application data.
import mongoose from "mongoose";

// Cross - Origin Resource Sharing(CORS) is an HTTP - header based mechanism that allows a server to indicate any
// origins(domain, scheme, or port) other than its own from which a browser should permit loading resources.
import cors from "cors";

// dotenv Loads environment variables from.env file.
import dotenv from "dotenv";

//routes importing
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";
import friendRouter from "./routes/friend.js";
import wishListRouter from "./routes/wishList.js";
import wishListCategoryRouter from "./routes/wishListCategory.js";
import paymentMethodRouter from "./routes/paymentMethod.js";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename); 

//start the .env
dotenv.config();

//instance names app with express framework
const app = express();

// use() function is used to mount the specified middleware function(s) at the path which is being specified.

app.use(express.static(path.join(__dirname, 'build')))

// bodyParser.json() Returns middleware that only parses json
// and only looks at requests where the Content-Type header matches the type option.
app.use(bodyParser.json({ limit: "30mb", extended: true }));

// Returns middleware that only parses urlencoded bodies and
// only looks at requests where the Content-Type header matches the type option.
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors({ origin: true, credentials: true }));

//Defining Port on which our page is load.
const port = process.env.PORT || 5001;

//Connection Parameters Passing in mongoose.connect() method. Required inorder to connect
const CONNECTION_PARAMS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// use() function is used to mount the specified middleware function(s) at the path which is being specified.
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/friends", friendRouter);
app.use("/wishLists", wishListRouter);
app.use("/wishListCategories", wishListCategoryRouter);
app.use("/paymentMethods", paymentMethodRouter);
app.use("/static", express.static(path.join(__dirname, "uploads")));

// The app.get() responds with “Hello to ToDo App API” for requests to the root URL (/) or route.
//all the api code goes here
app.get('/api', (req, res) => {
  res.json({
    message: 'This is the api endpoint'
  })
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

// Connecting with MongoDB with the mongoose.connect() method.
mongoose
  .connect(process.env.CONNECTION_URL, CONNECTION_PARAMS)
  .then(() => app.listen(port, console.log(`Server running on port: ${port}`)))
  .catch((error) => console.log(error.message));
