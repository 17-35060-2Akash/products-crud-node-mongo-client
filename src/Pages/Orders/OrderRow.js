import React from 'react';

const OrderRow = ({ order }) => {
    const { product } = order;
    // console.log(product);
    const { img, name, seller, price, _id, category } = product;

    return (
        <tr>
            <th>
                <label>
                    <input type="checkbox" className="checkbox" />
                </label>
            </th>
            <td>
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                            <img src={img} alt="Avatar Tailwind CSS Component" />
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{name}</div>
                        <div className="text-sm opacity-50">{seller}</div>
                    </div>
                </div>
            </td>
            <td>
                {price}$
                <br />
            </td>
            <td>{category}</td>
            <th>
                <button className="btn btn-ghost btn-xs">Pending</button>
            </th>
        </tr>
    );
};

export default OrderRow;