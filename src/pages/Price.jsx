
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function Price (props){
    const apiKey = "your key here"
    const {symbol} = useParams()
    //https://rest.coinapi.io/v1/exchangerate/:asset_id_base/:asset_id_quote
    const url = `https://rest.coinapi.io/v1/exchangerate/${symbol}/USD?apikey=${apiKey}`

    const [coin, setCoin] = useState(null)

    const getCoin = async () => {
        try{
            const response = await fetch(url)
            const data = await response.json()
            setCoin(data)
        }catch(e){
            console.error(e)
        }
    }

    useEffect(() => {
        getCoin();
    }, [])

    const loaded = () => {
        return(
            <div>
                <h1>
                    {coin.asset_id_base}/{coin.asset_id_quote}
                </h1>
                <h2>{coin.rate}</h2>
            </div>
        )
    }

    const loading = () => {
        return <h1>Loading...</h1>
    }

    return coin && coin.rate ? loaded() : loading()
};
//   500471CE-96AB-4DCF-8396-2BFF89F113D6