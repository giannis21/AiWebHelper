import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Input,
  Spinner,
} from "reactstrap";
import { NavLink, useNavigate } from "react-router-dom"; // Import NavLink and useNavigate

import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import "../../assets/css/Register.css";

import { useDispatch } from "react-redux";
import { setUserData } from "../../redux/initSlice";
import { BASE_URL } from "utils";
import { toast } from "react-toastify";

const Register = () => {
  const [image, setImage] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [preview, setPreview] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password);

    if (password.length >= minLength) strength += 1;
    if (hasUpperCase) strength += 1;
    if (hasLowerCase) strength += 1;
    if (hasNumber) strength += 1;
    if (hasSpecialChar) strength += 1;

    if (strength === 0) return "";
    if (strength <= 2) return "weak";
    if (strength === 3 || strength === 4) return "medium";
    return "strong";
  };

  const convertImageToBase64 = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImageBase64(reader.result);
        resolve();
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleImageChange = (file) => {
    if (file) {
      setImage(file);
      convertImageToBase64(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handlePasswordChange = (password) => {
    setPassword(password);
    const strength = calculatePasswordStrength(password);
    setPasswordStrength(strength);
  };

  const handleRegistration = async () => {
    const payload = {
      name,
      surname: lastName,
      email,
      phone,
      password,
      avatar: imageBase64,
    };

    try {
      setLoading(true);
      const response = await fetch(BASE_URL + "register/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        navigate("/auth/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const canSubmit = name && lastName && phone && email && password && image;

  return (
    <>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Πρόσθεσε τα παρακάτω στοιχεία για την εγγραφή σου</small>
            </div>
            <Form role="form">
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-single-02" /> {/* Updated icon */}
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Όνομα"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-single-02" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Επώνυμο"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-mobile-button" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Κινητό"
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => handlePasswordChange(e.target.value)}
                  />
                  <InputGroupAddon addonType="append">
                    <InputGroupText
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      <i
                        className={
                          showPassword ? "fa fa-eye-slash" : "fa fa-eye"
                        }
                      />
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
                {passwordError && (
                  <div className="text-danger">{passwordError}</div>
                )}
              </FormGroup>
              <FormGroup className="mb-4">
                <FileUploader
                  handleChange={handleImageChange}
                  name="file"
                  types={["JPG", "PNG", "GIF"]}
                >
                  {preview ? (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <img
                        src={preview}
                        alt="Profile Preview"
                        className="preview-image"
                        style={{
                          maxWidth: "100%",
                          maxHeight: "100%",
                          objectFit: "contain",
                        }}
                      />
                    </div>
                  ) : (
                    <div style={{ textAlign: "center" }}>
                      <span>
                        Drag & drop your profile image here or click to select
                      </span>
                    </div>
                  )}
                </FileUploader>
              </FormGroup>
              <div className="text-muted font-italic">
                <small>
                  Ισχύς κωδικού:{" "}
                  <span
                    className={`font-weight-700 ${
                      passwordStrength === "strong"
                        ? "text-success"
                        : passwordStrength === "medium"
                        ? "text-warning"
                        : "text-danger"
                    }`}
                  >
                    {passwordStrength}
                  </span>
                </small>
              </div>
              <div className="text-center">
                <Button
                  className="mt-4"
                  color="primary"
                  type="button"
                  onClick={handleRegistration}
                  disabled={!canSubmit || loading}
                >
                  {loading ? (
                    <Spinner size="sm" color="light" />
                  ) : (
                    "Δημιουργία λογαριασμού"
                  )}
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col className="text-right">
            {/* Link to Register page */}
            <NavLink to="/auth/login" className="text-light">
              <small>Είσοδος</small>
            </NavLink>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Register;
