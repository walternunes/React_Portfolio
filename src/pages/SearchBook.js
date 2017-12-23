import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from '../components/Book'
import * as BooksAPI from '../BooksAPI'

class SearchBook extends Component {
  state = {
      query: '',
      books: [],
      hasResults: false
    }

  findBook(query){
    this.setState({query, hasResults: true})
    if(query) {
      BooksAPI.search(query).then(books => {
           if(books.error){
               this.setState({books: [], hasResults: false})
           } else {
             if(this.props.shelfBooks.length > 0){
               books.forEach(book => {
                 this.props.shelfBooks.filter(search => search.id === book.id).map(foundBook => (
                   book.shelf = foundBook.shelf
                 ))
               })
             }
             this.setState({books, hasResults: true})
           }
         })
     } else {
       this.setState({books: [], hasResults: false})
     }
  }


  render() {
    const {onChangeShelf} = this.props
    const {query, books, hasResults} = this.state

    return (

      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.findBook(event.target.value)}
            />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {  books.map((book) => (
                <Book
                  key={book.id}
                  book={book}
                  onChangeShelf={onChangeShelf}
                  />
              ))
            }
          </ol>
        </div>
        {query.length > 0 && !hasResults && (
            <div>No results!</div>
        )}
      </div>

    )
  }
}

export default SearchBook
