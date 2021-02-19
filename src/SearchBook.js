import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Bookshelf from './Bookshelf'
import * as BooksAPI from './BooksAPI'
import {Link} from 'react-router-dom'


class SearchBook extends Component{
  //import moveBook function
	constructor(props) {
		super()
		console.log(props)

		//foundbooks displays all books in the render function or an h2 with No Results
		this.state = {
			foundBooks: []
		}
	}

  static propTypes = {
    moveBook: PropTypes.func.isRequired,
    books: PropTypes.array.isRequired
	}

  //findBook searches for query and then makes a bookshelf for all the results.
  //If no results are found set foundBooks equal to an h2 with No Results
  findBook = (query) => {
    BooksAPI.search(query).then((newBooks) => {
      if (newBooks.length > 0) {
        let filteredBooks = newBooks
        this.props.books.map((book) => (
          filteredBooks = filteredBooks.map((newBook) => {
            if (book.id === newBook.id) {
              newBook.shelf = book.shelf
              return newBook
            } else {
              return newBook
            }
          })
        ))
        let bookshelf = <Bookshelf shelf={"Found Books"} books={filteredBooks} moveBook={this.props.moveBook}/>
        this.setState({
          foundBooks: bookshelf
        })
      } else {
        this.setState({
          foundBooks: <h2>No Results</h2>
        })
      }
    }).catch(() => {
      //code to handle if search has an error or query is deleted
      if (query.length > 0) {
        this.setState({
          foundBooks: <h2>There was an Error</h2>
        })
      } else {
        this.setState({
          foundBooks: []
        })
      }
    })
  }

	componentDidMount() {

	}

  render() {
		console.log(this.props.books)
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Add a book</Link>
          <div className="search-books-input-wrapper">
            <input onChange={(e) => this.findBook(e.target.value)} type="text" placeholder="Search by title or author"/>
          </div>
        </div>
        <div className="search-books-results">
          {this.state.foundBooks}
        </div>
      </div>
    )
  }
}

export default SearchBook
