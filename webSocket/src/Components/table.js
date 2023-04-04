import React, {useState, useEffect} from 'react';
import "./tabel.css"
import Loading from "./loading";

const URL_WEB_SOCKET = 'wss://stream.binance.com:9443/ws';
const request = {
    method: 'SUBSCRIBE',
    params: ['!ticker@arr'],
    id: 1
};
/* table Component */
const Table = () => {
    const [ws, setWs] = useState(null);
    const [trades, setTrades] = useState([]);

    /* webSocket and UpdateData */
    useEffect(() => {
        const wsClient = new WebSocket(URL_WEB_SOCKET);
        console.log(wsClient)
        wsClient.onopen = () => {
            setWs(wsClient);
            wsClient.send(JSON.stringify(request));
        };
        console.log(wsClient)

        wsClient.onclose = () => console.log('ws closed');
        return () => {
            wsClient.close();
        };
    }, []);
    console.log(trades)

    useEffect(() => {
        if (ws) {
            ws.onmessage = (evt) => {
                const trade = JSON.parse(evt.data);
                const newTrades = [trades];
                addTradeToList(trade, newTrades);

            };
        }
    }, [ws, trades]);
    const addTradeToList = (trade, newTrades) => {
        if (newTrades.length >= 20) {
            newTrades.shift();
            newTrades = trade;
            setTrades(newTrades);
        } else {
            newTrades = trade;
            setTrades(newTrades);
        }
    };
    if (trades.length > 1) {
        return (
            <main class="main-wrap">

                <div class="main-grid-item">
                    {trades.map((item, index) => (
                        <div className="item-list">
                            <span className="push-right">{item.s}</span>
                            <div className="text-clip">
                                <div className=" text-big ">{item.c}</div>

                                <div
                                    className={Number(item.P) < 0 ? "color-red text-small " : "color-green text-small "}>{Number(item.P) < 0 ? item.P : "+" + item.P}%
                                </div>
                            </div>
                        </div>

                    ))}
                </div>
            </main>

        );
    } else {
        return (
            <Loading/>
        )
    }
}
export default Table