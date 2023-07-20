import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../services/config";
import ItemDetail from "../ItemDetail/ItemDetail";
import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";
import "./ItemDetailContainer.css";
import Button from "react-bootstrap/Button";
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
        <div className="container">
          <Spinner animation="border" variant="danger" />
        </div>
      ) : (
        <>
          <br />

          <div className="card-container">
            <ItemDetail {...product} />
          </div>

          <br />

          <div className="card-container">
            <div className="button-container">
              <Link to="/">
                <Button variant="danger">Continue Shopping</Button>
              </Link>
              <Link to="/cart">
                <Button variant="success">Continue to Cart</Button>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ItemDetailContainer;
