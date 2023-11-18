import { config } from "@/configs/ohlcv.constant";
import { OhlcLabelType } from "@/interface";
import { useSelector } from "react-redux";

export default function OhlcLabel(props: { label: OhlcLabelType }) {
    const coin = useSelector((state: any) => state.coin.coin)
    const ocDiff = Number((props.label.close - props.label.open).toFixed(2))
    const isNeg = ocDiff <= 0
    const updatedDiff = isNeg ? ocDiff : `+${ocDiff}`
    const diffPercentage = ((ocDiff * 100) / (props.label.open)).toFixed(2)
    const colorAtt = { color: ocDiff > 0 ? config.upColor : config.downColor }
    return (
        <div>
            <p style={{ color: 'grey' }}>
                &nbsp;<span style={{ color: 'white' }}>{coin.substring(1, 4)}/{coin.substring(4)}</span>
                &nbsp;O <span style={colorAtt}>{props.label.open}</span>&nbsp;
                H <span style={colorAtt}>{props.label.high}</span>&nbsp;
                L <span style={colorAtt}>{props.label.low}</span>&nbsp;
                C <span style={colorAtt}>{props.label.close} {updatedDiff}({isNeg ? diffPercentage : `+${diffPercentage}`}%)</span>
            </p>
        </div>
    )
}