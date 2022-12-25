import React from "react";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getName } from '../../redux/actions'
import styles from './searchBar.module.css'

export default function SearchBar({setpaginaActual}) {

    const dispatch = useDispatch();
    const [name, setName] = useState("");

    function handleInputChange(e) {
        e.preventDefault()
        setName(e.target.value)
        
    }

    function handleSubmit(e) {
        e.preventDefault()
        dispatch(getName(name));
        setName('')
        setpaginaActual(1)
    }
    function handleKeyDown(e) {
        if (e.key === "Enter") {
          handleSubmit(e);
        }
      };

    return (
        <div className={styles.SearchBar}>
            <input
                value={name}
                type="text"
                placeholder="Busca un Juego"
                onChange={(e) => handleInputChange(e)}
                onKeyDown={(e) => handleKeyDown(e)}

            />
            <button type="submit" onClick={(e) => handleSubmit(e)}>🔍︎</button>
        </div>
    )

}