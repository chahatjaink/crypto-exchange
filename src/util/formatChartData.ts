import { OhlcData } from "lightweight-charts";

export function formatChartData(response: any): OhlcData[]  {
    const data: OhlcData[] = response.map((item: Array<OhlcData>) =>
    ({
        time: Number(item[0]) / 1000,
        open: item[1],
        close: item[2],
        high: item[3],
        low: item[4],
    })
    )
        .sort((a: OhlcData, b: OhlcData) => Number(a.time) - Number(b.time));

    return data;
}