import React, { useState } from 'react'
import { useDispatchCart, useCart } from "./ContextReducer"

export default function Cards(props) {

    let options = props.options;
    let priceOptions = Object.keys(options);

    let dispatch = useDispatchCart();
    let data  = useCart();


    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("");

    const handleAddToCart = async () => {
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: props.finalprice, qty: qty, size: size })
        console.log(data)
    }


    return (
        <div>
            <div>
                <div>
                    <div className="card mt-3 mb-3" style={{ "width": "17rem", "maxHeight": "360px" }}>
                        <img src={props.foodItem.img} className="card-img-top" alt="..." style={{ height: "150px", objectFit: "cover" }} />
                        <div className="card-body">
                            <h5 className="card-title">{props.foodItem.name}</h5>
                            {/* <p className="card-text">Some Important text here.</p> */}
                            <div className='container w-100'>
                                <select className='m-2 h-100 bg-primary rounded' onChange={(e) => setQty(e.target.value)}>
                                    {
                                        Array.from(Array(5), (e, i) => {
                                            return (
                                                <option key={i + 1} value={i + 1}> {i + 1} </option>
                                            )
                                        })
                                    }
                                </select>

                                <select className='m-2 h-100 bg-primary rounded' onChange={(e) => setSize(e.target.value)}>
                                    {priceOptions.map((data) => {
                                        return <option key={data} value={data}>{data}</option>
                                    })}
                                    {/* <option value="Half">Half</option>
                                    <option value="Full">Full</option> */}
                                </select>
                                <div className='d-inline fs-5'>Total Price</div>
                                <hr></hr>
                                <div className='btn bg-primary mx-1 text-white justify-content-center' onClick={handleAddToCart}>Add to Cart</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
