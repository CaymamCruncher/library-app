import React, {Component} from 'react'
import * as BooksAPI from './BooksAPI'
import {Route, Link} from 'react-router-dom'
import Bookshelf from './Bookshelf'
import SearchBook from './SearchBook'
import './App.css'

class BooksApp extends Component {
  state = {
    //list of shelves to map through
    shelves: ['Currently reading', 'Want to read', 'Read'],
    books: []
  }

  //componentDidMount method to get all books
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({
        books
      })
    })
  }


  //code for moving books
  moveBook = (shelf, newBook) => {
    //update books shelf
    newBook.shelf = shelf
    this.setState({
      books: this.state.books.filter((book) => book.id !== newBook.id).concat(newBook)
    },() => {
      BooksAPI.update(newBook, shelf)
    })
  }

  //sort books method to sort books into shelves
  sortBooks = (shelf) => {
    //if books.length is greater than 0 filter through them
    if (this.state.books.length > 0) {
      return (this.state.books.filter((book) => (book.shelf.toLowerCase() === shelf.toLowerCase().replace(/\s+/g, ''))))
    } else {
      return []
    }
  }

  //render method for app

  render() {
    return (
        <div className="app">
          <Route exact path="/" render={() => (
            <section>
              <div className="list-books">
                  <div className="list-books-title">
                    <h1>MyReads</h1>
                  </div>
                  <div className="list-books-content">
                    <div>
                      {this.state.shelves.map(shelf => (
                        <Bookshelf key={shelf} shelf={shelf} books={this.sortBooks(shelf)} moveBook={this.moveBook}/>
                      ))}
                    </div>
                </div>
              </div>
              <div className="open-search">
                <Link to="/search">Add a book</Link>
              </div>
            </section>
          )}/>
          <Route path="/search" render={() => (
            <section>
              <SearchBook moveBook={this.moveBook} books={this.state.books} />
            </section>
          )}/>
      </div>
    )
  }
}

export default BooksApp
