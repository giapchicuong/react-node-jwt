import React, { useEffect, useState } from "react";
import "./user.scss";
import { deleteUser, fetchAllUser } from "../../services/userService";
import ReactPaginate from "react-paginate";
import ModalDelete from "./ModalDelete";
import ModalUser from "./ModalUser";
function User() {
  // Modal Create /Edit
  const [isShowModalUser, setIsShowModalUser] = useState(false);
  const [actionModalUser, setActionModalUser] = useState("CREATE");
  const [dataModalUser, setDataModalUser] = useState({});

  //modal Delete
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [dataModalDelete, setDataModalDelete] = useState({});

  // Display List User
  const [listUsers, setListUsers] = useState([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(3);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  // Fetch Users
  const fetchUsers = async () => {
    const response = await fetchAllUser(currentPage, currentLimit);
    if (response && response && response.EC === 0) {
      setTotalPages(response.DT.totalPages);
      setListUsers(response.DT.users);
    }
  };
  // Refresh button
  const handleRefresh = async () => {
    await fetchUsers();
  };
  // Pagination Button
  const handlePageClick = async (e) => {
    setCurrentPage(+e.selected + 1);
  };
  // Delete Button
  const handleDeleteUser = async (user) => {
    setDataModalDelete(user);
    setIsShowModalDelete(true);
  };
  // Close Modal Delete
  const handleCloseModalDelete = async () => {
    setIsShowModalDelete(false);
    await fetchUsers();
    setDataModalDelete({});
  };
  // Confirm Modal Delete
  // const handleConfirmDeleteUser = async () => {
  //   const response = await deleteUser(dataModalDelete);
  //   if (response && response.EC === 0) {
  //     await fetchUsers();
  //     setIsShowModalDelete(false);
  //   }
  // };
  // Close Modal User
  const handleCloseModalUser = async () => {
    setIsShowModalUser(false);
    await fetchUsers();
  };
  // Edit Button
  const handleEditUser = (user) => {
    setActionModalUser("UPDATE");
    setDataModalUser(user);
    setIsShowModalUser(true);
  };
  return (
    <>
      <div className="container">
        <div className="manege-container-users">
          <div className="user-header">
            <div className="title">
              <h3>Table Users</h3>
            </div>
            <div className="actions">
              <button
                className="btn btn-success"
                onClick={() => handleRefresh()}
              >
                <i className="fa fa-refresh"></i>
                Refresh
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setIsShowModalUser(true);
                  setActionModalUser("CREATE");
                }}
              >
                <i className="fa fa-plus-circle"></i>
                Add new user
              </button>
            </div>
          </div>
          <div className="user-body">
            <table className="table table-bordered table-hover">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Id</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Username</th>
                  <th scope="col">Group</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {listUsers && listUsers.length > 0 ? (
                  <>
                    {listUsers.map((item, index) => {
                      return (
                        <tr key={`row-${index}`}>
                          <th scope="row">
                            {(currentPage - 1) * currentLimit + index + 1}
                          </th>
                          <td>{item.id}</td>
                          <td>{item.email}</td>
                          <td>{item.phone}</td>
                          <td>{item.username}</td>
                          <td>{item.Group ? item.Group.name : ""}</td>
                          <td>
                            <span
                              title="Edit"
                              className="edit"
                              onClick={() => handleEditUser(item)}
                            >
                              <i className="fa fa-pencil"></i>
                            </span>
                            <span
                              title="Delete"
                              className="delete"
                              onClick={() => handleDeleteUser(item)}
                            >
                              <i className="fa fa-trash"></i>
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </>
                ) : (
                  <tr>
                    <th>
                      <span>Not found User</span>
                    </th>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="user-footer">
              {totalPages > 0 && (
                <ReactPaginate
                  nextLabel="next >"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={3}
                  marginPagesDisplayed={3}
                  pageCount={totalPages}
                  previousLabel="< previous"
                  pageClassName="page-item"
                  pageLinkClassName="page-link"
                  previousClassName="page-item"
                  previousLinkClassName="page-link"
                  nextClassName="page-item"
                  nextLinkClassName="page-link"
                  breakLabel="..."
                  breakClassName="page-item"
                  breakLinkClassName="page-link"
                  containerClassName="pagination"
                  activeClassName="active"
                  renderOnZeroPageCount={null}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <ModalDelete
        show={isShowModalDelete}
        handleClose={handleCloseModalDelete}
        dataModalDelete={dataModalDelete}
      />
      <ModalUser
        onHide={handleCloseModalUser}
        show={isShowModalUser}
        action={actionModalUser}
        dataModalUser={dataModalUser}
      />
    </>
  );
}

export default User;
