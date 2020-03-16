import React, { Component } from 'react'
import { Container, Table, Spinner, Alert, Button } from 'reactstrap'
import { connect } from 'react-redux'
import { FaEraser } from "react-icons/fa"
import swal from 'sweetalert'

import './book.css'

import { getBook, delBook } from '../../../config/redux/action/book'
import { APP_URL_IMAGE_BOOK } from '../../../config/Api'
import ModalAddBook from '../../organisms/ModalAddBook'
import ModalEditBook from '../../organisms/ModalEditBook'

class Book extends Component {

  async componentDidMount() {
    await this.props.getBook()
  }

  _handleDelBook = (book_id, image) => {
    return (
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this book!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
        .then(async (willDelete) => {
          if (willDelete) {
            await this.props.delBook(book_id, image)
            await this.props.getBook()
            swal("Poof! Book has been deleted!", {
              icon: "success",
            });
          } else {
            swal("Book is safe!");
          }
        })
    )
  }

  render() {
    const { isLoading, isSuccess, isError, msgError, bookData } = this.props.book
    return (
      <Container className='mt-2 containerBook'>
        {isLoading &&
          <div className="containerContent">
            <Spinner className="spinnerBook" type="grow" color="dark" />
          </div>
        }
        {isSuccess && bookData.success &&
          <>
            <h4>book data</h4><hr />
            <ModalAddBook buttonLabel="New Book" />
            <Table bordered responsive>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Image</th>
                  <th>Book Title</th>
                  <th>Author</th>
                  <th>Publisher</th>
                  <th>Publication Year</th>
                  <th>ISBN</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Option</th>
                </tr>
              </thead>
              <tbody>
                {bookData.result.map((b, i) =>
                  (
                    <tr key={b.id_buku}>
                      <th scope="row">{i + 1}</th>
                      <td><img src={`${APP_URL_IMAGE_BOOK}${b.gambar}`} className="bookImg" /></td >
                      <td>{b.judul_buku}</td>
                      <td>{b.pengarang}</td>
                      <td>{b.penerbit}</td>
                      <td>{b.thn_terbit.substring(0, 10)}</td>
                      <td>{b.isbn}</td>
                      <td>{b.lokasi}</td>
                      <td>{b.status_buku}</td>
                      <td width="120">
                        <Button outline className="btn-xs" color="danger"
                          onClick={() => this._handleDelBook(b.id_buku, b.gambar)}>
                          <FaEraser />
                        </Button>
                        <ModalEditBook bookId={b.id_buku} />
                      </td>
                    </tr>
                  )
                )}
              </tbody >
            </Table >
          </>
        }
        {
          bookData.success === false &&
          <div className="containerContent">
            <Alert color="danger">
              {bookData.msg}
            </Alert>
          </div>
        }

        {
          isError &&
          <div className="containerContent">
            <Alert color="danger">
              {msgError}
            </Alert>
          </div>
        }
      </Container >
    )
  }
}


const reduxState = (state) => ({
  book: state.book
})

const reduxDispatch = (dispatch) => ({
  getBook: () => dispatch(getBook()),
  delBook: (book_id, image) => dispatch(delBook(book_id, image))
})

export default connect(reduxState, reduxDispatch)(Book);
