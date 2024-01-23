import React, { useRef, useState } from "react";
import "./role.scss";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import { createRoles } from "../../services/roleService";
import { toast } from "react-toastify";
import TableRole from "./TableRole";
function Role() {
  const dataChildDefault = {
    url: "",
    description: "",
    isValidUrl: true,
  };
  const childRef = useRef();
  const [listChilds, setListChilds] = useState({ child1: dataChildDefault });

  const handleOnchangeInput = (nameInput, value, key) => {
    let _listChilds = _.cloneDeep(listChilds);
    _listChilds[key][nameInput] = value;

    if (value && nameInput === "url") {
      _listChilds[key]["isValidUrl"] = true;
    }
    setListChilds(_listChilds);
  };

  const handleAddNewInput = () => {
    let _listChilds = _.cloneDeep(listChilds);
    _listChilds[`child-${uuidv4()}`] = dataChildDefault;
    setListChilds(_listChilds);
  };
  const handleUpdateInput = () => {
    let _listChilds = _.cloneDeep(listChilds);
    // _listChilds[`child-${uuidv4()}`] = dataChildDefault;
    console.log(_listChilds)
    // setListChilds(_listChilds);
  };

  const handleDeleteInput = (key) => {
    let _listChilds = _.cloneDeep(listChilds);
    delete _listChilds[key];
    setListChilds(_listChilds);
  };

  const buildDataToPersist = () => {
    let _listChilds = _.cloneDeep(listChilds);
    let result = [];
    Object.entries(_listChilds).map(([key, child], index) => {
      result.push({
        url: child.url,
        description: child.description,
      });
    });
    return result;
  };

  const handleSave = async () => {
    let inValidObj = Object.entries(listChilds).find(
      ([key, child], index) => child && !child.url
    );

    if (!inValidObj) {
      let data = buildDataToPersist();
      let res = await createRoles(data);
      if (res && res.EC === 0) {
        toast.success(res.EM);
        childRef.current.fetchListRolesAgain();
      }
    } else {
      toast.error("Input URL must not be empty...");
      let _listChilds = _.cloneDeep(listChilds);
      const key = inValidObj[0];
      _listChilds[key]["isValidUrl"] = false;
      setListChilds(_listChilds);
    }
  };
  return (
    <div>
      <div className="roles-container">
        <div className="container">
          <div className="adding-roles mt-3">
            <div className="title-role">
              <h4>Add new role ...</h4>
            </div>
            <div className="role-parent">
              {Object.entries(listChilds).map(([key, child], index) => {
                return (
                  <div className="row role-child" key={`child-${key}`}>
                    <div className={`col-5 form-group ${key}`}>
                      <label>URL:</label>
                      <input
                        type="text"
                        className={
                          child.isValidUrl
                            ? "form-control"
                            : "form-control is-invalid"
                        }
                        value={child.url}
                        onChange={(e) =>
                          handleOnchangeInput("url", e.target.value, key)
                        }
                      />
                    </div>
                    <div className={`col-5 form-group ${key}`}>
                      <label>Description:</label>
                      <input
                        type="text"
                        className="form-control"
                        value={child.description}
                        onChange={(e) =>
                          handleOnchangeInput(
                            "description",
                            e.target.value,
                            key
                          )
                        }
                      />
                    </div>
                    <div className="col-2 mt-4 actions">
                      <i
                        class="fa fa-plus-circle add"
                        onClick={() => handleAddNewInput()}
                      ></i>
                      {index >= 1 && (
                        <i
                          class="fa fa-trash-o delete"
                          onClick={() => handleDeleteInput(key)}
                        ></i>
                      )}
                    </div>
                  </div>
                );
              })}
              <div
                className="btn btn-warning mt-3"
                onClick={() => handleSave()}
              >
                Save
              </div>
            </div>
          </div>
          <div className="mt-3 table-role">
            <h4>List Current Roles:</h4>
            <TableRole ref={childRef} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Role;
