import React from 'react';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import BookList from './components/BookList';
import AddBook from './components/AddBook';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BookList />
      <AddBook />
    </ApolloProvider>
  );
}

export default App;
