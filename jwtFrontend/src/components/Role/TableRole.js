import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { fetchAllRoles, deleteRole } from "../../services/roleService";
import { toast } from "react-toastify";
const TableRole = forwardRef((props, ref) => {
  const [listRoles, setListRoles] = useState([]);

  useEffect(() => {
    getAllRole();
  }, []);

  useImperativeHandle(ref, () => ({
    fetchListRolesAgain() {
      getAllRole();
    },
  }));

  const getAllRole = async () => {
    let res = await fetchAllRoles();
    if (res && +res.EC === 0) {
      setListRoles(res.DT);
    }
  };
  const handleDeleteRole = async (role) => {
    let data = await deleteRole(role);
    if (data && +data.EC === 0) {
      toast.success(data.EM);
      await getAllRole();
    }
  };
  return (
    <table class="table table-bordered table-hover">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">URL</th>
          <th scope="col">DESCRIPTION</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {listRoles && listRoles.length > 0 ? (
          <>
            {listRoles.map((item, index) => {
              return (
                <tr key={`row-${index}`}>
                  <th>{item.id}</th>
                  <td>{item.url}</td>
                  <td>{item.description}</td>
                  <td>
                    <span
                      title="Edit"
                      className="edit"
                      //   onClick={() => handleEditUser(item)}
                    >
                      <i className="fa fa-pencil"></i>
                    </span>
                    <span
                      title="Delete"
                      className="delete"
                      onClick={() => handleDeleteRole(item)}
                    >
                      <i className="fa fa-trash"></i>
                    </span>
                  </td>
                </tr>
              );
            })}
          </>
        ) : (
          <>Not found</>
        )}
      </tbody>
    </table>
  );
});

export default TableRole;
