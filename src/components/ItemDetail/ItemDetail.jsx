import { useState, useContext } from "react";
import { CartContext } from "../../context/CartContext";
import ItemCount from "../ItemCount/ItemCount";
import { Container, Row, Col, Card, Carousel } from "react-bootstrap";

const ItemDetail = ({ id, name, price, img, description, stock }) => {
  const [addQuantity, setAddQuantity] = useState(0);
  const { addProduct } = useContext(CartContext);

  const manejadorQuantity = (quantity) => {
    setAddQuantity(quantity);
    const item = { id, name, price, img };
    addProduct(item, quantity);
  };

  return (
    <>
      {name && price && stock > 0 ? (
        <Container fluid>
          <Row className="justify-content-md-center">
            <Col xs={12} md={4}>
              <Carousel data-bs-theme="dark" slide={false} interval={null}>
                <Carousel.Item>
                  <Card.Img variant="top" src={img[0]} />
                </Carousel.Item>
                <Carousel.Item>
                  <Card.Img variant="top" src={img[1]} />
                </Carousel.Item>
                <Carousel.Item>
                  <Card.Img variant="top" src={img[2]} />
                </Carousel.Item>
              </Carousel>
            </Col>
            <Col xs={12} md={4}>
              <Card>
                <Card.Body>
                  <Card.Header>
                    <Card.Title>{name}</Card.Title>
                  </Card.Header>
                  <Card.Body>
                    <Card.Text>{description}</Card.Text>
                    {/* <Card.Text>
                      <h5>Price: ${price}</h5>
                    </Card.Text>
                    <Card.Text>Id: {id}</Card.Text>
                    <Card.Text>
                      <ItemCount
                        initialValue={1}
                        stock={stock}
                        addFunction={manejadorQuantity}
                      />
                    </Card.Text> */}
                  </Card.Body>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      ) : stock <= 0 ? (
        <Container fluid>
          <Row className="justify-content-md-center">
            <Col xs={12} md={8}>
              <br />
              <Card>
                <Card.Body>
                  <Card.Header>
                    <Card.Title>Product availability</Card.Title>
                  </Card.Header>
                  <Card.Body>
                    <Card.Text>
                      <h5>This product is not in stock at the moment.</h5>
                    </Card.Text>
                  </Card.Body>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      ) : (
        <Container fluid>
          <Row className="justify-content-md-center">
            <Col xs={12} md={8}>
              <br />
              <Card>
                <Card.Body>
                  <Card.Header>
                    <Card.Title>Product availability</Card.Title>
                  </Card.Header>
                  <Card.Body>
                    <Card.Text>
                      <h5>The product with Id: {id} does not exist.</h5>
                    </Card.Text>
                  </Card.Body>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default ItemDetail;
