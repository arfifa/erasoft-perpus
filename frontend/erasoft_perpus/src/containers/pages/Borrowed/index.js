import React, { Component } from 'react'
import { Container, Table, Spinner, Alert, Button } from 'reactstrap'
import { connect } from 'react-redux'
import swal from 'sweetalert'

import './borrowed.css'

import { getBorrowed, delBorrowed, updateBorrowed } from '../../../config/redux/action/borrowed.js'
import ModalAddBorrowed from '../../organisms/ModalAddBorrowed'

class Borrowed extends Component {

  async componentDidMount() {
    await this.props.getBorrowed()
  }

  _handleDelBorrowed = (borrowed_id) => {
    return (
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this transaction!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
        .then(async (willDelete) => {
          if (willDelete) {
            await this.props.delBorrowed(borrowed_id)
            await this.props.getBorrowed()
            swal("Poof! transaction has been deleted!", {
              icon: "success",
            });
          } else {
            swal("Transaction is safe!");
          }
        })
    )
  }

  _handleUpdateBorrowed = async (tgl_kembali, denda, id_buku, borrowedId) => {
    return (
      swal("Are you sure?", {
        buttons: true
      })
        .then(async (willUpdate) => {
          if (willUpdate) {
            await this.props.updateBorrowed({ tgl_kembali, denda, id_buku }, borrowedId)
            await this.props.getBorrowed()
            swal("Successfully!", {
              icon: "success",
            });
          }
        })
    )

  }

  render() {
    const { isLoading, isSuccess, isError, msgError, borrowedData } = this.props.borrowed
    return (
      <Container className='mt-2 containerBorrowed'>
        {isLoading &&
          <div className="containerContent">
            <Spinner className="spinnerBorrowed" type="grow" color="dark" />
          </div>
        }
        {isSuccess && borrowedData.success &&
          <>
            <h4>Borrowed Data</h4><hr />
            <ModalAddBorrowed buttonLabel="New Borrow" />
            <Table bordered responsive>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Member Name</th>
                  <th>Book Title</th>
                  <th>Date Borrow</th>
                  <th>Date Back</th>
                  <th>Fine/Day</th>
                  <th>Date Borrowed</th>
                  <th>Total Fine</th>
                  <th>Borrowed Status</th>
                  <th>Return Status</th>
                  <th>Operation</th>
                </tr>
              </thead>
              <tbody>
                {borrowedData.result.map((b, i) =>
                  (
                    <tr key={b.id_pinjam}>
                      <th scope="row">{i + 1}</th>
                      <td>{b.nama_anggota}</td>
                      <td>{b.judul_buku}</td>
                      <td>{b.tgl_pinjam.substring(0, 10)}</td>
                      <td>{b.tgl_kembali.substring(0, 10)}</td>
                      <td>{b.denda}</td>
                      <td>{b.tgl_pengembalian !== null ? b.tgl_pengembalian.substring(0, 10) : null}</td>
                      <td>{b.totaldenda}</td>
                      <td>{b.status_peminjaman}</td>
                      <td>{b.status_pengembalian}</td>
                      <td width="150">
                        {b.status_pengembalian === "Sudah" ? (
                          "Selesai"
                        ) : (
                            <>
                              <Button outline className="btn btnBorrowedOperation" color="info"
                                onClick={() => this._handleUpdateBorrowed(b.tgl_kembali, b.denda, b.id_buku, b.id_pinjam)}>
                                transaction complete
                              </Button>
                              <Button outline className="btn btnBorrowedOperation" color="danger"
                                onClick={() => this._handleDelBorrowed(b.id_pinjam)}>
                                Cancel Transaction
                              </Button>
                            </>
                          )}
                      </td>
                    </tr>
                  )
                )}
              </tbody >
            </Table >
          </>
        }
        {
          borrowedData.success === false &&
          <div className="containerContent">
            <Alert color="danger">
              <ModalAddBorrowed buttonLabel="New Borrow" />
              {borrowedData.msg}
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
  borrowed: state.borrowed
})

const reduxDispatch = (dispatch) => ({
  getBorrowed: () => dispatch(getBorrowed()),
  delBorrowed: (borrowed_id) => dispatch(delBorrowed(borrowed_id)),
  updateBorrowed: (data, borrowed_id) => dispatch(updateBorrowed(data, borrowed_id))
})

export default connect(reduxState, reduxDispatch)(Borrowed);
