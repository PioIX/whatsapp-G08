"use client"

import React from 'react'; 
import ChatMessage from './ChatMessage';

function List({onClick, text}) {

    

    return(
        <button type="button" className={styles.button} onClick={onClick}>{text}</button>
    )
}

export default List;