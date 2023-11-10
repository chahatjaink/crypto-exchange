import { Stack } from "@mui/material";
import { IChartApi, ISeriesApi, OhlcData, createChart } from "lightweight-charts";
import { useEffect, useRef, useState } from "react";
import { candleStickOptions, createChartStyles, crossHairOptions, priceFormatOptions, timescaleOptions } from "./Ohlc.style";
import { OhlcLabelType } from "@/interface";
import OhlcLabel from "../OhlcLabel/OhlcLabel";

export default function OhlcChart(props: { ohlcvData: OhlcData[], label: OhlcLabelType, coin: string }) {
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const [ohlcLabel, setOhlcLabel] = useState<OhlcLabelType>(props.label)

    useEffect(() => {
        setOhlcLabel(props.label)
    }, [props.label])

    useEffect(() => {
        if (chartContainerRef.current) {
            const chart: IChartApi = createChart(chartContainerRef.current, createChartStyles);
            chart.applyOptions(crossHairOptions)
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
            candlestickSeries.applyOptions({
                priceFormat: priceFormatOptions,
                title: props.coin.substring(1),
            })
            candlestickSeries.applyOptions(candleStickOptions);

            chart.timeScale().fitContent()
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
            {ohlcLabel && <OhlcLabel label={ohlcLabel} coin={props.coin} />}
            <Stack ref={chartContainerRef} sx={{ cursor: 'crosshair' }} />
        </>
    )
}