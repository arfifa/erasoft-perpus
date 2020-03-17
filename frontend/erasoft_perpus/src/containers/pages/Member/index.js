import React, { Component } from 'react'
import { Container, Table, Spinner, Alert, Button } from 'reactstrap'
import { connect } from 'react-redux'
import { FaEraser } from "react-icons/fa"
import swal from 'sweetalert'

import './member.css'

import { getMember, delMember } from '../../../config/redux/action/member'
import ModalAddMember from '../../organisms/ModalAddMember'
import ModalEditMember from '../../organisms/ModalEditMember'

class Member extends Component {

  async componentDidMount() {
    await this.props.getMember()
  }

  _handleDelMember = (member_id) => {
    return (
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this anggota!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
        .then(async (willDelete) => {
          if (willDelete) {
            await this.props.delMember(member_id)
            await this.props.getMember()
            swal("Poof! Member has been deleted!", {
              icon: "success",
            });
          } else {
            swal("Member is safe!");
          }
        })
    )
  }

  render() {
    const { isLoading, isSuccess, isError, msgError, memberData } = this.props.member
    return (
      <Container className='mt-2 containerMember'>
        {isLoading &&
          <div className="containerContent">
            <Spinner className="spinnerMember" type="grow" color="dark" />
          </div>
        }
        {isSuccess && memberData.success &&
          <>
            <h4>Member Data</h4><hr />
            <ModalAddMember buttonLabel="New Member" />
            <Table bordered responsive>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Member Name</th>
                  <th>Gender</th>
                  <th>Telephone Number</th>
                  <th>Address</th>
                  <th>Email</th>
                  <th>Option</th>
                </tr>
              </thead>
              <tbody>
                {memberData.result.map((m, i) =>
                  (
                    <tr key={m.id_anggota}>
                      <th scope="row">{i + 1}</th>
                      <td>{m.nama_anggota}</td>
                      <td>{m.gender}</td>
                      <td>{m.no_telp}</td>
                      <td>{m.alamat}</td>
                      <td>{m.email}</td>
                      <td width="120">
                        <Button outline className="btn-xs" color="danger"
                          onClick={() => this._handleDelMember(m.id_anggota)}>
                          <FaEraser />
                        </Button>
                        <ModalEditMember memberId={m.id_anggota} />
                      </td>
                    </tr>
                  )
                )}
              </tbody >
            </Table >
          </>
        }
        {
          memberData.success === false &&
          <div className="containerContent">
            <Alert color="danger">
              <ModalAddMember buttonLabel="New Member" />
              {memberData.msg}
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
  member: state.member
})

const reduxDispatch = (dispatch) => ({
  getMember: () => dispatch(getMember()),
  delMember: (member_id) => dispatch(delMember(member_id))
})

export default connect(reduxState, reduxDispatch)(Member);
