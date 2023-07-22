import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";
import { Button, Card, Container, Row, Col } from "react-bootstrap";

const Cart = () => {
  const { cart, emptyCart, total, quantityTotal, removeProduct } =
    useContext(CartContext);

  if (quantityTotal === 0) {
    return (
      <>
        <Container fluid>
          <Row className="justify-content-md-center">
            <Col xs={12} md={8}>
              <br />
              <Card>
                <Card.Body>
                  <Card.Header>
                    <Card.Title>Cart</Card.Title>
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
      </>
    );
  }

  return (
    <>
      <Container fluid>
        <Row className="justify-content-md-center">
          <Col xs={12} md={8}>
            <br />
            <Card>
              <Card.Body>
                <Card.Header>
                  <Card.Title>Cart</Card.Title>
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
                        <div className="col-12 col-md-2">
                          <Button
                            variant="danger"
                            onClick={() => removeProduct(product.item.id)}
                          >
                            Remove
                          </Button>
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
                      <br />
                      <br />
                      <div className="col-12 col-md-2">
                        <Button variant="danger" onClick={() => emptyCart()}>
                          Remove All
                        </Button>
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
          <Col xs={12} md={4} className="d-flex justify-content-center">
            <div>
              <Link to="/">
                <Button variant="danger">Continue Shopping</Button>
              </Link>
            </div>
          </Col>
          <br />
          <br />
          <br />
          <Col xs={12} md={4} className="d-flex justify-content-center">
            <div>
              <Link to="/checkout">
                <Button variant="success">Continue Checkout</Button>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
      <br />
    </>
  );
};

export default Cart;
