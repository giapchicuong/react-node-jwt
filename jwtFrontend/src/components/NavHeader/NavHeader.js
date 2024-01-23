import React, { useContext } from "react";
import "./navHeader.scss";
import { NavLink, Link, useLocation, useHistory } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../../assets/logo.png";
import { logoutUser } from "../../services/userService";
import { toast } from "react-toastify";
function NavHeader() {
  const { user, logoutContext } = useContext(UserContext);
  const location = useLocation();
  const history = useHistory();

  const handleLogout = async () => {
    const response = await logoutUser(); // clear cookie
    if (response && +response.EC === 0) {
      localStorage.removeItem("jwt"); // clear localStorage
      logoutContext(); // clear user in context
      toast.success(response.EM);
      history.push("/login");
    } else {
      toast.error(response.EM);
    }
  };

  if (
    (user && user.isAuthenticated) ||
    location.pathname === "/" ||
    location.pathname === "/about"
  ) {
    return (
      <>
        <div className="nav-header">
          <Navbar expand="lg" bg="header">
            <Container>
              <Navbar.Brand href>
                <img
                  src={logo}
                  width="50"
                  height="30"
                  className="d-inline-block align-top"
                  alt="logo"
                />
                <span className="brand-name px-3">React</span>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <NavLink to="/" exact className="nav-link">
                    Home
                  </NavLink>
                  <NavLink to="/users" className="nav-link">
                    Users
                  </NavLink>
                  <NavLink to="/roles" className="nav-link">
                    Roles
                  </NavLink>
                  <NavLink to="/group-role" className="nav-link">
                    Group Role
                  </NavLink>
                  <NavLink to="/projects" className="nav-link">
                    Projects
                  </NavLink>
                  <NavLink to="/about" className="nav-link">
                    About
                  </NavLink>
                </Nav>
                <Nav>
                  {user && user.isAuthenticated ? (
                    <>
                      <Nav.Item exact className="nav-link">
                        Welcome {user.account.username} !
                      </Nav.Item>
                      <NavDropdown title="Settings" id="basic-nav-dropdown">
                        <NavDropdown.Item>Change Password</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item>
                          <span onClick={() => handleLogout()}> Logout</span>
                        </NavDropdown.Item>
                      </NavDropdown>
                    </>
                  ) : (
                    <Link to="/login" exact className="nav-link">
                      Login
                    </Link>
                  )}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
      </>
    );
  } else {
    return <></>;
  }
}

export default NavHeader;
