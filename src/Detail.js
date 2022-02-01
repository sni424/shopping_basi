import React, { useState } from "react";
import { useHistory, useParams } from 'react-router-dom';
import styled from "styled-components";
import './Detail.scss';

function Detail(props) {

    let { id } = useParams();
    let history = useHistory();//방문기록이 담긴 object

    function returnPage() {
        return history.goBack();
    }
    return (
        <div className="container">
            <div className="row">
                <div className="alert"><p>재고가 1개 남았습니다.</p></div>
                <div className="col-md-6">
                    <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
                </div>
                <div className="col-md-6 mt-4">
                    <h4 className="pt-5">{props.shoes.find(x => x.id === parseInt(id)).title}</h4>
                    <p>{props.shoes.find(x => x.id === parseInt(id)).content}</p>
                    <p>{props.shoes.find(x => x.id === parseInt(id)).price}</p>
                    <button className="btn btn-danger">주문하기</button><br></br>
                    <button className="btn btn-danger" onClick={returnPage}>뒤로가기</button>
                </div>
            </div>
        </div>
    );
};

export default Detail;