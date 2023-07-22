import { useState, useContext, useEffect } from "react";
import { CartContext } from "../../context/CartContext";
import { db } from "../../services/config";
import { collection, addDoc, updateDoc, doc, getDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Spinner,
  Button,
  Card,
  Form,
  InputGroup,
} from "react-bootstrap";

const Checkout = () => {
  const { cart, emptyCart, total, quantityTotal } = useContext(CartContext);
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [emailConfirmation, setEmailConfirmation] = useState("");
  const [isSameEmail, setIsSameEmail] = useState(true);
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [zip, setZip] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState("");
  const [orderId, setOrderId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    setIsSameEmail(emailConfirmation && email === emailConfirmation);
  }, [email, emailConfirmation]);

  const formHandler = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false || !isSameEmail) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
      return;
    }

    setIsLoading(true);

    const order = {
      items: cart.map((product) => ({
        id: product.item.id,
        name: product.item.name,
        quantity: product.quantity,
      })),
      orderTotal: total,
      orderQuantityTotal: quantityTotal,
      name,
      lastname,
      username,
      password,
      phonenumber,
      email,
      addressLine1,
      addressLine2,
      city,
      state,
      country,
      zip,
      agreeTerms,
      orderDate: new Date(),
    };

    Promise.all(
      order.items.map(async (productOrder) => {
        const productRef = doc(db, "products", productOrder.id);
        const productDoc = await getDoc(productRef);
        const currentStock = productDoc.data().stock;

        await updateDoc(productRef, {
          stock: currentStock - productOrder.quantity,
        });
      })
    )
      .then(() => {
        addDoc(collection(db, "orders"), order)
          .then((docRef) => {
            setOrderId(docRef.id);
            emptyCart();
            setIsLoading(false);
          })
          .catch((error) => {
            console.log("Error creating the order", error);
            setError("Error creating the order, try again later.");
            setIsLoading(false);
          });
      })
      .catch((error) => {
        console.log("Error updating the stock", error);
        setError("Error updating the stock, try again later.");
        setIsLoading(false);
      });
  };

  return (
    <>
      {isLoading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <Spinner animation="border" variant="danger" />
        </div>
      ) : (
        <>
          {error && (
            <>
              <Container fluid>
                <Row className="justify-content-md-center">
                  <Col xs={12} md={8}>
                    <br />
                    <Card>
                      <Card.Body>
                        <Card.Header>
                          <Card.Title>Error</Card.Title>
                        </Card.Header>
                        <Card.Body>
                          <Card.Text>
                            <h5>{error}</h5>
                          </Card.Text>
                        </Card.Body>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Container>
              <br />
              <Container fluid>
                <Row className="justify-content-md-center">
                  <Col xs={12} md={8} className="d-flex justify-content-center">
                    <div>
                      <Link to="/">
                        <Button variant="danger">Continue Shopping</Button>
                      </Link>
                    </div>
                  </Col>
                </Row>
              </Container>
            </>
          )}

          {orderId ? (
            <>
              <Container fluid>
                <Row className="justify-content-md-center">
                  <Col xs={12} md={8}>
                    <br />
                    <Card>
                      <Card.Body>
                        <Card.Header>
                          <Card.Title>Order confirmation</Card.Title>
                        </Card.Header>
                        <Card.Body>
                          <Card.Text>
                            <img
                              className="imgSeeDetails"
                              src={"/CompletedOrderActivePicture.png"}
                            />
                            <br />
                            <br />
                            <h5>
                              Your order was successful! Your order Id is:
                            </h5>
                          </Card.Text>
                          <Card.Text>
                            <strong>{orderId}</strong>
                          </Card.Text>
                        </Card.Body>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Container>
              <br />
              <Container fluid>
                <Row className="justify-content-md-center">
                  <Col xs={12} md={8} className="d-flex justify-content-center">
                    <div>
                      <Link to="/">
                        <Button variant="danger">Continue Shopping</Button>
                      </Link>
                    </div>
                  </Col>
                </Row>
              </Container>
              <br />
            </>
          ) : quantityTotal > 0 ? (
            <>
              <Container fluid>
                <Row className="justify-content-md-center">
                  <Col xs={12} md={8}>
                    <br />
                    <Card>
                      <Card.Body>
                        <Card.Header>
                          <Card.Title>Checkout</Card.Title>
                        </Card.Header>
                        <Card.Body>
                          <div className="container">
                            {cart.map((product) => (
                              <div key={product.item.id} className="row">
                                <div className="col-12 col-md-2">
                                  <Link to={`/item/${product.item.id}`}>
                                    <img
                                      className="imgCart"
                                      src={product.item.img[0]}
                                      alt={product.item.name}
                                    />
                                  </Link>
                                </div>
                                <div className="col-12 col-md-2">
                                  <Link to={`/item/${product.item.id}`}>
                                    {product.item.name}
                                  </Link>
                                </div>
                                <div className="col-12 col-md-2">
                                  ${product.item.price}
                                </div>
                                <div className="col-12 col-md-2">
                                  x {product.quantity}
                                </div>
                                <div className="col-12 col-md-2">
                                  $
                                  {Math.round(
                                    product.quantity * product.item.price * 100
                                  ) / 100}
                                </div>

                                <br />
                                <br />
                                <hr />
                                <br />
                              </div>
                            ))}
                            <div className="row">
                              <div className="col-12 col-md-2"></div>
                              <div className="col-12 col-md-2"></div>
                              <div className="col-12 col-md-2"></div>
                              <div className="col-12 col-md-2">
                                <b>Total Quantity: {quantityTotal}</b>
                              </div>
                              <div className="col-12 col-md-2">
                                <b>Total: ${total}</b>
                              </div>
                            </div>
                          </div>
                        </Card.Body>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Container>
              <br />
              <Container fluid>
                <Row className="justify-content-md-center">
                  <Col xs={12} md={8}>
                    <br />
                    <Card>
                      <Card.Body>
                        <Card.Header>
                          <Card.Title>
                            Please sign up to complete your order
                          </Card.Title>
                        </Card.Header>
                        <br />
                        <Form
                          noValidate
                          validated={validated}
                          onSubmit={formHandler}
                        >
                          <Row className="mb-3">
                            <Form.Group
                              as={Col}
                              md="3"
                              controlId="validationCustom01"
                            >
                              <Form.Label>First name</Form.Label>
                              <Form.Control
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                type="text"
                                placeholder="Enter first name"
                              />
                              <Form.Control.Feedback>
                                Looks good!
                              </Form.Control.Feedback>
                              <Form.Control.Feedback type="invalid">
                                Please enter your first name.
                              </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group
                              as={Col}
                              md="3"
                              controlId="validationCustom02"
                            >
                              <Form.Label>Last name</Form.Label>
                              <Form.Control
                                value={lastname}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                                type="text"
                                placeholder="Enter last name"
                              />
                              <Form.Control.Feedback>
                                Looks good!
                              </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group
                              as={Col}
                              md="3"
                              controlId="validationCustomUsername"
                            >
                              <Form.Label>Username</Form.Label>
                              <InputGroup hasValidation>
                                <InputGroup.Text id="inputGroupPrepend">
                                  @
                                </InputGroup.Text>
                                <Form.Control
                                  value={username}
                                  onChange={(e) => setUsername(e.target.value)}
                                  type="text"
                                  placeholder="Enter username"
                                  aria-describedby="inputGroupPrepend"
                                  required
                                />
                                <Form.Control.Feedback>
                                  Looks good!
                                </Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">
                                  Please choose a username.
                                </Form.Control.Feedback>
                              </InputGroup>
                            </Form.Group>

                            <Form.Group
                              as={Col}
                              md="3"
                              controlId="validationCustom01"
                            >
                              <Form.Label>Password</Form.Label>
                              <Form.Control
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                type="password"
                                placeholder="Enter password"
                              />
                              <Form.Control.Feedback>
                                Looks good!
                              </Form.Control.Feedback>
                              <Form.Control.Feedback type="invalid">
                                Please enter a password.
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Row>

                          <Row className="mb-3">
                            <Form.Group
                              as={Col}
                              md="4"
                              controlId="validationCustom03"
                            >
                              <Form.Label>Mobile</Form.Label>
                              <Form.Control
                                value={phonenumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                type="number"
                                placeholder="Enter Mobile"
                                required
                              />
                              <Form.Control.Feedback>
                                Looks good!
                              </Form.Control.Feedback>
                              <Form.Control.Feedback type="invalid">
                                Please provide a valid mobile.
                              </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group
                              as={Col}
                              md="4"
                              controlId="validationCustom04"
                            >
                              <Form.Label>Email</Form.Label>
                              <Form.Control
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                placeholder="Enter Email"
                                required
                              />
                              <Form.Control.Feedback type="invalid">
                                Please provide a valid email.
                              </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group
                              as={Col}
                              md="4"
                              controlId="validationCustom04"
                            >
                              <Form.Label>Confirm Email</Form.Label>
                              <Form.Control
                                value={emailConfirmation}
                                onChange={(e) =>
                                  setEmailConfirmation(e.target.value)
                                }
                                type="email"
                                placeholder="Enter Confirm Email"
                                required
                                isValid={emailConfirmation && isSameEmail}
                                isInvalid={emailConfirmation && !isSameEmail}
                              />

                              <Form.Control.Feedback type="invalid">
                                Emails must match.
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Row>

                          <Row className="mb-3">
                            <Form.Group
                              as={Col}
                              md="4"
                              controlId="validationCustom03"
                            >
                              <Form.Label>Address line 1</Form.Label>
                              <Form.Control
                                value={addressLine1}
                                onChange={(e) =>
                                  setAddressLine1(e.target.value)
                                }
                                type="text"
                                placeholder="Enter Address Line 1"
                                required
                              />
                              <Form.Control.Feedback>
                                Looks good!
                              </Form.Control.Feedback>
                              <Form.Control.Feedback type="invalid">
                                Please provide a valid Address 1.
                              </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group
                              as={Col}
                              md="4"
                              controlId="validationCustom04"
                            >
                              <Form.Label>Address Line 2</Form.Label>
                              <Form.Control
                                value={addressLine2}
                                onChange={(e) =>
                                  setAddressLine2(e.target.value)
                                }
                                type="text"
                                placeholder="Enter Address Line 2"
                                required
                              />
                              <Form.Control.Feedback>
                                Looks good!
                              </Form.Control.Feedback>
                              <Form.Control.Feedback type="invalid">
                                Please provide a valid Address Line 2.
                              </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group
                              as={Col}
                              md="4"
                              controlId="validationCustom03"
                            >
                              <Form.Label>City</Form.Label>
                              <Form.Control
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                type="text"
                                placeholder="City"
                                required
                              />
                              <Form.Control.Feedback>
                                Looks good!
                              </Form.Control.Feedback>
                              <Form.Control.Feedback type="invalid">
                                Please provide a valid city.
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Row>

                          <Row className="mb-3">
                            <Form.Group
                              as={Col}
                              md="4"
                              controlId="validationCustom04"
                            >
                              <Form.Label>State</Form.Label>
                              <Form.Control
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                type="text"
                                placeholder="Enter state"
                                required
                              />
                              <Form.Control.Feedback>
                                Looks good!
                              </Form.Control.Feedback>
                              <Form.Control.Feedback type="invalid">
                                Please provide a valid state.
                              </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group
                              as={Col}
                              md="4"
                              controlId="validationCustom04"
                            >
                              <Form.Label>Country</Form.Label>
                              <Form.Control
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                type="text"
                                placeholder="Enter country"
                                required
                              />
                              <Form.Control.Feedback>
                                Looks good!
                              </Form.Control.Feedback>
                              <Form.Control.Feedback type="invalid">
                                Please provide a valid country.
                              </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group
                              as={Col}
                              md="4"
                              controlId="validationCustom05"
                            >
                              <Form.Label>Zip</Form.Label>
                              <Form.Control
                                value={zip}
                                onChange={(e) => setZip(e.target.value)}
                                type="text"
                                placeholder="Zip"
                                required
                              />
                              <Form.Control.Feedback>
                                Looks good!
                              </Form.Control.Feedback>
                              <Form.Control.Feedback type="invalid">
                                Please provide a valid zip.
                              </Form.Control.Feedback>
                            </Form.Group>
                          </Row>
                          <br />
                          <Form.Group className="mb-3">
                            <Form.Check
                              value={agreeTerms}
                              onChange={(e) => setAgreeTerms(e.target.value)}
                              required
                              label="Agree to terms and conditions"
                              feedback="You must agree before submitting."
                              feedbackType="invalid"
                            />
                          </Form.Group>
                          <br />
                          <Button variant="success" type="submit">
                            Complete Order
                          </Button>
                        </Form>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Container>
              <br />
              <Container fluid>
                <Row className="justify-content-md-center">
                  <Col xs={12} md={8} className="d-flex justify-content-center">
                    <div>
                      <Link to="/">
                        <Button variant="danger">Continue Shopping</Button>
                      </Link>
                    </div>
                  </Col>
                </Row>
              </Container>
              <br />
            </>
          ) : (
            <>
              <br />
              <Container fluid>
                <Row className="justify-content-md-center">
                  <Col xs={12} md={8}>
                    <br />
                    <Card>
                      <Card.Body>
                        <Card.Header>
                          <Card.Title>Checkout</Card.Title>
                        </Card.Header>
                        <Card.Body>
                          <Card.Text>
                            <h5>Your cart is empty.</h5>
                          </Card.Text>
                        </Card.Body>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Container>
              <br />
              <Container fluid>
                <Row className="justify-content-md-center">
                  <Col xs={12} md={8} className="d-flex justify-content-center">
                    <div>
                      <Link to="/">
                        <Button variant="danger">Continue Shopping</Button>
                      </Link>
                    </div>
                  </Col>
                </Row>
              </Container>
              <br />
            </>
          )}
        </>
      )}
    </>
  );
};

export default Checkout;
