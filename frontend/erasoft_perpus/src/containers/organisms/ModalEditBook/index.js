import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText } from 'reactstrap'
import { FaPencilAlt } from "react-icons/fa"
import { connect } from 'react-redux'
import swal from 'sweetalert'

import './modalEditBook.css'

import { APP_URL_IMAGE_BOOK } from '../../../config/Api'
import { getBookByid, updateBook, getBook } from '../../../config/redux/action/book'

class ModalEditBook extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bookData: {
        id_buku: '',
        id_kategori: 1,
        judul_buku: '',
        pengarang: '',
        thn_terbit: '',
        penerbit: '',
        isbn: '',
        jumlah_buku: '',
        lokasi: 1,
        gambar: null,
        status_buku: 1,
      },
      modal: false
    }
  }
  onChange = e => {
    this.setState({ bookData: { ...this.state.bookData, gambar: e.target.files[0] } })
  }

  _handleEditBook = async (book_id) => {
    const { id_kategori, judul_buku, pengarang, thn_terbit, penerbit, isbn, jumlah_buku, lokasi, gambar, status_buku } = this.state.bookData
    if (judul_buku.length > 0 && pengarang.length > 0 && thn_terbit.length > 0 && penerbit.length > 0 && isbn.length > 0 && jumlah_buku > 0 && gambar !== null) {
      const formData = new FormData()
      formData.append('gambar', gambar)
      formData.append('data', JSON.stringify({ id_kategori, judul_buku, pengarang, thn_terbit, penerbit, isbn, jumlah_buku, lokasi, status_buku, gambar }));
      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }
      await this.props.updateBook(formData, book_id, config)
      await this.props.getBook()
      this.setState({ modal: !this.state.modal })
    } else {
      return (
        swal("All data must be filled!")
      )
    }
  }

  toggle = async () => {
    let { bookId } = this.props
    this.setState({ modal: !this.state.modal })
    await this.props.getBookByid(bookId)
    if (this.props.book.bookById.result[0]) {
      this.setState({
        ...this.state,
        bookData: this.props.book.bookById.result[0]
      })
    }
  }

  _handleChangeText = (e) => {
    this.setState({
      bookData: {
        ...this.state.bookData,
        [e.target.id]: e.target.value
      }
    })
  }

  render() {
    let { className } = this.props
    let { id_kategori, judul_buku, pengarang, thn_terbit, penerbit, isbn, jumlah_buku, lokasi, gambar, status_buku, id_buku } = this.state.bookData
    return (
      <div style={styles.container}>
        <Button outline className="btn-xs" color="info" onClick={this.toggle}>
          <FaPencilAlt />
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={className} size='lg'>
          <ModalHeader toggle={this.toggle}>EDIT BOOK</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="id_kategori">Category</Label>
                <Input type="select" id="id_kategori"
                  value={id_kategori}
                  onChange={this._handleChangeText}
                >
                  <option value={1}>Sains</option>
                  <option value={2}>Hobby</option>
                  <option value={3}>Komputer</option>
                  <option value={4}>Komunikasi</option>
                  <option value={5}>Hukum</option>
                  <option value={6}>Agama</option>
                  <option value={7}>Populer</option>
                  <option value={8}>Bahasa</option>
                  <option value={9}>Komik</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="judul_buku">Book Title</Label>
                <Input type="text" id="judul_buku" placeholder="book title"
                  value={judul_buku}
                  onChange={this._handleChangeText} />
              </FormGroup>
              <FormGroup>
                <Label for="pengarang">Author</Label>
                <Input type="text" id="pengarang" placeholder="author"
                  value={pengarang}
                  onChange={this._handleChangeText} />
              </FormGroup>
              <FormGroup>
                <Label for="penerbit">Publisher</Label>
                <Input type="text" id="penerbit" placeholder="Publisher"
                  value={penerbit}
                  onChange={this._handleChangeText} />
              </FormGroup>
              <FormGroup>
                <Label for="thn_terbit"><small>Publication Year</small></Label>
                <Input
                  type="date"
                  id="thn_terbit"
                  placeholder="publication year"
                  defaultValue={thn_terbit.substring(0, 10)}
                  onChange={this._handleChangeText}
                />
              </FormGroup>
              <FormGroup>
                <Label for="isbn">ISBN</Label>
                <Input type="text" id="isbn" placeholder="isbn"
                  value={isbn}
                  onChange={this._handleChangeText} />
              </FormGroup>
              <FormGroup>
                <Label for="jumlah_buku">Number Of Books </Label>
                <Input type="number" id="jumlah_buku" placeholder="number of books"
                  value={jumlah_buku}
                  onChange={this._handleChangeText} />
              </FormGroup>
              <FormGroup>
                <Label for="lokasi">Location</Label>
                <Input type="select" id="lokasi"
                  value={lokasi}
                  onChange={this._handleChangeText}
                >
                  <option value={1}>Rak 1</option>
                  <option value={2}>Rak 2</option>
                  <option value={3}>Rak 3</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="status_buku">Book Status</Label>
                <Input type="select" id="status_buku"
                  value={status_buku}
                  onChange={this._handleChangeText}
                >
                  <option value={1}>Tersedia</option>
                  <option value={2}>Tidak Tersedia</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="gambar">Image</Label>
                <Input type="file" id="gambar"
                  onChange={this.onChange} />
                <FormText color="muted">
                  Update your image book.
                  <img src={`${APP_URL_IMAGE_BOOK}${gambar}`}
                    style={styles.bookImage} />
                </FormText>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this._handleEditBook(id_buku)}>Edit Book</Button>
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

const styles = {
  container: {
    display: 'inline-block'
  },
  bookImage: {
    width: 70,
    height: 90,
    display: 'block',
    marginTop: 10
  }
}


const reduxState = (state) => ({
  book: state.book
})

const reduxDispatch = (dispatch) => ({
  updateBook: (data, book_id, config) => dispatch(updateBook(data, book_id, config)),
  getBookByid: (book_id) => dispatch(getBookByid(book_id)),
  getBook: () => dispatch(getBook())
})

export default connect(reduxState, reduxDispatch)(ModalEditBook)
