import { useState, useContext } from "react";
import Toast from "react-bootstrap/Toast";
import { CartContext } from "../../context/CartContext";
import "./ItemCount.css";
import Button from "react-bootstrap/Button";

const ItemCount = ({ initialValue, stock, addFunction }) => {
  const [counter, setCounter] = useState(initialValue);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const { quantityTotal } = useContext(CartContext);

  const increase = () => {
    if (counter < stock) {
      setCounter(counter + 1);
    }
  };

  const decrease = () => {
    if (counter > initialValue) {
      setCounter(counter - 1);
    }
  };

  const handleAddToCart = () => {
    addFunction(counter);
    setShowToast(true);
    setToastMessage(`${counter} new products added to your cart!`);
  };

  return (
    <>
      <div>
        <Button variant="success" onClick={decrease}>
          {" "}
          -{" "}
        </Button>

        <strong> {counter} </strong>

        <Button variant="success" onClick={increase}>
          {" "}
          +{" "}
        </Button>
      </div>
      <br />

      <Button variant="success" onClick={handleAddToCart}>
        {" "}
        Add to Cart{" "}
      </Button>

      <Toast
        className="d-inline-block m-1"
        bg="success"
        position="bottom-end"
        onClose={() => setShowToast(false)}
        show={showToast}
        animation
        delay={3000}
        autohide
      >
        <Toast.Header>
          <strong className="me-auto">{toastMessage}</strong>
        </Toast.Header>
        <Toast.Body className="text-white">
          You have a total of {quantityTotal} products in your cart.
        </Toast.Body>
      </Toast>
    </>
  );
};

export default ItemCount;
