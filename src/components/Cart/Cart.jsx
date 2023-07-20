import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";
import CartItem from "../CartItem/CartItem";
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import './Cart.css';
import Card from 'react-bootstrap/Card';

const Cart = () => {
  const { cart, emptyCart, total, quantityTotal, removeProduct } = useContext(CartContext);

  if (quantityTotal === 0) {
    return (
      <>
        <br />
        <div className="card-container">
          <Card style={{ width: '65rem' }}>
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
        </div>
        <br />
        <div className="button-container">
          <Link to="/">
            <Button variant="danger">Continue Shopping</Button>
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <br />
      <div className="card-container">
        <Card style={{ width: '65rem' }}>
          <Card.Body>
            <Card.Header>
              <Card.Title>Cart</Card.Title>
            </Card.Header>
            <Card.Body>
              <Table>
                <thead>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Unit price</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map(product => (
                    <tr key={product.item.id}>
                      <td>
                        <Link to={`/item/${product.item.id}`}>
                          <img className='imgCart' src={product.item.img[0]} />
                        </Link>
                      </td>
                      <td>
                        <Link to={`/item/${product.item.id}`}>
                          {product.item.name}
                        </Link>
                      </td>
                      <td>${product.item.price}</td>
                      <td>{product.quantity}</td>
                      <td>${Math.round(product.quantity * product.item.price * 100) / 100}</td>
                      <td>
                        <Button variant="danger" onClick={() => removeProduct(product.item.id)}>Remove</Button>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th>Total Quantity: {quantityTotal}</th>
                    <th>Total: ${total}</th>
                    <th><Button variant="danger" onClick={() => emptyCart()}>Remove All</Button></th>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card.Body>
        </Card>
      </div>
      <br />
      <div className="button-container">
        <Link to="/">
          <Button variant="danger">Continue Shopping</Button>
        </Link>
        <Link to="/checkout">
          <Button variant="success">Continue Checkout</Button>
        </Link>
      </div>
    </>
  );
}

export default Cart;
