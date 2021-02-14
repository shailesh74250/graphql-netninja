import React, {useState} from 'react';
import { useQuery } from '@apollo/client';
import { getAuthorsQuery } from '../queries/queries';

function AddBook() {
  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [authorId, setAuthorId] = useState('');
  const { loading, error, data } = useQuery(getAuthorsQuery);
  
  const displayAuthors = () => {
    if (loading) {
        return <div>Loading books...</div>
    } else {
        return data.authors.map((author: any) => {
            return (
                <option key={author.id} value={author.id}>{author.name}</option>
            );
        }) 
    }
  }

  const handleSubmit = (event:any) => {
    event.preventDefault();
    console.log(name, genre, authorId);
  }
  
  return (
    <form id="add-book" onSubmit={ handleSubmit }>
      <div className="field">
        <label>Book Name</label>
        <input type="text" onChange={(event) => setName(event.target.value)} />
      </div>
      <div className="field">
        <label>Genre: </label>
        <input type="text" onChange={(event) => setGenre(event.target.value)}/>
      </div>
      <div className="field">
        <label>Author:</label>
        <select onChange={(event) => setAuthorId(event.target.value)}>
          <option>select author</option>
          { displayAuthors() }
        </select>
      </div>
      <button type="submit">+</button>
    </form>
  );
}

export default AddBook;