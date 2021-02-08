const graphql = require("graphql");
const _ = require('lodash');
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, } = graphql;
var books = [
    { name: 'Name of the wind', genre: 'Fantasy', id: '1' },
    { name: 'The final empire', genre: 'Fantasy', id: '2' },
    { name: 'the long earth', genre: 'sci-fi', id: '3' }
];
var authors = [
    { name: 'Name of the wind', genre: 'Fantasy', id: '1' },
    { name: 'The final empire', genre: 'Fantasy', id: '2' },
    { name: 'the long earth', genre: 'sci-fi', id: '3' }
];
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString }
    })
});
const Author = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt }
    })
});
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(_parent, args) {
                return _.find(books, { id: args.id });
            }
        },
        author: {
            type: Author,
            args: { id: { type: GraphQLID } },
            resolve(_parent, args) {
                return _.find(authors, { id: args.id });
            }
        }
    }
});
module.exports = new GraphQLSchema({
    query: RootQuery
});
//# sourceMappingURL=schema.js.map