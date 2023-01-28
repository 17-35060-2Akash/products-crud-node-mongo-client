import React, { useState } from 'react';

const AddProducts = () => {
    const [product, setProduct] = useState({});

    const handleAddProduct = event => {
        event.preventDefault();
        // console.log(product);

        fetch('http://localhost:5000/products', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(product)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    alert('Product Added to Database!');
                    event.target.reset();
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
                    <h1 className="text-5xl font-semibold pb-8">Add Your Product</h1>
                </div>
                <form onSubmit={handleAddProduct} className="card  w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Product Name</span>
                            </label>
                            <input onChange={handleOnChange} type="text" placeholder="Product Name" name="name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Product Price</span>
                            </label>
                            <input onChange={handleOnChange} type="number" placeholder="Product Price" name="price" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Product Quantity</span>
                            </label>
                            <input onChange={handleOnChange} type="text" placeholder="Product Quantity" name="quantity" className="input input-bordered" required />
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

export default AddProducts;