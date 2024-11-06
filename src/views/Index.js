/*!

=========================================================
* Argon Dashboard React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
  Col,
  Button,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import FormDialog from "components/modals/FormDialog";
import React, { useEffect } from "react";
import ConfirmationDialog from "components/modals/ConfirmationDialog";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser, updateUserStatus } from "../redux/initSlice";

const Tables = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState(false);
  const [openConfirmationModal, setOpenConfirmationModal] =
    React.useState(false);

  const { searchValue, users } = useSelector((state) => state.initReducer);

  // const [data, setData] = React.useState([
  //   {
  //     firstName: "Giannis",
  //     lastName: "Fragoulis",
  //     image: "url",
  //     phone: "6989228933",
  //     email: "giannis@gmail.com",
  //     status: "active",
  //     uniqueId: "password0!",
  //   },
  //   {
  //     firstName: "Giannis",
  //     lastName: "Fragoulis",
  //     image: "url",
  //     phone: "6989228933",
  //     email: "giannis@gmail.com",
  //     status: "inactive",
  //     uniqueId: "password1!",
  //   },
  //   {
  //     firstName: "Kostas",
  //     lastName: "Papadopoylos",
  //     image: "url",
  //     phone: "6989228933",
  //     email: "giannis@gmail.com",
  //     status: "active",
  //     uniqueId: "password2!",
  //   },
  //   // More users can be added here
  // ]);

  const filteredData =
    searchValue === ""
      ? users
      : users.filter((item) =>
          item.fullName?.toLowerCase().includes(searchValue?.toLowerCase())
        );

  const handleRemoveUser = (uniqueId) => {
    dispatch(removeUser(uniqueId));
    setCurrentUser(null);
  };

  const toggleUserStatus = (uniqueId) => {
    dispatch(updateUserStatus(uniqueId));
  };

  const onAddUser = (user) => {
    dispatch(addUser(user));
  };
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader
                className="border-0"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h3 className="mb-0">Προσθήκη αρχείων</h3>
                <div style={{ width: "14px" }} />
                <Col className="text-right" xs="4">
                  <Button
                    onClick={() => setOpen(true)}
                    color="primary"
                    href="#pablo"
                    size="sm"
                  >
                    {"Προσθήκη αρχείου"}
                  </Button>
                </Col>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Αρχεία (pdf,word,text)</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData?.length > 0 ? (
                    filteredData?.map((item) => {
                      return (
                        <tr>
                          <th scope="row">
                            <Media className="align-items-center">
                              <a
                                className="avatar rounded-circle mr-3"
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                              >
                                <img
                                  alt="..."
                                  src={
                                    item?.image ||
                                    require("../assets/img/theme/bootstrap.jpg")
                                  }
                                />
                              </a>
                              <Media>
                                <span className="mb-0 text-sm">
                                  {item.firstName + " " + item.lastName}
                                </span>
                              </Media>
                            </Media>
                          </th>
                          <td>{item?.phone}</td>
                          <td>
                            <Badge color="" className="badge-dot mr-4">
                              {item.email}
                            </Badge>
                          </td>
                          <td>
                            <Badge
                              color={
                                item.status == "active" ? "white" : "black"
                              }
                              style={{
                                fontSize: "15px",
                                fontWeight: "bold",
                                backgroundColor:
                                  item.status == "active"
                                    ? "#12BDEF"
                                    : "#e0dede",
                                padding: "6px",
                              }}
                              className="badge-dot mr-4"
                            >
                              {item.status}
                            </Badge>
                          </td>
                          <td>
                            <Badge
                              color="black"
                              style={{}}
                              className="badge-dot mr-4"
                            >
                              {item.uniqueId}
                            </Badge>
                          </td>

                          <td className="text-right">
                            <UncontrolledDropdown>
                              <DropdownToggle
                                className="btn-icon-only text-light"
                                href="#pablo"
                                role="button"
                                size="large"
                                color="black"
                              >
                                <i
                                  style={{ color: "black" }}
                                  className="fas fa-ellipsis-v"
                                />
                              </DropdownToggle>
                              <DropdownMenu
                                className="dropdown-menu-arrow"
                                right
                              >
                                <DropdownItem
                                  href="#pablo"
                                  onClick={(e) => {
                                    setCurrentUser(item);
                                    setOpen(true);
                                  }}
                                >
                                  Επεξεργασία χρήστη
                                </DropdownItem>
                                <DropdownItem
                                  href="#pablo"
                                  onClick={(e) => {
                                    setCurrentUser(item);
                                    setOpenConfirmationModal(true);
                                  }}
                                >
                                  Αφαίρεση χρήστη
                                </DropdownItem>
                                <DropdownItem
                                  href="#pablo"
                                  onClick={(e) =>
                                    toggleUserStatus(item.uniqueId)
                                  }
                                >
                                  {item.status == "active"
                                    ? "Απενεργοποίηση πρόσβασης"
                                    : "Ενεργοποίηση πρόσβασης"}
                                </DropdownItem>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <div
                      style={{
                        justifyContent: "center",
                        width: "250%",

                        display: "flex",
                      }}
                      className="text-center"
                    >
                      <div style={{ height: 200 }} />

                      <p style={{ alignSelf: "center" }}>
                        Δώσε πρόσβαση στους εργαζομένους και αύξησε την
                        <br />
                        παραγωγικότητα της δουλείας σου!!
                      </p>
                    </div>
                  )}
                  <FormDialog
                    user={currentUser}
                    setOpen={(val) => {
                      setCurrentUser(null);
                      setOpen(val);
                    }}
                    open={open}
                    onSubmitUser={onAddUser}
                  />

                  <ConfirmationDialog
                    onSubmit={() => handleRemoveUser(currentUser?.uniqueId)}
                    setOpenConfirmationModal={setOpenConfirmationModal}
                    openConfirmationModal={openConfirmationModal}
                  />
                </tbody>
              </Table>
              {/* <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter> */}
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Tables;
