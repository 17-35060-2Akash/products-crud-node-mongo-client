import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';

const UpdateProducts = () => {
    const prevProduct = useLoaderData();
    const [product, setProduct] = useState(prevProduct);

    const handleAddProduct = event => {
        event.preventDefault();
        console.log(product);
        fetch(`http://localhost:5000/products/${prevProduct._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(product)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    alert('Product Updated');
                }
            })

    };


    const handleOnChange = event => {
        const field = event.target.name;
        const value = event.target.value;

        const newProduct = { ...product };
        newProduct[field] = value;
        setProduct(newProduct);
        // console.log(newProduct)
    };

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-column">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-semibold pb-8">Update Product</h1>
                </div>
                <form onSubmit={handleAddProduct} className="card  w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Product Name</span>
                            </label>
                            <input onChange={handleOnChange} type="text" placeholder="Product Name" name="name" className="input input-bordered" defaultValue={prevProduct.name} required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Product Price</span>
                            </label>
                            <input onChange={handleOnChange} type="number" placeholder="Product Price" name="price" className="input input-bordered" defaultValue={prevProduct.price} required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Product Quantity</span>
                            </label>
                            <input onChange={handleOnChange} type="text" placeholder="Product Quantity" name="quantity" className="input input-bordered" defaultValue={prevProduct.quantity} required />
                        </div>

                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary">Add Product</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateProducts;