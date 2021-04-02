import { useState } from 'react'
import { graphql } from 'react-apollo'
import { flowRight as compose } from 'lodash'
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries'

function AddBook(props) {
  const [book, setBook] = useState({ name: '', genre: '' })

  const displayAuthors = () => {
    const data = props.getAuthorsQuery

    if (data.loading) {
      return <option disabled>Loading Authors...</option>
    }

    return data.authors.map((author) => (
      <option key={author.id} value={author.id}>{author.name}</option>
    ))
  }

  const handleChange = (property) => (e) => {
    if (e.preventDefault) e.preventDefault()

    setBook({
      ...book,
      [property]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    if (e.preventDefault) e.preventDefault()
    props.addBookMutation({
      variables: book,
      refetchQueries: [{ query: getBooksQuery }]
    })
  }

  console.log({book})

  return (
    <form id="add-book" onSubmit={handleSubmit}>
      <div className="field">
        <label>Book name: </label>
        <input type="text" onChange={handleChange('name')} value={book.name} />
      </div>

      <div className="field">
        <label>Genre: </label>
        <input type="text" onChange={handleChange('genre')} value={book.genre} />
      </div>

      <div className="field">
        <label>Author: </label>
        <select onChange={handleChange('authorId')}>
          <option>Select author</option>
          {displayAuthors()}
        </select>
      </div>

      <button>+</button>
    </form>
  )
}

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" }),
)(AddBook)
