import { config } from "../configs/ohlcv.constant"

export const dropdownStackStyles = {
    flexDirection: 'row'
}

export const createChartStyles = {
    width: 1350, height: 680, layout: {
        background: { color: '#222' },
        textColor: '#DDD',
    },
    grid: {
        vertLines: { color: config.gridColor },
        horzLines: { color: config.gridColor },
    },
}

export const timescaleOptions = {
    ticksVisible: true,
    timeVisible: true,
    borderColor: '#71649C',
    barSpacing: 5,
    fixRightEdge: true,
    rightBarStaysOnScroll: true
}

export const candleStickOptions = {
    wickUpColor: config.upColor,
    upColor: config.upColor,
    wickDownColor: config.downColor,
    downColor: config.downColor,
    borderVisible: false,
}