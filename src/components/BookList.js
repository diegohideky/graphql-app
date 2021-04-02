import { graphql } from 'react-apollo'
import { getBooksQuery } from '../queries/queries'

function BookList(props) {
  console.log({ props })
  const displayBooks = () => {
    const { data } = props
    if (data.loading) {
      return <div>Loading</div>
    }

    return data.books.map((book) => (
      <li key={book.id}>{book.name}</li>
    ))
  }

  return (
    <div>
      <ul id="book-list">
        {displayBooks()}
      </ul>
    </div>
  )
}

export default graphql(getBooksQuery)(BookList)
