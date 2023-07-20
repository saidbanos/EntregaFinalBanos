import { useState, useEffect } from "react";
import ItemList from "../ItemList/ItemList";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../services/config';
import Spinner from 'react-bootstrap/Spinner';

const ItemListContainer = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { idCategory } = useParams();

  useEffect(() => {
    const misProducts = idCategory ? query(collection(db, "products"), where("idCat", "==", idCategory)) : collection(db, "products");

    getDocs(misProducts)
      .then(res => {
        const nuevosProducts = res.docs.map(doc => {
          const data = doc.data();
          return { id: doc.id, ...data }
        });
        setProducts(nuevosProducts);
        setIsLoading(false);
      })
      .catch(error => console.log(error));
  }, [idCategory]);

  return (
    <>
      {isLoading ? (



<div className="container">
<Spinner animation="border" variant="danger" />
</div>



      ) : (
        <ItemList products={products} />
      )}
    </>
  );
}

export default ItemListContainer;
