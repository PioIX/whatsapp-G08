"use client"

import styles from './page.module.css';

export default function Title({sofi}){
  return (
    <header className={styles.titulo}>{sofi}</header>
  );
};
