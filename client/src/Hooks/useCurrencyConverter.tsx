import {useEffect, useState} from 'react';

export const useCurrencyConverter = (amount: number) => {
    const [convertedAmount, setConvertedAmount] = useState(0);

    useEffect(() => {

        const convert = async () => {
            const response = await fetch(`https://api.exchangerate-api.com/v4/latest/ILS`);
            const data = await response.json();
            const rate = data.rates.USD;
            setConvertedAmount(amount * rate);
        };
        convert();
    }, [amount]);

    return convertedAmount;
}