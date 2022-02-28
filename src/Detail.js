import React, { useContext, useEffect, useState } from "react";
import { Route, useHistory, useParams } from 'react-router-dom';
import styled from "styled-components";
import styles from './Detail.css';
import { context } from "./App.js"
import Cart from "./Cart.js";
import { connect } from 'react-redux';

function Detail(props) {

    let inventory = useContext(context);

    let [alertShow, setAlertShow] = useState(true);

    useEffect(() => {
        let timer = setTimeout(() => {
            setAlertShow(false);
        }, 5000)
        return () => { clearTimeout(timer) }
    }, [alertShow]);

    let [inputValue, setinputValue] = useState("");
    let { id } = useParams();
    let history = useHistory();//방문기록이 담긴 object

    function returnPage() {
        return history.goBack();
    }

    function changeInventory() {
        let wow = [...props.inventory];
        let hello = wow.map((a, i) =>
            a - 1
        );
        props.setInventory(
        )
        if (props.inventory < 1) {
            props.setInventory(0);
            alert("재고가 모두 떨여졌습니다.");
        }
    };
    function addCart() {
        props.dispatch({ type: "add", payload: { id: 3, name: "newProduct", quan: 1 } });
        history.push("/cart");
    }
    return (
        <div className="container">
            <input onChange={(e) => { setinputValue(e.target.value); }}></input>
            <div className="row">
                {alertShow === true
                    ? <div className="alert"><p>재고가 {props.inventory[0]}개 남았습니다.</p></div>
                    : null
                }
                <div className="col-md-6">
                    <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
                </div>
                <div className="col-md-6 mt-4">
                    <h4 className="pt-5">{props.shoes.find(x => x.id === parseInt(id)).title}</h4>
                    <p>{props.shoes.find(x => x.id === parseInt(id)).content}</p>
                    <p>{props.shoes.find(x => x.id === parseInt(id)).price}</p>

                    <Inventory inventory={props.inventory} setInventory={props.setInventory}></Inventory>

                    <button className="btn btn-danger" onClick={changeInventory}>주문하기</button><br></br>
                    <button className="btn btn-danger" onClick={returnPage}>뒤로가기</button>
                    <button className="btn btn-danger" onClick={addCart}>찜하기</button>
                    <div>{inputValue}</div>
                </div>
            </div>
        </div >
    );
};

function Inventory(props) {
    return (
        <p>재고 : {props.inventory[0]}</p>
    );
};

function state를props화(state) {
    return {
        state: state.reducer,
        alertChange: state.reducer2
    }
}

export default connect(state를props화)(Detail);