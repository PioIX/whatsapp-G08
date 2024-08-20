"use client"

import styles from './page.module.css';

export default function Button({onClick, text}) {
    return(
        <button type="button" className={styles.button} onClick={onClick}>{text}</button>
    )
}