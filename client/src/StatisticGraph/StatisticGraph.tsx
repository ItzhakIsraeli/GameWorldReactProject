import React from 'react';
import {Bar, BarChart, CartesianGrid, XAxis, YAxis,} from 'recharts';
import {client} from "../App";
import {GET_ORDER_TOTAL_PRICE_BY_DATE} from "../GraphQl/Schema";
import {useSelector} from "react-redux";
import {StoreState, userDataMiniStore} from "../redux/miniStore";

export const StatisticGraph = () => {
    const user = useSelector((state: StoreState) => userDataMiniStore(state).userData);
    const [data, setData] = React.useState([]);

    React.useEffect(() => {
        client
            .query({
                query: GET_ORDER_TOTAL_PRICE_BY_DATE,
                variables: {
                    email: user.email
                }
            })
            .then((result: any) => {
                    setData(result.data.getOrderTotalPriceByDate);
                    console.log('result', result);
                }
            );

    }, []);

    return (
        <BarChart width={600} height={600} data={data}>
            <Bar dataKey="totalPrice" fill="#f27185" animationDuration={4000}/>
            <CartesianGrid stroke="#ccc"/>
            <XAxis dataKey="date"/>
            <YAxis color={''}/>
        </BarChart>
    );
}
