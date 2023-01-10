import React from 'react';
import MainAppBar from "../MainAppBar/MainAppBar";
import {ItemList} from "../ItemList/ItemList";
import {useDispatch, useSelector} from "react-redux";
import {appSettingsMiniStore, filterOptionsMiniStore, itemsMiniStore, StoreState} from "../redux/miniStore";
import {ItemType} from "../Item/Item";
import {GET_ALL_PRODUCTS} from "../GraphQl/Schema";
import {client} from "../App";
import {loadProducts} from "../redux/itemsList/itemsListActions";
import {CartUpdateSubscription} from "../GraphQl/Util";
import {CURRENT_PAGE} from "../redux/appSettings/appSettingsReducers";

export default function Main() {
    const [final, setFinal] = React.useState([]);
    const searchText = useSelector((state: StoreState) => filterOptionsMiniStore(state).searchText);
    const items = useSelector((state: StoreState) => itemsMiniStore(state).Products);
    const favorites: string[] = useSelector((state: StoreState) => itemsMiniStore(state).Favorites);
    const currentPage = useSelector((state: StoreState) => appSettingsMiniStore(state).currentPage);
    const [favoritesList, setFavoritesList] = React.useState(items.filter((item: ItemType) => favorites?.includes(item.id)));
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
            const newList = items.filter((item: ItemType) => item.name.toLowerCase().includes(searchText.toLowerCase()));
            setFinal(newList);
            setFavoritesList(newList.filter((item: ItemType) => favorites?.includes(item.id)))
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
            {
                currentPage === CURRENT_PAGE.HOME_PAGE && <ItemList data={final}/>
            }
            {
                currentPage === CURRENT_PAGE.PROFILE_PAGE && <div> Profile </div>
            }
            {
                currentPage === CURRENT_PAGE.MY_ORDERS_PAGE && <div> My Orders </div>
            }
            {
                currentPage === CURRENT_PAGE.FAVORITES_PAGE && <ItemList data={favoritesList}/>
            }
        </>
    )
}