import { CrosshairMode, LineStyle } from "lightweight-charts"
import { config } from "../../configs/ohlcv"

export const dropdownStackStyles = {
    position: "absolute",
    backgroundColor: "white",
    zIndex: 10,
    marginTop: "20px",
}

export const createChartStyles = {
    width: 1350, height: 750, layout: {
        background: { color: '#222' },
        textColor: '#DDD',
    },
    grid: {
        vertLines: { color: config.gridColor },
        horzLines: { color: config.gridColor },
    },
}

export const timescaleOptions={
    ticksVisible: true,
    timeVisible: true,
    borderColor: '#71649C',
    barSpacing: 10,
    fixRightEdge: true,
    rightBarStaysOnScroll: true
}

export const candleStickOptions ={
    wickUpColor: config.upColor,
    upColor: config.upColor,
    wickDownColor: config.downColor,
    downColor: config.downColor,
    borderVisible: false,
}