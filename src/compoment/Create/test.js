import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CakeTypeList = () => {
    const [types, setTypes] = useState([]);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [cartCakeIds, setCartCakeIds] = useState([]);

    const getType = async () => {
        try {
            const rep = await axios.get('http://localhost:8080/api/cake/typeCake');
            setTypes(rep.data);
            const uniqueItemsCount = rep.data.length;
            setTotalQuantity(uniqueItemsCount);
            setCartCakeIds(rep.data.map(item => item.id_cake));
        } catch (error) {
            console.error('Error fetching cake types:', error);
        }
    };

    useEffect(() => {
        getType();
    }, []);

    return (
        <div>
            <h1>Danh Sách Loại Bánh</h1>
            <p>Tổng số loại bánh trong giỏ hàng: {totalQuantity}</p>
            <ul>
                {types.map((type) => (
                    <li key={type.id_cake}>
                        {type.name} - ID: {type.id_cake}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CakeTypeList;
