import React from 'react';

import BeatLoader from 'react-spinners/BeatLoader'
import TableRow from './TableRow';
import styled from './TableCoin.module.css'
const TableCoin = ( { coins ,isLoading ,setChart , handleLikeList} ) => {

    return (
        <div className={styled.container}>
            {
                isLoading ? <BeatLoader size={25} color="#36d7b7" />:

            (    <table className={styled.table}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Coin</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>24h</th>
                            <th>Total Volume</th>
                            <th>Last 7 Days</th>
                        </tr>

                    </thead>
                    <tbody>
                        {
                            coins.map((coin) => (
                                <TableRow coin={coin} key={coin.id} setChart={setChart} handleLikeList={handleLikeList}/>
                            ))
                        }
                    </tbody>
                </table>)

            }
        </div>
    );
};

export default TableCoin;
