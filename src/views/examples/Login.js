import { NavLink, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BASE_URL } from "utils";
import { useDispatch } from "react-redux";
import { logout, setUserData } from "../../redux/initSlice";

const Login = () => {
  const [email, setEmail] = useState("giannisfragoulis21@gmail.com"); // Email state
  const [password, setPassword] = useState("kali1"); // Password state
  const [loading, setLoading] = useState(false); // Loading state for submit button
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate(); // Use navigate hook to programmatically redirect
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logout());
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);

    if (!email || !password) {
      toast.error("Παρακαλώ συμπληρώστε όλα τα πεδία!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(BASE_URL + "login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        dispatch(
          setUserData({
            firstName: data.user.name,
            lastName: data.user.surname,
            phone: data.user.phone,
            email: data.user.email,
            password: data.user.password,
            imageUrl: data.user.avatar,
          })
        );
        navigate("/admin/index");
      } else {
        toast.error(data.message || "Σφάλμα κατά τη σύνδεση!");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Κάτι πήγε στραβά. Προσπαθήστε ξανά!");
    } finally {
      setLoading(false); // Hide loader
    }
  };

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Συνδέσου με email και κωδικό</small>
            </div>
            <Form role="form" onSubmit={handleSubmit}>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    autoComplete="new-email"
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
                    placeholder="Κωδικός"
                    type={showPassword ? "text" : "password"} // Toggle password visibility
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
              </FormGroup>
              <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id="customCheckLogin"
                  type="checkbox"
                />
                <label
                  className="custom-control-label"
                  htmlFor="customCheckLogin"
                >
                  <span className="text-muted">Θυμήσου με</span>
                </label>
              </div>
              <div className="text-center">
                <Button
                  className="my-4"
                  color="primary"
                  type="submit"
                  disabled={loading} // Disable button while loading
                >
                  {loading ? (
                    <span className="spinner-border spinner-border-sm"></span> // Show loading spinner
                  ) : (
                    "Σύνδεση"
                  )}
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col className="text-right">
            {/* Link to Register page */}
            <NavLink to="/auth/register" className="text-light">
              <small>Δημιουργία νέου λογαριασμού</small>
            </NavLink>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Login;
