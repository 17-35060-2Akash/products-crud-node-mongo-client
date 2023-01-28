import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import ProductCard from './ProductCard';
import './Home.css';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import { useQuery } from '@tanstack/react-query';

const Home = () => {
    // const { storeProducts, count } = useLoaderData();
    const { user } = useContext(AuthContext);

    // const [storeProducts, setStoreProducts] = useState([]);
    const [count, setCount] = useState(0);

    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);

    const [searchedProducts, setSearchedProducts] = useState([]);

    /*    useEffect(() => {
           const url = `http://localhost:5000/store?page=${page}&size=${size}`
           fetch(url)
               .then(res => res.json())
               .then(data => {
                   setCount(data.count);
                   setStoreProducts(data.storeProducts);
               })
       }, [page, size]); */

    //using react query
    const { data: storeProducts = [], isLoading, refetch } = useQuery({
        queryKey: ['store', page, size],
        queryFn: async () => {
            const url = `http://localhost:5000/store?page=${page}&size=${size}`
            const res = await fetch(url);
            const data = await res.json();
            return data.storeProducts;

        }
    })


    const pages = Math.ceil(count / size);

    //adding product
    const handleAddToCart = product => {
        const order = {
            useremail: user.email,
            product: product
        }
        console.log(order);
        fetch('http://localhost:5000/orders', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                if (data.acknowledged) {
                    alert('Added To Cart Successfully');
                }
            })
    };



    const handleSearchOnChange = event => {
        const searchString = event.target.value;
        const url = `http://localhost:5000/search?string=${searchString}`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setSearchedProducts(data);
            })

        // console.log(searchedProducts)
    }


    return (
        <div>
            <div className='flex justify-center align-middle my-10'>
                <input onChange={handleSearchOnChange} type="text" name='search-bar' placeholder="Search" className="input input-bordered w-1/2 text-lg" />
                <button type="submit" name="search-button" className='btn btn-primary ml-2 px-10 text-lg'>Search</button>
            </div>
            <section className='search-results grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 ml-12'>
                {
                    searchedProducts.map(product => <ProductCard className=''
                        key={product._id}
                        product={product}
                        handleAddToCart={handleAddToCart}></ProductCard>)
                }
            </section>
            <section className='store-front'>
                <h3 className='text-3xl font-semibold text-purple-700 py-32'>Pick Your Products Today!</h3>
                <div className="products-container grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 ml-12">
                    {
                        storeProducts.map(product => <ProductCard className=''
                            key={product._id}
                            product={product}
                            handleAddToCart={handleAddToCart}></ProductCard>)
                    }
                </div>
                <div className='pagination'>
                    <h3 className='text-2xl font-semibold text-purple-700 py-10'>Currently Selected Page: {page}</h3>
                    <div className='pagination-container'>
                        {
                            [...Array(pages).keys()].map(number => <button
                                key={number}
                                className={page === number && 'selected'}
                                onClick={() => setPage(number)}>
                                {number + 1}
                            </button>)
                        }
                        <select className='drop-down btn-ghost rounded-md' onChange={(e) => setSize(e.target.value)}>
                            <option value="5">5</option>
                            <option value="10" selected>10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                        </select>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;