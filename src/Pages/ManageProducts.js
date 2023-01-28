import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const ManageProducts = () => {
    const products = useLoaderData();
    const [displayProducts, setDisplayProducts] = useState(products);

    // console.log(products);

    const handleDelete = product => {
        const agree = window.confirm(`Are You Ready To Delete ${product.name}?`);
        if (agree) {
            fetch(`http://localhost:5000/products/${product._id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.deletedCount > 0) {
                        alert('user deleted successfully!');
                        const remainingProducts = displayProducts.filter(prd => prd._id !== product._id);
                        setDisplayProducts(remainingProducts);
                    }
                })

        }
    }

    return (
        <div>
            <h2>Manage Products: {products.length}</h2>
            <div className='flex justify-center flex-col align-middle'>
                {
                    displayProducts.map(product => <div className='py-5 flex justify-center' key={product._id}>

                        <div className='text-start p-6'>
                            <p className='font-semibold text-2xl'>{product.name} </p>
                            <p className='text-xl'>Price: ${product.price}</p>
                            <p className='text-xl'>Quantity: {product?.quantity}</p>
                        </div>
                        <div className='my-auto'>
                            <Link to={`/update/${product._id}`}>
                                <p className='text-2xl border text-green-600 px-3 mx-3'>Update</p>
                            </Link>
                        </div>
                        <div className='my-auto'>
                            <p onClick={() => handleDelete(product)} className='text-2xl border text-red-600 px-3'>X</p>
                        </div>

                    </div>)
                }
            </div>
        </div>
    );
};

export default ManageProducts;