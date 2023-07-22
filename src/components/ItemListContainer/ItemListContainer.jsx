import { useState, useEffect } from "react";
import ItemList from "../ItemList/ItemList";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../services/config";
import Spinner from "react-bootstrap/Spinner";

const ItemListContainer = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const { categoryDescription } = useParams();

  useEffect(() => {
    getDocs(collection(db, "categories"))
      .then((res) => {
        const newCategories = res.docs.map((doc) => {
          const data = doc.data();
          return { id: doc.id, ...data };
        });
        setCategories(newCategories);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    const category = categories.find(
      (cat) => cat.description === categoryDescription
    );
    const categoryId = category ? category.id : null;

    const misProducts = categoryId
      ? query(collection(db, "products"), where("idCat", "==", categoryId))
      : collection(db, "products");

    getDocs(misProducts)
      .then((res) => {
        const nuevosProducts = res.docs.map((doc) => {
          const data = doc.data();
          return { id: doc.id, ...data };
        });
        setProducts(nuevosProducts);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, [categoryDescription, categories]);

  return (
    <>
      {isLoading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <Spinner animation="border" variant="danger" />
        </div>
      ) : (
        <ItemList products={products} />
      )}
    </>
  );
};

export default ItemListContainer;
