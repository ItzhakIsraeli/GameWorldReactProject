import React from 'react';
import MainAppBar from "../MainAppBar/MainAppBar";
import {ItemList} from "../ItemList/ItemList";
import {useDispatch, useSelector} from "react-redux";
import {filterOptionsMiniStore, itemsMiniStore, StoreState} from "../redux/miniStore";
import {ItemType} from "../Item/Item";
import {GET_ALL_PRODUCTS} from "../GraphQl/Schema";
import {client} from "../App";
import {loadProducts} from "../redux/itemsList/itemsListActions";
import {CartUpdateSubscription} from "../GraphQl/Util";

export default function Main() {
    const [final, setFinal] = React.useState([]);
    const searchText = useSelector((state: StoreState) => filterOptionsMiniStore(state).searchText);
    const items = useSelector((state: StoreState) => itemsMiniStore(state).Products);
    const dispatch = useDispatch();

    CartUpdateSubscription(dispatch);

    React.useEffect(() => {
        client
            .query({
                query: GET_ALL_PRODUCTS,
            })
            .then((result) => {
                    dispatch(loadProducts(result.data.getProducts));
                    setFinal(result.data.getProducts);
                }
            );

    }, []);

    React.useEffect(() => {
        if (items.length > 0) {
            setFinal(items.filter((item: ItemType) => item.name.toLowerCase().includes(searchText.toLowerCase())))
        }
    }, [searchText]);

    React.useEffect(() => {
        if (items.length > 0) {
            setFinal(items)
        }
    }, [items])

    return (
        <>
            <MainAppBar/>
            <ItemList data={final}/>
        </>
    )
}