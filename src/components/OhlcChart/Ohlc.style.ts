import { config } from "@/configs/ohlcv.constant"
import { CrosshairMode, DeepPartial, LineStyle, LineWidth } from "lightweight-charts"

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

export const crossHairOptions = {
    crosshair: {
        mode: CrosshairMode.Magnet,
        vertLine: {
            width: 2 as unknown as DeepPartial<LineWidth>,
            color: '#C3BCDB44',
            style: LineStyle.Solid,
            labelBackgroundColor: config.crossHairColor,
        },
        horzLine: {
            color: config.crossHairColor,
            labelBackgroundColor: config.crossHairColor,
        },
    },
}

export const priceFormatOptions = {
    type: 'price' as const,
    precision: 0,
    minMove: 1,
}



export const candleStickOptions = {
    wickUpColor: config.upColor,
    upColor: config.upColor,
    wickDownColor: config.downColor,
    downColor: config.downColor,
    borderVisible: false,
}