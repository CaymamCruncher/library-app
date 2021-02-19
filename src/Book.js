import PropTypes from 'prop-types'
import React, {Component} from 'react'

class Book extends Component {
  //define options in state to map through them later
  state = {
    options: [
      ['move', 'Move To...' , true],
      ['currentlyReading', 'Currently Reading', false],
      ['wantToRead', 'Want to Read', false],
      ['read', 'Read', false],
      ['none', 'None', false]
    ]
  }
  //all proptypes
  static propTypes = {
    book: PropTypes.object.isRequired,
    moveBook: PropTypes.func.isRequired
  }

  render() {
    //define variables at the top
    const book = this.props.book
    let image = ''

    //code to check for imagelinks
    if (book.imageLinks) {
      image = book.imageLinks.thumbnail
    }

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <img className="book-cover" src={image} alt={'Picture of ' + book.title}/>
            <div className="book-shelf-changer">
              <select value={book.shelf ? book.shelf : 'none'}onChange={(e) => this.props.moveBook(e.target.value, book)}>
                {this.state.options.map((option) => (
                  <option key={option[0]} value={option[0]} disabled={option[2]}>{option[1]}</option>
                ))}
              </select>
            </div>
          </div>
            <div className="book-title">{book.title}</div>
            {book.authors && book.authors.map((author) => (
              <div key={author} className="book-authors">{author}</div>
            ))}
        </div>
      </li>
    )
  }
}

export default Book
