import React, { useEffect, useState } from 'react';
import TableCoin from '../modules/TableCoin';
import { getDataList } from '../../services/CoinApi';
import Paigination from '../modules/Paigination';
import SearchBox from '../modules/SearchBox';
import Chart from '../modules/Chart';
import SideCard from '../modules/sideCard';
import styled from './SideCard.module.css'
import { MdOutlineMenuOpen } from "react-icons/md";


const HomePage = () => {
    const [coins , setCoins] = useState([])
    const [isLoading , setIsLoading] = useState(true)
    const [page , setPage] = useState(1)
    const [search , setSearch] = useState('usd')
    const [chart , setChart] = useState(null)
    const [ liked , setLiked] =useState([])
    const [menu , setMenu] = useState(false)

    useEffect(() => {
        const data = async () => {
            try{
                setIsLoading(true)
                const res = await fetch(getDataList(page,search))
                const json = await res.json()
                setCoins(json)
                setIsLoading(false)

            }catch (error){
                console.log(error);
            }
        }
        data()
        

    },[page,search])

    const handleLikeList = (data , status) => {
        if(status){
            const newData = liked.filter((item) => item.id !== data.id)
            setLiked(newData)

        }else{
            setLiked((liked) => [...liked , data])
        }
    }
    const menuHandleer = () => {
        setMenu(menu => !menu)
    }
    return (
        <div>
            <SearchBox search={search} setSearch={setSearch}/>
            <MdOutlineMenuOpen onClick={menuHandleer} className={styled.menu} />
            <TableCoin 
            coins={coins} 
            isLoading={isLoading} 
            setChart={setChart} 
            handleLikeList={handleLikeList}/>

            <Paigination page={page} setPage={setPage}/>
            {chart && <Chart chart={chart} setChart={setChart}/>}
            
            <div className={menu ? styled.showMenu : styled.hideMenu}>
                
                {!!liked.length && <div className={styled.container}>
                <h3>Favorites</h3>
                    {liked.map((coin) => <SideCard key={coin.id} data={coin} />)}</div>}
            </div>
        </div>
    );
};

export default HomePage;