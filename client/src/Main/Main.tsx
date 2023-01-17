import React from 'react';
import MainAppBar from "../MainAppBar/MainAppBar";
import {ItemList} from "../ItemList/ItemList";
import {useDispatch, useSelector} from "react-redux";
import {
    appSettingsMiniStore,
    filterOptionsMiniStore,
    itemsMiniStore,
    StoreState,
    userDataMiniStore
} from "../redux/miniStore";
import {ItemType} from "../Item/Item";
import {GET_ALL_PRODUCTS, SUBSCRIPTION_QUERY} from "../GraphQl/Schema";
import {loadProducts, updateProductLimit} from "../redux/itemsList/itemsListActions";
import {CURRENT_PAGE} from "../redux/appSettings/appSettingsReducers";
import {useSubscription} from "@apollo/client";
import {client} from "../App";
import Empty from "../assets/Empty.png";
import {Grid} from "@mui/material";
import {UserStatistics} from "../UserStatistics/UserStatistics";

export default function Main() {
    const [final, setFinal] = React.useState([]);
    const searchText = useSelector((state: StoreState) => filterOptionsMiniStore(state).searchText);
    const user = useSelector((state: StoreState) => userDataMiniStore(state).userData);
    const items = useSelector((state: StoreState) => itemsMiniStore(state).Products);
    const favorites: string[] = useSelector((state: StoreState) => itemsMiniStore(state).Favorites);
    const currentPage = useSelector((state: StoreState) => appSettingsMiniStore(state).currentPage);
    const [favoritesList, setFavoritesList] = React.useState(items.filter((item: ItemType) => favorites?.includes(item.id)));
    const dispatch = useDispatch();

    const {data, loading} = useSubscription(
        SUBSCRIPTION_QUERY,
        {
            variables: {
                userId: user.userId
            },
            onSubscriptionData: (data) => {
                console.log(data)
                data?.subscriptionData?.data?.cartUpdate && dispatch(updateProductLimit(data?.subscriptionData?.data?.cartUpdate))
            }
        }
    );


    React.useEffect(() => {
        console.log('InMain getAllProducts effect')

        client
            .query({
                query: GET_ALL_PRODUCTS,
                variables: {
                    userId: user.userId
                }
            })
            .then((result: any) => {
                    console.log('ImMain client effect')
                    dispatch(loadProducts(result.data.getProducts));
                    setFinal(result.data.getProducts);
                }
            );
    }, []);


    React.useEffect(() => {
        console.log('InMain item effect')
        if (items.length > 0) {
            const newList = items.filter((item: ItemType) => item.name.toLowerCase().includes(searchText.toLowerCase()));
            setFinal(newList);
            // setFavoritesList(newList.filter((item: ItemType) => favorites?.includes(item.id)));
        }
    }, [searchText]);

    React.useEffect(() => {
        console.log('InMain favorites effect')
        if (items.length > 0) {
            setFavoritesList(items.filter((item: ItemType) => favorites?.includes(item.id)))
        }
    }, [favorites])

    return (
        <>
            <MainAppBar/>
            {
                currentPage === CURRENT_PAGE.HOME_PAGE && <ItemList data={final}/>
            }
            {
                currentPage === CURRENT_PAGE.PROFILE_PAGE && <UserStatistics/>
            }
            {
                currentPage === CURRENT_PAGE.MY_ORDERS_PAGE && <div> My Orders </div>
            }
            {
                currentPage === CURRENT_PAGE.FAVORITES_PAGE && favoritesList.length > 0 &&
                <ItemList data={favoritesList}/>
            }
            {
                currentPage === CURRENT_PAGE.FAVORITES_PAGE && favoritesList.length === 0 &&
                <Grid container justifyContent={'center'} alignItems={'center'}>
                    <img src={Empty} className={"App-logo"} alt={"logo"} width={"65%"}/>
                </Grid>
            }
        </>
    )
}