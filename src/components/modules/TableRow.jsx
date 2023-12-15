import React, { useState } from 'react';
import chartUp from '../../assets/chart-up.svg'
import chartDown from '../../assets/chart-down.svg'
//icons
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

import styled from './TableRow.module.css'
import { marketChart } from '../../services/CoinApi';

const TableRow = ({coin , setChart,handleLikeList}) => {

    const { id,
            image ,
            symbol ,
            name,
            current_price,
            price_change_percentage_24h,
            total_volume } = coin;

    const [star ,setStar] = useState(false);


    const chartHandler = async () => {
        
        try {
            const res = await fetch(marketChart(id))
            const json = await res.json();
            console.log(json);
            setChart({...json , coin})

        } catch (error) {
            setChart(null)
        }
        
    }
    const LikedList = () => {
        handleLikeList(coin , star)
        setStar((star)=>!star)

    }

    return (
        <>
            <tr className={styled.tr}>
                <td onClick={LikedList}>{star ? <FaStar color='gold' /> : <FaRegStar />}</td>
                <td>
                    <div className={styled.symbol} onClick={chartHandler}>
                        <img src={image} />
                        <span>{symbol.toUpperCase()}</span>
                    </div>
                </td>
                <td>{name}</td>
                <td>${current_price.toLocaleString()}</td>
                <td className={price_change_percentage_24h > 0 ? styled.success : styled.error}>{price_change_percentage_24h.toFixed(2)}%</td>
                <td>${total_volume.toLocaleString()}</td>
                <td><img src={price_change_percentage_24h > 0 ? chartUp:chartDown} alt={coin.name} /></td>
            </tr>
        </>
    );
};

export default TableRow;