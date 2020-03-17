import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap'
import { FaPlus } from "react-icons/fa"
import { connect } from 'react-redux'
import swal from 'sweetalert'

import './modalAddBorrowed.css'

import { getMember } from '../../../config/redux/action/member'
import { getBook } from '../../../config/redux/action/book'
import { getBorrowed, postBorrowed } from '../../../config/redux/action/borrowed'

class ModalAddBorrowed extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id_anggota: null,
      id_buku: null,
      tgl_pinjam: null,
      tgl_kembali: null,
      denda: null,
      modal: false
    }
  }

  async componentDidMount() {
    await this.props.getMember()
    await this.props.getBook()
    await this.props.getBorrowed()
  }

  _handleAddBorrowed = async () => {
    const { id_anggota, id_buku, tgl_pinjam, tgl_kembali, denda } = this.state
    if (id_anggota !== null && id_buku !== null && tgl_pinjam !== null, tgl_kembali !== null, denda !== null) {
      await this.props.postBorrowed({ id_anggota, id_buku, tgl_pinjam, tgl_kembali, denda })
      await this.props.getBorrowed()
      this.setState({ modal: !this.state.modal })
    } else {
      return (
        swal("All data must be filled!")
      )
    }
  }

  toggle = () => {
    this.setState({ modal: !this.state.modal })
    const { member, book } = this.props
    if (book.bookData.result !== undefined && member.memberData.result !== undefined) {
      this.setState({
        id_anggota: member.memberData.result[0].id_anggota,
        id_buku: book.bookData.result[0].id_buku
      })
    }
  }

  render() {
    let { buttonLabel, className } = this.props
    const { member, book } = this.props
    return (
      <div>
        <Button color="primary" className="btnAddBorrowed" onClick={this.toggle}> <FaPlus />{buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={className} size='lg'>
          <ModalHeader toggle={this.toggle}>ADD NEW BORROW</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="id_anggota">Member</Label>
                <Input type="select" id="id_anggota"
                  onChange={(e) => this.setState({ id_anggota: e.target.value })}
                >
                  {member.memberData.result !== undefined ? (
                    member.memberData.result.map(m => (
                      <option key={m.id_anggota} value={m.id_anggota}>{m.nama_anggota}</option>
                    ))
                  ) : null}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="id_buku">Book Title</Label>
                <Input type="select" id="id_buku"
                  onChange={(e) => this.setState({ id_buku: e.target.value })}
                >
                  {book.bookData.result !== undefined ? (
                    book.bookData.result.filter(b => b.jumlah_buku > 0)
                      .map(b => (
                        <option key={b.id_buku} value={b.id_buku}>{b.judul_buku}</option>
                      ))
                  ) : null}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for="tgl_pinjam"><small>Date Borrow</small></Label>
                <Input
                  type="date"
                  id="tgl_pinjam"
                  placeholder="date borrow"
                  onChange={(e) => this.setState({ tgl_pinjam: e.target.value })}
                />
              </FormGroup>
              <FormGroup>
                <Label for="tgl_kembali"><small>Date Back</small></Label>
                <Input
                  type="date"
                  id="tgl_kembali"
                  placeholder="date back"
                  onChange={(e) => this.setState({ tgl_kembali: e.target.value })}
                />
              </FormGroup>
              <FormGroup>
                <Label for="denda">Fine/Day</Label>
                <Input type="number" id="denda" placeholder="fine/day"
                  onChange={(e) => this.setState({ denda: e.target.value })} />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this._handleAddBorrowed}>Add Borrowed</Button>
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

const reduxState = (state) => ({
  book: state.book,
  member: state.member
})

const reduxDispatch = (dispatch) => ({
  postBorrowed: (data) => dispatch(postBorrowed(data)),
  getMember: () => dispatch(getMember()),
  getBook: () => dispatch(getBook()),
  getBorrowed: () => dispatch(getBorrowed())
})

export default connect(reduxState, reduxDispatch)(ModalAddBorrowed)
