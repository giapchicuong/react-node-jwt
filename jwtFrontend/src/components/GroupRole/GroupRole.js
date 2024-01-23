import React, { useEffect, useState } from "react";
import "./groupRole.scss";
import {
  fetchRoleByGroup,
  fetchAllRoles,
  assignRolesToGroup,
} from "../../services/roleService";
import { fetchAllGroup } from "../../services/userService";
import { toast } from "react-toastify";
import _ from "lodash";
const GroupRole = () => {
  const [userGroups, setUserGroups] = useState([]);
  const [listRoles, setListRoles] = useState([]);
  const [assignRolesByGroup, setAssignRolesByGroup] = useState([]);
  const [selectGroup, setSelectGroup] = useState("");

  useEffect(() => {
    getGroup();
    getAllRoles();
  }, []);

  const getGroup = async () => {
    let res = await fetchAllGroup();
    if (res && +res.EC === 0) {
      setUserGroups(res.DT);
    } else {
      toast.error(res.EM);
    }
  };

  const getAllRoles = async () => {
    let res = await fetchAllRoles();
    if (res && +res.EC === 0) {
      setListRoles(res.DT);
    } else {
      toast.error(res.EM);
    }
  };

  const handleOnchangeGroup = async (value) => {
    setSelectGroup(value);
    if (value) {
      let res = await fetchRoleByGroup(value);
      if (res && res.EC === 0) {
        let result = buildDataRolesByGroup(res.DT.Roles, listRoles);
        setAssignRolesByGroup(result);
      }
    }
  };

  // const buildDataRolesByGroup = (groupRoles, allRoles) => {
  //   let result = [];

  //   if (allRoles && allRoles.length > 0) {
  //     allRoles.map((role) => {
  //       let object = {};
  //       object.id = role.id;
  //       object.url = role.url;
  //       object.description = role.description;
  //       object.isAssigned = false;
  //       if (groupRoles && groupRoles.length > 0) {
  //         object.isAssigned = groupRoles.some(
  //           (item) => item.url === object.url
  //         );
  //       }
  //       result.push(object);
  //     });
  //   }
  //   return result;
  // };
  const buildDataRolesByGroup = (groupRoles, allRoles) => {
    return allRoles.map((role) => ({
      ...role,
      isAssigned: groupRoles.some((item) => item.url === role.url),
    }));
  };

  // const handleSelectRole = (value) => {
  //   const _assignRolesByGroup = _.cloneDeep(assignRolesByGroup);
  //   let foundIndex = _assignRolesByGroup.findIndex(
  //     (item) => +item.id === +value
  //   );
  //   if (foundIndex > -1) {
  //     _assignRolesByGroup[foundIndex].isAssigned =
  //       !_assignRolesByGroup[foundIndex].isAssigned;
  //   }
  //   setAssignRolesByGroup(_assignRolesByGroup);
  // };
  const handleSelectRole = (value) => {
    setAssignRolesByGroup((roles) =>
      roles.map((role) =>
        +role.id === +value ? { ...role, isAssigned: !role.isAssigned } : role
      )
    );
  };

  const buildDataToSave = () => {
    let result = {};
    const _assignRolesByGroup = _.cloneDeep(assignRolesByGroup);
    result.groupId = selectGroup;
    let groupRolesFilter = _assignRolesByGroup.filter(
      (item) => item.isAssigned === true
    );
    let finalGroupRoles = groupRolesFilter.map((item) => {
      let data = { groupId: +selectGroup, roleId: +item.id };
      return data;
    });
    result.groupRoles = finalGroupRoles;
    return result;
  };

  const handleSave = async () => {
    let data = buildDataToSave();
    let res = await assignRolesToGroup(data);
    if (res && res.EC === 0) {
      toast.success(res.EM);
    } else {
      toast.error(res.EM);
    }
  };

  return (
    <div className="group-role-container">
      <div className="container">
        <div className="mt-3">
          <h4>Group Role :</h4>
          <div className="assign-group-role">
            <div className="col-12 col-sm-6 form-group">
              <label>
                Select Group: (<span className="red">*</span>)
              </label>
              <select
                className="form-select"
                onChange={(e) => handleOnchangeGroup(e.target.value)}
              >
                <option value="">Please select your group</option>
                {userGroups.length > 0 &&
                  userGroups.map((item, index) => {
                    return (
                      <option key={`group-${index}`} value={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
              </select>
            </div>
            <hr />
            <div className="roles">
              {selectGroup && (
                <div className="roles">
                  <h4>Assign Roles:</h4>
                  {assignRolesByGroup &&
                    assignRolesByGroup.length > 0 &&
                    assignRolesByGroup.map((item, index) => {
                      return (
                        <div className="form-check" key={`list-role-${index}`}>
                          <input
                            type="checkbox"
                            className="form-check-input"
                            value={item.id}
                            id={`list-role-${index}`}
                            checked={item.isAssigned}
                            onChange={(e) => handleSelectRole(e.target.value)}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`list-role-${index}`}
                          >
                            {item.url}
                          </label>
                        </div>
                      );
                    })}
                  <div className="mt-3">
                    <button
                      className="btn btn-warning"
                      onClick={() => handleSave()}
                    >
                      Save
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupRole;
