import React, {useState} from 'react';
import MainAppBar from "../MainAppBar/MainAppBar";
import {ItemList} from "../ItemList/ItemList";
import Axios from "axios";

export default function Main() {

    const [data, setData] = useState([]);

    Axios.get('http://localhost:3001/products').then((response) => {
        setData(response.data);
    })

    return (
        <>
            <MainAppBar/>
            <ItemList data={data}/>
        </>
    )
}