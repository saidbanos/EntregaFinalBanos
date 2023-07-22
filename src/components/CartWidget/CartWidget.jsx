import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";
import "./CartWidget.css";
import Badge from "react-bootstrap/Badge";

const CartWidget = () => {
  const { quantityTotal } = useContext(CartContext);
  const imgCart = "/icon-cart.png";
  return (
    <div>
      <Link to="/cart">
        <img className="imgCart" src={imgCart} alt="shopping cart" />
        {quantityTotal > 0 && (
          <Badge bg="danger">
            <strong> {quantityTotal} </strong>
          </Badge>
        )}
      </Link>
    </div>
  );
};

export default CartWidget;
