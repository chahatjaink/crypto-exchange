export const config = {
    API_URL: process.env.API_URL,
    WEBSOCKET_URL: process.env.WEBSOCKET_URL,
    defaultGranularity: '30m',//default
    defaultCoin: 'tBTCUSD',//coin default
    defaultTimeframe: '3y',//timeframe default
    upColor: 'rgb(156, 204, 0)',
    downColor: 'rgb(225, 50, 85)',
    gridColor: '#444',
    crossHairColor: '#9B7DFF',
    granularityOptions: [
        '1m', '5m', '15m', '30m', '1h', '3h', '6h', '12h', '1D', '1W', '14D', '1M'
    ],
    // coinOptions: ['BTC', 'ETH', 'LTC'],
    timeFrameOptions: ['3y', '1y', '3m', '1m', '7d', '3d', '1d', '6h', '1h'],
    defaultColor:'#132b3f'
}
