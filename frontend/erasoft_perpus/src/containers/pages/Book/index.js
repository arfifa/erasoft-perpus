import React, { Component } from 'react'
import { Container, Table, Spinner, Alert, Button } from 'reactstrap'
import { connect } from 'react-redux'
import { FaPencilAlt, FaEraser } from "react-icons/fa"
import './book.css'

import { getBook } from '../../../config/redux/action/book'
import { APP_URL_IMAGE_BOOK } from '../../../config/Api'
import ModalAddBook from '../../organisms/ModalAddBook'

class Book extends Component {

  async componentDidMount() {
    await this.props.getBook()
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
                        <Button outline className="btn-xs" color="info"><FaEraser /></Button>
                        <Button outline className="btn-xs" color="warning"><FaPencilAlt /></Button>
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
  getBook: () => dispatch(getBook())
})

export default connect(reduxState, reduxDispatch)(Book);
