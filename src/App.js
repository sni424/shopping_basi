/*eslint-disable*/
import './App.css';
import React, { useContext, useEffect, useState } from 'react';
import { Navbar, Container, Nav, NavDropdown, } from 'react-bootstrap';
import Data from "./data.js"
import { Link, Route, Switch, useHistory } from "react-router-dom";
import Detail from "./Detail.js";
import axios from 'axios';
import Cart from "./Cart";

export let context = React.createContext();//범위 생성

function App() {

  let [shoes, setShoes] = useState(Data);
  let [inventory, setInventory] = useState([10, 20, 30, 40]);

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">ShoesShope</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/detail">Detail</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Switch>
        <Route exact path="/">
          <div className='jumbo'>
            <div className='second-jumbo'>
              <h1>20% Season Off</h1>
              <p>this is simple page</p>
              <button>Learn more</button>
            </div>
          </div>
          <div className='container'>

            <context.Provider value={inventory}>
              <div className="row">
                {shoes.map((a, i) => {
                  return <StuffShoes i={i} key={i}
                    shoesName={shoes[i].title} shoesContent={shoes[i].content} shoesPrice={shoes[i].price}
                  ></StuffShoes>
                })
                }
              </div>
            </context.Provider>
            <button className='btn_promary' onClick={() => {

              axios.get("https://codingapple1.github.io/shop/data2.json")
                .then((result) => {
                  setShoes([...shoes, ...result.data])
                })
                .catch((err) => {
                  console.log(err);
                })

            }}>더보기</button>
          </div>
        </Route>
        <Route path="/detail/:id">
          <context.Provider value={inventory}>
            <Detail shoes={shoes} inventory={inventory} setInventory={setInventory}></Detail>
          </context.Provider>
        </Route>
        <Route path="/cart">
          <Cart></Cart>
        </Route>
      </Switch>
    </div >

  );
}

function StuffShoes(props) {
  let history = useHistory();
  let inventory = useContext(context);

  return (
    <div className='col-md-4' onClick={() => { history.push('/detail/' + props.i) }}>
      <img alt='shoes1' src={"https://codingapple1.github.io/shop/shoes" + (props.i + 1) + ".jpg"} width="100%"></img>
      <h4>{props.shoesName}</h4>
      <p>{props.shoesContent} & {props.shoesPrice}₩ </p>
      <Text index={props.i}></Text>
    </div >
  );
};

function Text(props) {
  let inventory = useContext(context);
  return (
    <p>재고 :{inventory[props.index]}</p>
  );
};

export default App;