import { OhlcLabelType } from "@/interface";

export default function OhlcLabel(props: { label: OhlcLabelType }) {
    const ocDiff = props.label.close - props.label.open
    const isNeg = ocDiff <= 0
    const updatedDiff = isNeg ? ocDiff : `+${ocDiff}`
    const diffPercentage = ((ocDiff * 100) / (props.label.open)).toFixed(2)
    const colorAtt = { color: ocDiff > 0 ? "green" : "red" }
    return (
        <div>
            <p style={{ color: 'grey' }}>
                &nbsp;O <span style={colorAtt}>{props.label.open}</span>&nbsp;
                H <span style={colorAtt}>{props.label.high}</span>&nbsp;
                L <span style={colorAtt}>{props.label.low}</span>&nbsp;
                C <span style={colorAtt}>{props.label.close} {updatedDiff}({isNeg ? diffPercentage : `+${diffPercentage}`}%)</span>
            </p>
        </div>
    )
}