import React from "react";
import { Table } from "react-bootstrap";
import { connect, useDispatch, useSelector } from 'react-redux';

function Cart(props) {

    let state = useSelector((state) => { return state });
    let dispatch = useDispatch();

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경</th>
                    </tr>
                </thead>
                <tbody>
                    {state.reducer.map((a, i) => {
                        return <tr key={i}>
                            <td>{a.id}</td>
                            <td>{a.name}</td>
                            <td>{a.quan}</td>
                            <td>
                                <button onClick={() => dispatch({ type: "수량증가", payload: { name: "jong" } })}>+</button>
                                <button onClick={() => { return dispatch({ type: "수량감소" }) }}>-</button>
                            </td>
                        </tr>
                    })}
                </tbody>
            </Table>
            {state.alertChange === true
                ? (<div className="my-alert2">
                    <p>지금 구매하시면 20% 할인</p>
                </div>)
                : null
            }
            <button onClick={() => { dispatch({ type: '숨기기' }) }}>닫기</button>
        </>
    );
};

// function state를props화(state) {
//     return {
//         state: state.reducer,
//         alertChange: state.reducer2
//     }
// }

// export default connect(state를props화)(Cart);

export default Cart;