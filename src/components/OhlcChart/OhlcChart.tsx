import { Stack } from "@mui/material";
import { CrosshairMode, IChartApi, ISeriesApi, LineStyle, OhlcData, createChart } from "lightweight-charts";
import { useEffect, useRef } from "react";
import { config } from "../../configs/ohlcv.constant";
import { candleStickOptions, createChartStyles, timescaleOptions } from "@/util/config.styles";

export default function OhlcChart(props: { ohlcvData: OhlcData[] }) {
    const chartContainerRef = useRef<HTMLDivElement>(null);

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
        <Stack ref={chartContainerRef} sx={{ cursor: 'crosshair' }} />)
}