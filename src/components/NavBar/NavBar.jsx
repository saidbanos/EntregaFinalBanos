import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../services/config";
import CartWidget from "../CartWidget/CartWidget";
import "./NavBar.css";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { List } from "react-bootstrap-icons";

const NavBar = () => {
  const imgFicticium = "/imgFicticium.png";
  const expand = "md";
  const [categories, setCategories] = useState([]);

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

  return (
    <>
      <header>
        <Navbar
          sticky="top"
          key={expand}
          collapseOnSelect
          expand={expand}
          className="bg-body-tertiary mb-3"
        >
          <Container fluid>
            <Navbar.Brand>
              Said Banos
              <br/>
              <br/>
              saidbanos@gmail.com
              <br/>
              647-854-5270
              
              {/* <Link to="/">
                <img className="imgFicticium" src={imgFicticium} alt="" />
              </Link> */}
            </Navbar.Brand>

            <Nav className="me-auto">
              {/* <NavDropdown
                title={<List color="grey" size={30} />}
                id={`offcanvasNavbarDropdown-expand-${expand}`}
              >
                {categories.map((category) => (
                  <NavDropdown.Item
                    key={category.id}
                    as={Link}
                    to={`/category/${category.description}`}
                  >
                    {category.displayName}
                  </NavDropdown.Item>
                ))}
              </NavDropdown> */}
            </Nav>
{/* 
            <CartWidget /> */}
          </Container>
        </Navbar>

        <Link to="/">
          <img className="banner" src={"/fic-banner-large.jpg"} />
        </Link>
      </header>
    </>
  );
};

export default NavBar;
