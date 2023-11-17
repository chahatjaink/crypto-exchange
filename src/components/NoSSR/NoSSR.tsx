import { GroupedData } from '@/interface'
import dynamic from 'next/dynamic'
import { MouseEventHandler, useEffect, useState } from 'react';
import { StyledDiv } from './styles/NoSSR.styles';

const NoSSR = dynamic(() => import('../Table/TickerTable'), { ssr: false })

export default function Tickers(props: { tickers: GroupedData | undefined, onClick: (symbol: string) => void }) {

    return (
        <StyledDiv>
            <NoSSR tickers={props.tickers} onClick={props.onClick} />
        </StyledDiv>
    )
}