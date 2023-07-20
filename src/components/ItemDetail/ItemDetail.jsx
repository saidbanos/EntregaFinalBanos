import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import ItemCount from '../ItemCount/ItemCount';
import Toast from 'react-bootstrap/Toast';
import './ItemDetail.css';
import CardGroup from 'react-bootstrap/CardGroup';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';

const ItemDetail = ({ id, name, price, img, description, stock }) => {
  const [addQuantity, setAddQuantity] = useState(0);
  const { addProduct } = useContext(CartContext);
  const [show, setShow] = useState(false);

  const manejadorQuantity = (quantity) => {
    setAddQuantity(quantity);
    const item = { id, name, price, img };
    addProduct(item, quantity);
  };

  return (
    <>
      {name && price && stock > 0 ? (
        <div>
          <CardGroup style={{ width: '65rem' }}>
            <Card>
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
            </Card>
            <Card>
              <Card.Body>
                <Card.Header>
                  <Card.Title>{name}</Card.Title>
                </Card.Header>
                <Card.Body>
                  <Card.Text>{description}</Card.Text>
                  <Card.Text>
                    <h5>Price: ${price}</h5>
                  </Card.Text>
                  <Card.Text>Id: {id}</Card.Text>
                  <Card.Text>
                    <ItemCount
                      initialValue={1}
                      stock={stock}
                      addFunction={manejadorQuantity}
                    />
                  </Card.Text>
                </Card.Body>
              </Card.Body>
            </Card>
          </CardGroup>
        </div>
      ) : stock <= 0 ? (

        <>
        <br />
        <div className="card-container">
          <Card style={{ width: '65rem' }}>
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
        </div>
      </>
      ) : (
        <>
        <br />
        <div className="card-container">
          <Card style={{ width: '65rem' }}>
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
        </div>
      </>
      )}
    </>
  );
};

export default ItemDetail;
