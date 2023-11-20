import {
  createChartStyles,
  crossHairOptions,
  timescaleOptions,
  priceFormatOptions,
  candleStickOptions,
} from "@/components/OhlcChart/Ohlc.style";
import { OhlcLabelType } from "@/interface";
import {
  IChartApi,
  createChart,
  ISeriesApi,
  OhlcData,
} from "lightweight-charts";
import { useEffect, useRef, useState } from "react";

export default function useOhlcChart(
  label: OhlcLabelType,
  selectedCoin: string,
  ohlcvData: OhlcData[]
) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [ohlcLabel, setOhlcLabel] = useState<OhlcLabelType>(label);

  useEffect(() => {
    setOhlcLabel(label);
  }, [label]);

  useEffect(() => {
    if (chartContainerRef.current) {
      const chart: IChartApi = createChart(
        chartContainerRef.current,
        createChartStyles
      );
      chart.applyOptions(crossHairOptions);
      chart.subscribeCrosshairMove((param) => {
        const ohlcData = param?.seriesData?.entries().next().value;
        if (ohlcData) setOhlcLabel(ohlcData?.[1]);
        else setOhlcLabel(label);
      });

      chart.timeScale().applyOptions(timescaleOptions);
      const candlestickSeries: ISeriesApi<"Candlestick"> =
        chart.addCandlestickSeries();
      candlestickSeries.setData(ohlcvData);
      candlestickSeries.applyOptions({
        priceFormat: priceFormatOptions,
        title: selectedCoin.substring(1),
      });
      candlestickSeries.applyOptions(candleStickOptions);

      chart.timeScale().fitContent();
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
  }, [ohlcvData, label, selectedCoin]);

  return { chartContainerRef, ohlcLabel };
}
