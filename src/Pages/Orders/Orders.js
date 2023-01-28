import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import OrderRow from './OrderRow';

const Orders = () => {
    const { user, logOut } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);


    useEffect(() => {
        const url = `http://localhost:5000/orders?email=${user?.email}`;
        fetch(url, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('bongo-bazar')}`
            }
        })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    return logOut()
                }
                return res.json();
            })
            .then(data => {
                setOrders(data);
            })
    }, [user?.email, logOut]);

    return (
        <div>
            <h2 className='text-4xl py-5'>You have {orders.length} orders.</h2>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    {/* <input type="checkbox" className="checkbox" /> */}
                                </label>
                            </th>
                            <th className='pl-40'>Product Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map(order => <OrderRow
                                key={order._id}
                                order={order}></OrderRow>)
                        }

                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default Orders;