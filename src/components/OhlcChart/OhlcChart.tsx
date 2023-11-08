import { Stack } from "@mui/material";
import { CrosshairMode, IChartApi, ISeriesApi, LineStyle, OhlcData, createChart } from "lightweight-charts";
import { useEffect, useRef, useState } from "react";
import { config } from "../../configs/ohlcv.constant";
import { candleStickOptions, createChartStyles, timescaleOptions } from "@/util/config.styles";
import { OhlcLabelType } from "@/interface";
import OhlcLabel from "../OhlcLabel/OhlcLabel";

export default function OhlcChart(props: { ohlcvData: OhlcData[], label: OhlcLabelType }) {
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const [ohlcLabel, setOhlcLabel] = useState<OhlcLabelType>(props.label)

    useEffect(()=>{
        setOhlcLabel(props.label)
    },[props.label])

    useEffect(() => {
        if (chartContainerRef.current) {
            const chart: IChartApi = createChart(chartContainerRef.current, createChartStyles);
            chart.applyOptions({
                crosshair: {
                    mode: CrosshairMode.Magnet,
                    vertLine: {
                        width: 2,
                        color: '#C3BCDB44',
                        style: LineStyle.Solid,
                        labelBackgroundColor: config.crossHairColor,
                    },
                    horzLine: {
                        color: config.crossHairColor,
                        labelBackgroundColor: config.crossHairColor,
                    },
                },
            })
            chart.subscribeCrosshairMove((param) => {
                const ohlcData = param?.seriesData?.entries().next().value;
                if (ohlcData)
                    setOhlcLabel(ohlcData?.[1])
                else
                    setOhlcLabel(props.label)
            });
            chart.timeScale().applyOptions(timescaleOptions);
            const candlestickSeries: ISeriesApi<"Candlestick"> = chart.addCandlestickSeries();
            candlestickSeries.setData(props.ohlcvData);
            candlestickSeries.applyOptions(candleStickOptions);
            candlestickSeries.priceScale().applyOptions({
                scaleMargins: {
                    top: 0.1,
                    bottom: 0.2,
                },
            });
            return () => {
                chart.remove();
            };
        }
    }, [props.ohlcvData]);


    return (
        <>
            {ohlcLabel && <OhlcLabel label={ohlcLabel} />}
            <Stack ref={chartContainerRef} sx={{ cursor: 'crosshair' }} />
        </>
    )
}