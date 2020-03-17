import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap'
import { FaPlus } from "react-icons/fa"
import { connect } from 'react-redux'
import swal from 'sweetalert'

import './modalAddMember.css'

import { postMember, getMember } from '../../../config/redux/action/member'

class ModalAddMember extends Component {
  constructor(props) {
    super(props)
    this.state = {
      nama_anggota: '',
      username: '',
      password: '',
      confirmPass: '',
      gender: 1,
      no_telp: '',
      alamat: '',
      email: '',
      modal: false
    }
  }

  _handleAddMember = async () => {
    const { username, nama_anggota, gender, no_telp, alamat, email, password, confirmPass } = this.state
    if (username.length > 0 && nama_anggota.length > 0 && no_telp.length > 0 && alamat.length > 0 && email.length > 0 && password.length) {
      if (password !== confirmPass) {
        return (
          swal("Password and confirm password don't match!")
        )
      } else {
        await this.props.postMember({ username, nama_anggota, gender, no_telp, alamat, email, password })
        await this.props.getMember()
        this.setState({ modal: !this.state.modal })
      }
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
        <Button color="primary" className="btnAddMember" onClick={this.toggle}> <FaPlus />{buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={className} size='lg'>
          <ModalHeader toggle={this.toggle}>ADD NEW MEMBER</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="nama_anggota">Member Name</Label>
                <Input type="text" id="nama_anggota" placeholder="member name"
                  onChange={(e) => this.setState({ nama_anggota: e.target.value })} />
              </FormGroup>
              <FormGroup>
                <Label for="username">Username</Label>
                <Input type="text" id="username" placeholder="username"
                  onChange={(e) => this.setState({ username: e.target.value })} />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input type="password" id="password" placeholder="password"
                  onChange={(e) => this.setState({ password: e.target.value })} />
              </FormGroup>
              <FormGroup>
                <Label for="confirmPass">Confirm Password</Label>
                <Input type="password" id="confirmPass" placeholder="confirm password"
                  onChange={(e) => this.setState({ confirmPass: e.target.value })} />
              </FormGroup>
              <FormGroup tag="fieldset">
                <legend className="col-form-label">Gender</legend>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" value={1} onChange={e => this.setState({ gender: e.target.value })} />
                      Male
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" value={2} onChange={e => this.setState({ gender: e.target.value })} />
                      Female
                  </Label>
                </FormGroup>
              </FormGroup>
              <FormGroup>
                <Label for="no_telp">Telephone Number</Label>
                <Input type="text" id="no_telp" placeholder="telephone number"
                  onChange={(e) => this.setState({ no_telp: e.target.value })} />
              </FormGroup>
              <FormGroup>
                <Label for="alamat">Address </Label>
                <Input type="text" id="alamat" placeholder="address"
                  onChange={(e) => this.setState({ alamat: e.target.value })} />
              </FormGroup>
              <FormGroup>
                <Label for="email">Email </Label>
                <Input type="email" id="email" placeholder="email"
                  onChange={(e) => this.setState({ email: e.target.value })} />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this._handleAddMember}>Add Member</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

const reduxDispatch = (dispatch) => ({
  postMember: (data) => dispatch(postMember(data)),
  getMember: () => dispatch(getMember())
})

export default connect(null, reduxDispatch)(ModalAddMember)
