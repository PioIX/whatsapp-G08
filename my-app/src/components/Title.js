"use client"

import styles from './page.module.css';

export default function Title({text}){
  return (
    <header className={styles.titulo}>{text}</header>
  );
};
