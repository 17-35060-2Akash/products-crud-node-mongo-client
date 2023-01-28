import React from 'react';
import { FaStar } from "react-icons/fa";

const ProductCard = ({ product, handleAddToCart }) => {
    const { category, name, img, price, ratings, seller, stock } = product;
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure><img src={img} alt="Shoes" /></figure>
            <div className="card-body relative ">
                <h2 className="card-title">
                    {name}
                    <div className="badge badge-secondary">NEW</div>
                </h2>
                <div className='text-2xl font-semibold flex justify-between	align-middle py-6 mb-20'>
                    <div>
                        <p>{price}$</p>
                    </div>
                    <div className='flex align-middle	'>
                        <p><FaStar></FaStar></p>
                        <p>{ratings}</p>
                    </div>
                </div>
                <div className="card-actions justify-end">

                </div>
                <div className='card-actions flex-col justify-end absolute bottom-4 right-3'>
                    <div className='pl-12 pb-7'>
                        <div className="badge badge-outline">{category}</div>
                        <div className="badge badge-outline">{seller}</div>
                    </div>
                    <div className="card-actions justify-end ml-20">
                        <button onClick={() => handleAddToCart(product)} className='btn px-16'>Buy</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;