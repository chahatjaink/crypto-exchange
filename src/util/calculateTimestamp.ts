import { timestampGranularity } from "@/interface";

export function calculateUnixTimestampForTimeFrame(timeFrame: string): timestampGranularity | null {
    const currentDate = new Date().getTime();

    switch (timeFrame) {
        case '3y':
            return { timestamp: currentDate - (3 * 365 * 24 * 60 * 60 * 1000), granularity: '1W' };
        case '1y':
            return { timestamp: currentDate - (365 * 24 * 60 * 60 * 1000), granularity: '1D' };
        case '3m':
            return { timestamp: currentDate - (3 * 30 * 24 * 60 * 60 * 1000), granularity: '12h' };
        case '1m':
            return { timestamp: currentDate - (30 * 24 * 60 * 60 * 1000), granularity: '6h' };
        case '7d':
            return { timestamp: currentDate - (7 * 24 * 60 * 60 * 1000), granularity: '1h' };
        case '3d':
            return { timestamp: currentDate - (3 * 24 * 60 * 60 * 1000), granularity: '30m' };
        case '1d':
            return { timestamp: currentDate - (24 * 60 * 60 * 1000), granularity: '15m' };
        case '6h':
            return { timestamp: currentDate - (6 * 60 * 60 * 1000), granularity: '5m' };
        case '1h':
            return { timestamp: currentDate - (60 * 60 * 1000), granularity: '1m' };
        default:
            return null;
    }
}