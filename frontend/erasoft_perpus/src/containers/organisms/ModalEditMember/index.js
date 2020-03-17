import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap'
import { FaPencilAlt } from "react-icons/fa"
import { connect } from 'react-redux'
import swal from 'sweetalert'

import { getMemberById, updateMember, getMember } from '../../../config/redux/action/member'

class ModalEditMember extends Component {
  constructor(props) {
    super(props)
    this.state = {
      memberData: {
        id_anggota: '',
        nama_anggota: '',
        username: '',
        password: '',
        gender: 1,
        no_telp: '',
        alamat: '',
        email: '',
      },
      modal: false
    }
  }

  _handleEditMember = async () => {
    const { id_anggota, nama_anggota, username, password, gender, no_telp, alamat, email } = this.state.memberData
    if (username.length > 0 && nama_anggota.length > 0 && no_telp.length > 0 && alamat.length > 0 && email.length > 0 && password.length) {
      await this.props.updateMember({ username, nama_anggota, gender, no_telp, alamat, email, password }, id_anggota)
      await this.props.getMember()
      this.setState({ modal: !this.state.modal })
    } else {
      return (
        swal("All data must be filled!")
      )
    }
  }


  toggle = async () => {
    let { memberId } = this.props
    this.setState({ modal: !this.state.modal })
    await this.props.getMemberById(memberId)
    if (this.props.member.memberById.result[0] !== undefined) {
      this.setState({
        ...this.state,
        memberData: this.props.member.memberById.result[0]
      })
    }
  }

  _handleChangeText = (e) => {
    this.setState({
      memberData: {
        ...this.state.memberData,
        [e.target.id]: e.target.value
      }
    })
  }

  render() {
    let { className } = this.props
    let { nama_anggota, gender, no_telp, alamat, email } = this.state.memberData
    return (
      <div style={styles.container}>
        <Button outline className="btn-xs" color="info" onClick={this.toggle}>
          <FaPencilAlt />
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={className} size='lg'>
          <ModalHeader toggle={this.toggle}>EDIT MEMBER</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="nama_anggota">Member Name</Label>
                <Input type="text" id="nama_anggota" placeholder="member name"
                  value={nama_anggota}
                  onChange={this._handleChangeText} />
              </FormGroup>
              <FormGroup tag="fieldset">
                <legend className="col-form-label">Gender</legend>
                <FormGroup check>
                  <Label check>
                    <Input type="radio"
                      id="gender"
                      value="Laki-Laki"
                      checked={gender === "Laki-Laki"}
                      onChange={this._handleChangeText} />
                      Male
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input type="radio"
                      id="gender"
                      value="Perempuan"
                      checked={gender === "Perempuan"}
                      onChange={this._handleChangeText} />
                      Female
                  </Label>
                </FormGroup>
              </FormGroup>
              <FormGroup>
                <Label for="no_telp">Telephone Number</Label>
                <Input type="text" id="no_telp" placeholder="telephone number"
                  value={no_telp}
                  onChange={this._handleChangeText} />
              </FormGroup>
              <FormGroup>
                <Label for="alamat">Address </Label>
                <Input type="text" id="alamat" placeholder="address"
                  value={alamat}
                  onChange={this._handleChangeText} />
              </FormGroup>
              <FormGroup>
                <Label for="email">Email </Label>
                <Input type="email" id="email" placeholder="email"
                  value={email}
                  onChange={this._handleChangeText} />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this._handleEditMember}>Edit Member</Button>{' '}
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
  }
}

const reduxState = (state) => ({
  member: state.member
})

const reduxDispatch = (dispatch) => ({
  updateMember: (data, member_id) => dispatch(updateMember(data, member_id)),
  getMemberById: (member_id) => dispatch(getMemberById(member_id)),
  getMember: () => dispatch(getMember())
})

export default connect(reduxState, reduxDispatch)(ModalEditMember)
