import { GroupedData } from '@/interface'
import dynamic from 'next/dynamic'
import { MouseEventHandler, useEffect, useState } from 'react';
import { StyledDiv } from './styles/NoSSR.styles';

const NoSSR = dynamic(() => import('../Table/TickerTable'), { ssr: false })

export default function Tickers(props: { tickers: GroupedData | undefined, onClick: (symbol: string) => void }) {
    const [tickersData, setTickersData] = useState<GroupedData | undefined>(props.tickers);

    useEffect(() => {
        setTickersData(props.tickers)
    }, [props.tickers])

    return (
        <StyledDiv>
            <NoSSR tickers={tickersData} onClick={props.onClick} />
        </StyledDiv>
    )
}