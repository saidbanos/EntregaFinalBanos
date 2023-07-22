import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";
import { Button, Table } from "react-bootstrap";

const CartItem = ({ item, quantity }) => {
  const { removeProduct } = useContext(CartContext);

  return (
    <div key={item.id}>
      <Table>
        <tbody>
          <tr>
            <td>
              <Link to={`/item/${item.id}`}>
                <img className="imgCart" src={item.img[0]} />
              </Link>
            </td>
            <td>
              {" "}
              <Link to={`/item/${item.id}`}>{item.name}</Link>
            </td>
            <td> ${item.price} </td>
            <td>{quantity}</td>
            <td>${Math.round(quantity * item.price * 100) / 100}</td>
            <td>
              {" "}
              <Button variant="danger" onClick={() => removeProduct(item.id)}>
                {" "}
                Remove{" "}
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default CartItem;
