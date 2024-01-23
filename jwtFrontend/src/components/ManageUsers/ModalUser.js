import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import {
  createNewUser,
  fetchAllGroup,
  updateCurrentUser,
} from "../../services/userService";
import { toast } from "react-toastify";
function ModalUser(props) {
  const { action, dataModalUser } = props;

  const [userGroups, setUserGroups] = useState([]);

  const defaultUserData = {
    email: "",
    phone: "",
    username: "",
    password: "",
    address: "",
    sex: "Male",
    group: "",
  };
  const [userData, setUserData] = useState(defaultUserData);
  const defaultValidInput = {
    email: true,
    phone: true,
    username: true,
    password: true,
    address: true,
    sex: true,
    group: true,
  };
  const [objCheckInput, setObjCheckInput] = useState(defaultValidInput);
  const isValidInputs = () => {
    if (action === "UPDATE") return true;

    setObjCheckInput(defaultValidInput);
    let regx = /^\S+@\S+\.\S+$/;
    if (!regx.test(userData.email)) {
      toast.error("Please enter a valid email address");
      setObjCheckInput({ ...defaultValidInput, email: false });
      return false;
    }
    let arr = [
      "email",
      "phone",
      "username",
      "password",
      "address",
      "sex",
      "group",
    ];
    for (let i = 0; i < arr.length; i++) {
      setObjCheckInput(defaultValidInput);
      if (!userData[arr[i]]) {
        toast.error(`${arr[i]} is required`);
        setObjCheckInput({ ...defaultValidInput, [arr[i]]: false });
        return false;
      }
    }
    return true;
  };
  // Fetch Groups
  useEffect(() => {
    fetchGroups();
  }, []);

  // Fetch Data Modal
  useEffect(() => {
    if (action === "UPDATE") {
      setUserData({
        ...dataModalUser,
        group: dataModalUser.Group ? dataModalUser.Group.id : "",
      });
    }
  }, [dataModalUser]);

  useEffect(() => {
    if (action === "CREATE") {
      if (userGroups && userGroups.length > 0) {
        setUserData({ ...userData, group: userGroups[0].id });
      }
    }
  }, [action]);

  const fetchGroups = async () => {
    let res = await fetchAllGroup();
    if (res && res.EC === 0) {
      setUserGroups(res.DT);
      if (res.DT && res.DT.length > 0) {
        let groups = res.DT;
        setUserData({ ...userData, group: groups[0].id });
      }
    } else {
      toast.error(res.EM);
    }
  };
  const handleConfirmUser = async () => {
    let check = isValidInputs();

    if (check) {
      let res =
        action === "CREATE"
          ? await createNewUser({
              ...userData,
              groupId: userData["group"],
            })
          : await updateCurrentUser({
              ...userData,
              groupId: userData["group"],
            });
      let serverData = res;
      if (serverData.EC === 0) {
        toast.success(serverData.EM);
        props.onHide();
        setUserData({
          ...defaultUserData,
          group: userGroups && userGroups.length > 0 ? userGroups[0].id : "",
        });
      } else {
        toast.error(serverData.EM);
        setObjCheckInput({ ...defaultValidInput, [serverData.DT]: false });
      }
    }
  };

  const handleCloseModalUser = () => {
    props.onHide();
    setUserData(defaultUserData);
    setObjCheckInput(defaultValidInput);
  };
  return (
    <Modal
      size="lg"
      show={props.show}
      onHide={() => handleCloseModalUser()}
      className="modal-user"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {props.action === "CREATE" ? "Create New User" : "Edit a user"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="content-body row">
          <div className="col-sm-6 col-12 form-group">
            <label>
              Email address (<span className="red">*</span>) :
            </label>
            <input
              type="text"
              className={
                objCheckInput.email ? "form-control" : "form-control is-invalid"
              }
              value={userData.email}
              onChange={(e) => {
                setUserData({ ...userData, email: e.target.value });
              }}
              disabled={action === "CREATE" ? false : true}
            />
          </div>
          <div className="col-sm-6 col-12 form-group">
            <label>
              Phone number (<span className="red">*</span>) :
            </label>
            <input
              type="text"
              className={
                objCheckInput.phone ? "form-control" : "form-control is-invalid"
              }
              value={userData.phone}
              onChange={(e) =>
                setUserData({ ...userData, phone: e.target.value })
              }
              disabled={action === "CREATE" ? false : true}
            />
          </div>
          <div className="col-sm-6 col-12 form-group">
            <label>
              Username (<span className="red">*</span>) :
            </label>
            <input
              type="text"
              className={
                objCheckInput.username
                  ? "form-control"
                  : "form-control is-invalid"
              }
              value={userData.username}
              onChange={(e) =>
                setUserData({ ...userData, username: e.target.value })
              }
            />
          </div>
          <div className="col-sm-6 col-12 form-group">
            {action === "CREATE" && (
              <>
                <label>
                  Password (<span className="red">*</span>) :
                </label>
                <input
                  type="password"
                  className={
                    objCheckInput.password
                      ? "form-control"
                      : "form-control is-invalid"
                  }
                  value={userData.password}
                  onChange={(e) =>
                    setUserData({ ...userData, password: e.target.value })
                  }
                />
              </>
            )}
          </div>
          <div className="col-12 form-group">
            <label>
              Address (<span className="red">*</span>) :
            </label>
            <input
              type="text"
              className={
                objCheckInput.address
                  ? "form-control"
                  : "form-control is-invalid"
              }
              value={userData.address}
              onChange={(e) =>
                setUserData({ ...userData, address: e.target.value })
              }
            />
          </div>
          <div className="col-sm-6 col-12 form-group">
            <label>
              Sex (<span className="red">*</span>) :
            </label>
            <select
              className={
                objCheckInput.sex ? "form-select" : "form-select is-invalid"
              }
              aria-label="Default select example"
              onChange={(e) =>
                setUserData({ ...userData, sex: e.target.value })
              }
              value={userData.sex}
            >
              <option defaultValue="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="col-sm-6 col-12 form-group">
            <label>
              Group (<span className="red">*</span>) :
            </label>
            <select
              className={
                objCheckInput.group ? "form-select" : "form-select is-invalid"
              }
              aria-label="Default select example"
              value={userData.group}
              onChange={(e) =>
                setUserData({ ...userData, group: e.target.value })
              }
            >
              {userGroups.length > 0 &&
                userGroups.map((item, index) => (
                  <option key={`group-${index}`} value={item.id}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => handleCloseModalUser()}>
          Close
        </Button>
        <Button variant="primary" onClick={() => handleConfirmUser()}>
          {action === "CREATE" ? "Save" : "Update"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalUser;
