const graphql = require("graphql");
const _ = require('lodash');

const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLSchema,
	GraphQLID,
	GraphQLInt,
	GraphQLList
} = graphql;

// dummy data
var books = [
	{name: 'Name of the wind', genre: 'Fantasy', id: '1', authorId: '1'},
	{name: 'The final empire', genre: 'Fantasy', id: '2', authorId: '2'},
	{name: 'the long earth', genre: 'sci-fi', id: '3', authorId: '3'},
	{name: 'asdfsad', genre: 'Fantasy', id: '4', authorId: '2'},
	{name: 'sadf', genre: 'Fantasy', id: '5', authorId: '1'},
	{name: 'sdfds', genre: 'sci-fi', id: '6', authorId: '1'},
];

var authors = [
	{name: 'Name of the wind', genre: 'Fantasy', id: '1'},
	{name: 'The final empire', genre: 'Fantasy', id: '2'},
	{name: 'the long earth', genre: 'sci-fi', id: '3'}
];

const BookType = new GraphQLObjectType({
	name: 'Book',
	fields: () => ({
		id: {type: GraphQLID},
		name: {type: GraphQLString},
		genre: {type: GraphQLString},
		author: {
			type: AuthorType,
			resolve(parent:any, _args: any) {
				console.log(parent);
				return _.find(authors, {id: parent.authorId});
			}
		}
	})
});

const AuthorType = new GraphQLObjectType({
	name: 'Author',
	fields: () => ({
		id: {type: GraphQLID},
		name: {type: GraphQLString},
		age: {type: GraphQLInt},
		books: {
			type: new GraphQLList(BookType),
			resolve(parent:any, _args:any) {
				return _.filter(books, {authorId: parent.id});
			}
		}
	})
});

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		book: {
			type: BookType,
			args: {id: {type: GraphQLID}},
			resolve(_parent:any, args:any) {
				// code to get data from db / other source
				return _.find(books, {id: args.id});
			}
		},
		author:{
			type: AuthorType,
			args: { id: { type: GraphQLID } },
			resolve(_parent: any, args: any) {
				return _.find(authors, { id: args.id });
			}
		},
		books: {
			type: new GraphQLList(BookType),
			resolve(_parent:any, _args:any) {
				return books
			}
		},
		authors: {
			type: new GraphQLList(AuthorType),
			resolve(_parent: any, _args: any) {
				return authors
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery
});