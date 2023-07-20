import './Item.css'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card';

const Item = ({id, name, price, img, stock}) => {

  const imgreturn = img[0];

  return (
    <div className="item-container">
      <br/>
      <Card border="light" bg="light" style={{ width: '18rem' }}>
        <Link to={`/item/${id}`}>
          <Card.Img variant="top" src={img[0]} />
          
        </Link>
        <Card.Body>
          <Link to={`/item/${id}`}>
            <Card.Title> {name} </Card.Title>
          </Link>
          <Card.Text>
            Price: ${price}
            <br/>
            Id: {id}
            <br/>
            Stock: {stock}
          </Card.Text>
          <Link to={`/item/${id}`}>
            <img className='imgSeeDetails' src={"/quick-view-icon.png"} />
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Item;
