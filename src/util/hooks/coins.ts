import { config } from '@/configs/ohlcv.constant';
import fetchCoins from '@/services/fetchCoins';
import { useEffect, useState } from 'react';

function useCoins(): Array<string> | undefined  {
    const [coinList, setCoinList] = useState<Array<string>>();

    useEffect(() => {
        const fetchSymbols = async () => {

            const response = await fetchCoins();
            setCoinList(response[0]);
        }
        fetchSymbols();
    },[]);

    return coinList;
}

export default useCoins;
