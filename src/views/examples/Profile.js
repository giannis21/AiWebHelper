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
  setNewImage,
  setPhone,
  setPostalCode,
  setUsername,
} from "../../redux/initSlice";
import { BASE_URL } from "utils";
import { FileUploader } from "react-drag-drop-files";
import { toast } from "react-toastify";
import { useEffect } from "react";
const Profile = () => {
  const dispatch = useDispatch();
  const {
    userData,
    userData: { email, imageUrl, imageBase64 },
  } = useSelector((state) => state.initReducer);

  console.log({ userData });
  useEffect(() => {
    // Fetch business data when component mounts or email changes
    const fetchBusinessData = async () => {
      try {
        const response = await fetch(`${BASE_URL}business?email=${email}`);
        const data = await response.json();

        if (response.ok) {
          if (data.businessData) {
            // If business data exists, dispatch it to the Redux store
            dispatch(setAddress(data.businessData.address));
            dispatch(setCity(data.businessData.city));
            dispatch(setCountry(data.businessData.country));
            dispatch(setPostalCode(data.businessData.postCode));
            dispatch(setAboutBusiness(data.businessData.about));
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

    fetchBusinessData();
  }, [email, dispatch]);

  const convertImageToBase64 = async (file) => {
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        updateImage(reader.result);
        resolve();
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const updateImage = async (imageBase64) => {
    try {
      const response = await fetch(`${BASE_URL}update/avatar`, {
        // Adjust URL to your backend route
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, avatar: imageBase64 }),
      });

      const data = await response.json();

      if (response.ok) {
        dispatch(setNewImage(data.avatarUrl));
      } else {
        console.error(
          "Error updating profile:",
          data.message || "Unknown error"
        );
      }
    } catch (error) {
      console.error("Error during profile update:", error);
    }
  };

  const onSubmit = async () => {
    const payload = {
      email: userData.email,
      phone: userData.phone,
      firstName: userData.firstName,
      lastName: userData.lastName,
      address: userData.address,
      city: userData.city,
      country: userData.country,
      postalCode: userData.postalCode,
      aboutBusiness: userData.aboutBusiness,
    };

    try {
      const response = await fetch(`${BASE_URL}update/adminData`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
      } else {
        console.error(
          "Error updating profile:",
          data.message || "Unknown error"
        );
      }
    } catch (error) {
      console.error("Error during profile update:", error);
    }
  };

  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <FileUploader
                handleChange={convertImageToBase64}
                name="file"
                types={["JPG", "PNG"]}
              >
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    <div className="card-profile-image">
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        <img
                          alt="..."
                          className="rounded-circle"
                          src={`${
                            imageBase64 ? imageBase64 : `${BASE_URL}${imageUrl}`
                          }?t=${new Date().getTime()}`}
                        />
                      </a>
                    </div>
                  </Col>
                </Row>
              </FileUploader>
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
