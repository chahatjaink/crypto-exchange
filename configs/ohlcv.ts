export const config = {
    API_URL: process.env.API_URL,
    WEBSOCKET_URL: process.env.WEBSOCKET_URL,
    granularity: '30m',
    token: 'BTC',
    upColor: 'rgb(156, 204, 0)',
    downColor: 'rgb(225, 50, 85)',
    gridColor:'#444',
    crossHairColor: '#9B7DFF',
    granularityOptions:[
        '1m', '5m', '15m', '30m', '1h', '3h', '6h', '12h', '1D', '1W', '14D', '1M'
    ],
    tokenOptions:['BTC', 'ETH', 'LTC']
}
