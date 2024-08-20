"use client"
//Compontente FUNCIONAL
/*
export default function Button() {

    function funcion() {
        console.log("Buenasss")
    }

    return(
        <button onClick={funcion}>Registrarme</button>
    )
}
*/

// PROPS

//children: siempre existe, el hijo de la etiwueta html
// Las demás uno les asigna el nombre

/*export default function Button(link, texto) {


    return(
            <button type="button">{texto}</button>
    )
}
*/

import Link from 'next/link';
import styles from './page.module.css';

export default function Header({text}){
  return (
    <header className={styles.header}>
      <div className={styles.logo}>{text}</div>
    </header>
  );
};

/*
import Link from 'next/link';
import styles from './page.module.css';

export default function Header(){
  return (
    <header className={styles.header}>
      <div className={styles.logo}>Home</div>
      <nav className={styles.nav}>
        <Link href="/classroom">Home</Link>
      </nav>
    </header>
  );
};
*/