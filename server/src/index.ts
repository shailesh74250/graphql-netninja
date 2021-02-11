import express from "express";
import cors from 'cors';
import mongoose from 'mongoose';
import {graphqlHTTP} from "express-graphql";
const schema = require("./schema/schema");
const app = express();

// connect to db
mongoose.connect('mongodb+srv://admin:shailesh@cluster0.1oydy.mongodb.net/graphqldb?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
	console.log('connected');
})

// use cors
app.use(cors());

app.use("/graphql", graphqlHTTP({
	schema,
	graphiql: true
}));

app.listen(4000, () => {
	console.log("now listing for requests on port 4000");
})