import React, { useEffect, useState } from "react";
import { useHistory, useParams } from 'react-router-dom';
import styled from "styled-components";
import styles from './Detail.css';

function Detail(props) {

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
    return (
        <div className="container">
            <input onChange={(e) => { setinputValue(e.target.value); }}></input>
            <div className="row">
                {alertShow === true
                    ? <div className="alert"><p>재고가 1개 남았습니다.</p></div>
                    : null
                }
                <div className="col-md-6">
                    <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
                </div>
                <div className="col-md-6 mt-4">
                    <h4 className="pt-5">{props.shoes.find(x => x.id === parseInt(id)).title}</h4>
                    <p>{props.shoes.find(x => x.id === parseInt(id)).content}</p>
                    <p>{props.shoes.find(x => x.id === parseInt(id)).price}</p>
                    <button className="btn btn-danger">주문하기</button><br></br>
                    <button className="btn btn-danger" onClick={returnPage}>뒤로가기</button>
                    <div>{inputValue}</div>
                </div>
            </div>
        </div >
    );
};

export default Detail;