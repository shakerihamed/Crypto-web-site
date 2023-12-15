import React from 'react';
import styled from './Pagination.module.css'

const Paigination = ({page ,setPage}) => {


    const BackHandler = () =>{
        if(page <= 1){return}
        setPage((page)=> page - 1)
    }
    const nextHandler = () =>{
        if(page >= 10){return}
        setPage((page)=> page + 1)
    }
    return (
        <>
            <div className={styled.parent}>
                <button className={page === 1 ?styled.disabled : null} onClick={BackHandler}>Back</button>
                <p className={page === 1 ? styled.selected : null}>1</p>
                <p className={page === 2 ? styled.selected : null}>2</p>
                {
                    page > 2 && page < 9 &&(
                        <>
                            <span>...</span>
                            <p className={styled.selected}>{page}</p>
                        </>
                    )
                }
                <span>...</span>
                <p className={page === 9 ? styled.selected : null}>9</p>
                <p className={page === 10 ? styled.selected : null}>10</p>
                <button className={page === 10 ?styled.disabled : null} onClick={nextHandler}>Next</button>

            </div>
            
        </>
    );
};

export default Paigination;