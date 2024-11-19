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
import {
  addUser,
  removeUser,
  updateUserStatus,
  setStaff,
  editUser,
} from "../../redux/initSlice";
import { BASE_URL } from "utils";
import { toast } from "react-toastify";

const Tables = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState(false);
  const [openConfirmationModal, setOpenConfirmationModal] =
    React.useState(false);
  const {
    userData,
    userData: { email },
  } = useSelector((state) => state.initReducer);
  const { searchValue, users } = useSelector((state) => state.initReducer);

  useEffect(() => {
    // Fetch business data when component mounts or email changes
    const fetchStaff = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}get-staff?adminEmail=${encodeURIComponent(email)}`,
          {
            method: "GET",
          }
        );
        const data = await response.json();

        if (response.ok) {
          if (data.staff) {
            dispatch(setStaff(data.staff));
          } else {
            // If no business data exists, you can set default values
          }
        } else {
          toast.error(data.message || "Error fetching business data");
        }
      } catch (error) {
        toast.error("Error fetching business data");
        console.error("Error fetching business data:", error);
      }
    };

    email && users?.length === 0 && fetchStaff();
  }, [email, dispatch]);

  const filteredData =
    searchValue === ""
      ? users
      : users.filter((item) =>
          item.fullName?.toLowerCase().includes(searchValue?.toLowerCase())
        );

  const handleRemoveUser = async (email) => {
    try {
      const response = await fetch(
        `${BASE_URL}delete-staff?adminEmail=${encodeURIComponent(email)}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();

      if (response.ok) {
        dispatch(removeUser(email));
        setCurrentUser(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {}
  };

  const toggleUserStatus = async (email, status) => {
    try {
      const response = await fetch(
        `${BASE_URL}update-staff-status?email=${encodeURIComponent(
          email
        )}&status=${encodeURIComponent(
          status == "active" ? "inactive" : "active"
        )}`,
        {
          method: "PUT",
        }
      );
      const data = await response.json();

      if (response.ok) {
        dispatch(updateUserStatus(email));
      } else {
        toast.error(data.message);
      }
    } catch (error) {}
  };

  const onAddUser = async (user) => {
    try {
      const response = await fetch(BASE_URL + "add-staff", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...user, adminEmail: email, status: "active" }),
      });

      if (!response.ok) {
        const errorMessage = await response.json();

        toast.error("Error adding user: " + errorMessage.message);
        return;
      }
      const data = await response.json();

      dispatch(addUser({ ...user, avatar: data.avatarFilePath }));
    } catch (error) {
      toast.error("Error adding user: " + error.message);
    }
  };
  const onEditUser = async (user) => {
    try {
      const response = await fetch(BASE_URL + "update-staff", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user }),
      });

      if (!response.ok) {
        const errorMessage = await response.json();

        toast.error("Error adding user: " + errorMessage.message);
        return;
      }
      const data = await response.json();
      console.log({ data: data.avatarFilePath });
      dispatch(editUser({ ...user, avatar: data.avatarFilePath }));
    } catch (error) {
      toast.error("Error adding user: " + error.message);
    }
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
                <h3 className="mb-0">Πρόσβαση χρηστών</h3>
                <div style={{ width: "14px" }} />
                <Col className="text-right" xs="4">
                  <Button
                    onClick={() => setOpen(true)}
                    color="primary"
                    href="#pablo"
                    size="sm"
                  >
                    {"Προσθήκη χρήστη"}
                  </Button>
                </Col>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">ονομα</th>
                    <th scope="col">Τηλεφωνο</th>
                    <th scope="col">Email</th>
                    <th scope="col">Κατασταση</th>
                    <th scope="col">Group id</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {filteredData?.length > 0 ? (
                    filteredData?.map((item) => {
                      console.log(
                        `${BASE_URL}${item?.avatar}?t=${new Date().getTime()}`
                      );
                      return (
                        <tr>
                          <th scope="row">
                            <Media className="align-items-center">
                              <a
                                className="avatar rounded-circle mr-3"
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                                style={{ width: "70px", height: "70px" }}
                              >
                                <img
                                  alt="..."
                                  style={{ width: "70px", height: "70px" }}
                                  src={
                                    item?.avatar
                                      ? `${BASE_URL}${
                                          item?.avatar
                                        }?t=${new Date().getTime()}`
                                      : require("../../assets/img/theme/bootstrap.jpg")
                                  }
                                />
                              </a>
                              <Media>
                                <span className="mb-0 text-sm">
                                  {item?.firstName
                                    ? item.firstName + " " + item.lastName
                                    : item?.name + " " + item.surname}
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
                              {item.groupId}
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
                                    toggleUserStatus(item.email, item.status)
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
                    onEditUser={onEditUser}
                  />

                  <ConfirmationDialog
                    onSubmit={() => handleRemoveUser(currentUser?.email)}
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
