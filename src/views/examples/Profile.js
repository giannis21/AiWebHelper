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
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setAboutBusiness,
  setAddress,
  setCity,
  setCountry,
  setEmail,
  setFirstName,
  setLastName,
  setPhone,
  setPostalCode,
  setUsername,
} from "../../redux/initSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const {
    userData,
    userData: { firstName, lastName, imageBase64 },
  } = useSelector((state) => state.initReducer);

  const onSubmit = async () => {
    console.log({ userData });
    return;

    // try {
    //   const response = await fetch("https://your-backend-url/api/register", {
    //     method: "POST",
    //     body: formData,
    //   });
    //   const data = await response.json();

    //   if (response.ok) {
    //     // Handle successful registration
    //   } else {
    //     // Handle errors
    //   }
    // } catch (error) {
    //   console.error("Error during registration:", error);
    // }
  };

  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={imageBase64}
                      />
                    </a>
                  </div>
                </Col>
              </Row>

              <CardBody className="pt-0 pt-md-4">
                <div className="text-center">
                  <div style={{ height: 140 }} />
                  <hr className="my-4" />
                  <p>
                    businessBuddy: Ο μελλοντικός καλύτερος σου φίλος είναι εδώ.
                    Για οτιδήποτε χρειαστείς επικοινώνησε μαζί μας.
                  </p>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Ο λογαριασμός μου</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={onSubmit}
                      size="sm"
                    >
                      Υποβολή επεξεργασίας
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    User information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Κινητό τηλέφωνο
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-username"
                            placeholder="Κινητό τηλέφωνο"
                            type="text"
                            value={userData.phone}
                            onChange={(e) => dispatch(setPhone(e.target.value))}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Email
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-email"
                            placeholder="Διεύθυνση email"
                            type="email"
                            value={userData.email}
                            onChange={(e) => dispatch(setEmail(e.target.value))}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            Όνομα
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-first-name"
                            placeholder="Όνομα"
                            type="text"
                            value={userData.firstName}
                            onChange={(e) =>
                              dispatch(setFirstName(e.target.value))
                            }
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Επώνυμο
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-last-name"
                            placeholder="Επώνυμο"
                            type="text"
                            value={userData.lastName}
                            onChange={(e) =>
                              dispatch(setLastName(e.target.value))
                            }
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  <h6 className="heading-small text-muted mb-4">
                    Πληροφορίες επιχείρησης
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-address"
                          >
                            Διεύθυνση
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-address"
                            placeholder="Διεύθυνση επιχείρησης"
                            type="text"
                            value={userData.address}
                            onChange={(e) =>
                              dispatch(setAddress(e.target.value))
                            }
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-city"
                          >
                            Πόλη
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-city"
                            placeholder="Πόλη"
                            type="text"
                            value={userData.city}
                            onChange={(e) => dispatch(setCity(e.target.value))}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-country"
                          >
                            Χώρα
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-country"
                            placeholder="Χώρα"
                            type="text"
                            value={userData.country}
                            onChange={(e) =>
                              dispatch(setCountry(e.target.value))
                            }
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-postal-code"
                          >
                            Ταχυδρομικός κώδικας
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-postal-code"
                            placeholder="Ταχυδρομικός κώδικας"
                            type="number"
                            value={userData.postalCode}
                            onChange={(e) =>
                              dispatch(setPostalCode(e.target.value))
                            }
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  <h6 className="heading-small text-muted mb-4">Σχετικά</h6>
                  <div className="pl-lg-4">
                    <FormGroup>
                      <label>Σχετικά με την επιχείρηση</label>
                      <Input
                        className="form-control-alternative"
                        placeholder="λίγα για την επιχείρηση.."
                        rows="4"
                        type="textarea"
                        value={userData?.aboutBusiness}
                        onChange={(e) =>
                          dispatch(setAboutBusiness(e.target.value))
                        }
                      />
                    </FormGroup>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
