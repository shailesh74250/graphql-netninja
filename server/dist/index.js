"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const express_graphql_1 = require("express-graphql");
const schema = require("./schema/schema");
const app = express_1.default();
mongoose_1.default.connect('mongodb+srv://admin:shailesh@cluster0.1oydy.mongodb.net/graphqldb?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose_1.default.connection.once('open', () => {
    console.log('connected');
});
app.use(cors_1.default());
app.use("/graphql", express_graphql_1.graphqlHTTP({
    schema,
    graphiql: true
}));
app.listen(4000, () => {
    console.log("now listing for requests on port 4000");
});
//# sourceMappingURL=index.js.map