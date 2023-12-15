import React from 'react';
import styled from './Side.module.css'

const SideCard = ({data}) => {
    const {image , name} = data
    return (
        <div className={styled.parent}>
            <img src={image} alt={name} />
            <span>{name}</span>
        </div>
    );
};

export default SideCard;