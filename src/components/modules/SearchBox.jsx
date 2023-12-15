import React, { useEffect, useState } from 'react';
import { getSearchList } from '../../services/CoinApi';
import RingLoader from 'react-spinners/RingLoader'
import styled from './SearchBox.module.css'
import { IoClose } from "react-icons/io5";

const SearchBox = ({ search , setSearch}) => {
    const [text , setText] = useState('')
    const [coins ,setCoins] = useState([])
    const [loading , setLoading] = useState(false)

    useEffect(()=>{
        const controller = new AbortController()
        setCoins([])
        if(!text){
            setLoading(false)
            return;
        };

        const dataSearch = async () => {
            try{
            const res = await fetch(getSearchList(text),{signal:controller.signal})
            const json = await res.json()
            setLoading(false)
            if(json.coins){setCoins(json.coins)} else{
                alert(json.status.error_message)
            }
            }catch(error){
                if(error.name !== 'AbortError'){
                    alert(error.message)
                }
            }

        }
        setLoading(true)
        dataSearch()

        return () => controller.abort()

    },[text])

    // const closeHandler = () => {
    //     setText(text => text === '')
    // }
    return (
        <div className={styled.searchBox}>
            <input type="text" placeholder='Search Coins' onChange={(e)=> setText(e.target.value.toLowerCase().trim())}/>
            {/* <IoClose onClick={closeHandler} className={text.length ? styled.close : styled.hide} /> */}
            <select value={search} onChange={(e)=> setSearch(e.target.value)}>
                <option value="usd">USD</option>
                <option value="eur">EUR</option>
                <option value="jpy">JPY</option>
            </select>
            {(!!coins.length || loading) &&(
                <div className={styled.searchResult}>
                    {loading && <RingLoader size='15rem' color='#3874ff' />}
                    <ul>

                        {
                            coins.map((coin)=>(
                                <li key={coin.id}>
                                    <img src={coin.thumb} alt={coin.name} />
                                    <span>{coin.name}</span>
                                </li>
                            ))
                        }
                    </ul>
                </div>

            )}

        </div>
    );
};

export default SearchBox;