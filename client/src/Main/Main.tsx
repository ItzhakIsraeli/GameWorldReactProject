import React from 'react';
import MainAppBar from "../MainAppBar/MainAppBar";
import {ItemList} from "../ItemList/ItemList";
import Axios from "axios";
import {useSelector} from "react-redux";
import {filterOptionsMiniStore, StoreState} from "../redux/miniStore";
import {ItemType} from "../Item/Item";

export default function Main() {
    const [data, setData] = React.useState([]);
    const searchText = useSelector((state: StoreState) => filterOptionsMiniStore(state).searchText);
    const helper = React.useRef([]);

    React.useEffect(() => {
        helper.current.length > 0 && setData(helper.current.filter((item: ItemType) => item.name.toLowerCase().includes(searchText.toLowerCase())))
    }, [searchText])

    React.useEffect(() => {
        async function fetchData() {
            Axios.get('http://localhost:3001/products').then((response) => {
                helper.current = response.data;
                setData(response.data);
            })
        }

        fetchData().then(() => console.log('data fetch'));
    }, []);

    return (
        <>
            <MainAppBar/>
            <ItemList data={data}/>
        </>
    )
}