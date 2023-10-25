import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../services/config";
import ItemDetail from "../ItemDetail/ItemDetail";
import { Link } from "react-router-dom";
import { Container, Row, Col, Spinner, Button } from "react-bootstrap";

const ItemDetailContainer = () => {
  const [product, setProduct] = useState(null);
  const { idItem } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const nuevoDoc = doc(db, "products", idItem);

    getDoc(nuevoDoc)
      .then((res) => {
        const data = res.data();
        const nuevoProduct = { id: res.id, ...data };
        setProduct(nuevoProduct);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, [idItem]);

  return (
    <div>
      {isLoading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <Spinner animation="border" variant="danger" />
        </div>
      ) : (
        <>
          <br />

          <div>
            <ItemDetail {...product} />
          </div>

          <br />

          <Container fluid>
            <Row className="justify-content-md-center">
              <Col xs={12} md={4} className="d-flex justify-content-center">
                <div>
                  <Link to="/">
                    <Button variant="danger">Go back</Button>
                  </Link>
                </div>
              </Col>
              <br />
              <br />
              <br />
              <Col xs={12} md={4} className="d-flex justify-content-center">
                {/* <div>
                  <Link to="/cart">
                    <Button variant="success">Continue to Cart</Button>
                  </Link>
                </div> */}
              </Col>
            </Row>
          </Container>
          <br />
        </>
      )}
    </div>
  );
};

export default ItemDetailContainer;
