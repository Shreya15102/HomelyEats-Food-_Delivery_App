import React, { useState, useRef, useEffect } from 'react'
import { useDispatchCart, useCart } from './ContextReducer';
export default function Card(props) {
  let dispatch = useDispatchCart();
  let data = useCart();
  const priceRef = useRef();
  let options = props.options;
  let priceOptions = Object.keys(options);

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  let finalPrice = qty * parseInt(options[size]);
  useEffect(() => {
    setSize(priceRef.current.value)
  }, [])

  const handleAddCart = async () => {
    let food = []
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;
        break;
      }
    }
    if (food !== []) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty })
        return
      }
      else if (food.size !== size) {
        await dispatch({
          type: 'ADD',
          id: props.foodItem._id,
          name: props.foodItem.Name,
          price: finalPrice,
          qty: qty,
          size: size,
        })
        return
      }
    }
    else {
      await dispatch({
        type: 'ADD',
        id: props.foodItem._id,
        name: props.foodItem.Name,
        price: finalPrice,
        qty: qty,
        size: size,
      })
      return
    }
  }

  return (
    <div><div>
      <div className="card h-100 m-3" style={{ "width": "16rem", "maxHeight": "350px" }}>
        <img src={props.foodItem.image} className="card-img-top" alt="..." style={{ height: "130px", objectFit: "fill" }} />
        <div className="card-body">
          <h5 className="fs-5">{props.foodItem.Name}</h5>
          {/* <p className="card-text">Some quick example.</p> */}
          <div className="container w-100">
            <select className=" me-3 form-select-sm p-0 h-100 bg-success rounded" onChange={(e) => setQty(e.target.value)}>
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                )
              })}
            </select>

            <select className=" m-1 form-select-sm p-0 h-100 bg-success rounded" ref={priceRef} onChange={(e) => setSize(e.target.value)}>
              {priceOptions.map((data) => {
                return <option key={data} value={data}>{data}</option>
              })
              }
            </select>

            {/* <div className="d-inline h-100 fs-7">Rs.{finalPrice}/-</div> */}



          </div>
          <hr></hr>
          <button className='btn btn-success btn-sm' onClick={handleAddCart}>Add to Cart</button>{"  "}
          <div className="d-inline h-100 fs-7">Rs.{finalPrice}/-</div>
        </div></div></div></div>
  )
}
