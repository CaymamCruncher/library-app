import PropTypes from 'prop-types'
import React from 'react'
import Book from './Book'

const Bookshelf = ({shelf, books, moveBook}) => {
  //return method for bookshelves
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelf}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) => (
            <Book key={book.id} book={book} shelf={shelf} moveBook={moveBook}/>
          ))}
        </ol>
      </div>
    </div>
  )
}

//declare PropTypes for bookshelves
Bookshelf.propTypes = {
  shelf: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  moveBook: PropTypes.func.isRequired
}

export default Bookshelf
