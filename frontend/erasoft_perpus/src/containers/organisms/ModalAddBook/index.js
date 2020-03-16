import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText } from 'reactstrap'
import { FaPlus } from "react-icons/fa"
import { connect } from 'react-redux'
import swal from 'sweetalert'

import './modalAddBook.css'

import { postBook, getBook } from '../../../config/redux/action/book'

class ModalAddBook extends Component {
  constructor(props) {
    super(props)
    this.state = {
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
      modal: false
    }
  }

  onChange = e => {
    this.setState({ gambar: e.target.files[0] })
  }

  _handleAddBook = async () => {
    const { id_kategori, judul_buku, pengarang, thn_terbit, penerbit, isbn, jumlah_buku, lokasi, gambar, status_buku } = this.state
    if (judul_buku.length > 0 && pengarang.length > 0 && thn_terbit.length > 0 && penerbit.length > 0 && isbn.length > 0 && jumlah_buku > 0 && gambar !== null) {
      const formData = new FormData()
      formData.append('gambar', this.state.gambar)
      formData.append('data', JSON.stringify({ id_kategori, judul_buku, pengarang, thn_terbit, penerbit, isbn, jumlah_buku, lokasi, status_buku }));
      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }
      await this.props.postBook(formData, config)
      await this.props.getBook()
      this.setState({ modal: !this.state.modal })
    } else {
      return (
        swal("All data must be filled!")
      )
    }
  }

  toggle = () => this.setState({ modal: !this.state.modal })

  render() {
    let { buttonLabel, className } = this.props
    return (
      <div>
        <Button color="primary" className="btnAddBook" onClick={this.toggle}> <FaPlus />{buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={className} size='lg'>
          <ModalHeader toggle={this.toggle}>ADD NEW BOOK</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="category">Category</Label>
                <Input type="select" id="category"
                  onChange={(e) => this.setState({ id_kategori: e.target.value })}
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
                <Label for="bookTitle">Book Title</Label>
                <Input type="text" id="bookTitle" placeholder="book title"
                  onChange={(e) => this.setState({ judul_buku: e.target.value })} />
              </FormGroup>
              <FormGroup>
                <Label for="author">Author</Label>
                <Input type="text" id="author" placeholder="author"
                  onChange={(e) => this.setState({ pengarang: e.target.value })} />
              </FormGroup>
              <FormGroup>
                <Label for="publisher">Publisher</Label>
                <Input type="text" id="publisher" placeholder="Publisher"
                  onChange={(e) => this.setState({ penerbit: e.target.value })} />
              </FormGroup>
              <FormGroup>
                <Label for="publication_year"><small>Publication Year</small></Label>
                <Input
                  type="date"
                  id="publication_year"
                  placeholder="publication year"
                  onChange={(e) => this.setState({ thn_terbit: e.target.value })}
                />
              </FormGroup>
              <FormGroup>
                <Label for="isbn">ISBN</Label>
                <Input type="text" id="isbn" placeholder="isbn"
                  onChange={(e) => this.setState({ isbn: e.target.value })} />
              </FormGroup>
              <FormGroup>
                <Label for="number_of_books">Number Of Books </Label>
                <Input type="number" id="number_of_books" placeholder="number of books"
                  onChange={(e) => this.setState({ jumlah_buku: e.target.value })} />
              </FormGroup>
              <FormGroup>
                <Label for="location">Location</Label>
                <Input type="select" id="location"
                  onChange={(e) => this.setState({ lokasi: e.target.value })}
                >
                  <option value={1}>Rak 1</option>
                  <option value={2}>Rak 2</option>
                  <option value={3}>Rak 3</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="book_status">Book Status</Label>
                <Input type="select" id="book_status"
                  onChange={(e) => this.setState({ status_buku: e.target.value })}
                >
                  <option value={1}>Tersedia</option>
                  <option value={2}>Tidak Tersedia</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="book_image">Image</Label>
                <Input type="file" id="book_image"
                  onChange={this.onChange} />
                <FormText color="muted">
                  Upload image book.
                </FormText>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this._handleAddBook}>Add Book</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

const reduxDispatch = (dispatch) => ({
  postBook: (data, config) => dispatch(postBook(data, config)),
  getBook: () => dispatch(getBook())
})

export default connect(null, reduxDispatch)(ModalAddBook)
