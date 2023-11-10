import { config } from "@/configs/ohlcv.constant";
import { OhlcLabelType } from "@/interface";

export default function OhlcLabel(props: { label: OhlcLabelType, coin: string }) {
    const ocDiff = Number((props.label.close - props.label.open).toFixed(2))
    const isNeg = ocDiff <= 0
    const updatedDiff = isNeg ? ocDiff : `+${ocDiff}`
    const diffPercentage = ((ocDiff * 100) / (props.label.open)).toFixed(2)
    const colorAtt = { color: ocDiff > 0 ? config.upColor : config.downColor }
    return (
        <div>
            <p style={{ color: 'grey' }}>
                &nbsp;<span style={{ color: 'white' }}>{props.coin.substring(1, 4)}/{props.coin.substring(4)}</span>
                &nbsp;O <span style={colorAtt}>{props.label.open}</span>&nbsp;
                H <span style={colorAtt}>{props.label.high}</span>&nbsp;
                L <span style={colorAtt}>{props.label.low}</span>&nbsp;
                C <span style={colorAtt}>{props.label.close} {updatedDiff}({isNeg ? diffPercentage : `+${diffPercentage}`}%)</span>
            </p>
        </div>
    )
}