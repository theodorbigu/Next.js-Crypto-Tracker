
import {useState} from 'react';
import { motion } from 'framer-motion';
import Head from "next/head";
import Image from 'next/image';
import CoinList from '../components/CoinList';
import Layout from '../components/Layout';
import SearchBar from '../components/SearchBar';



export default function Home({filteredCoins}) {
  const [search, setSearch] = useState('');

  //Search bar:
  const allCoins = filteredCoins.filter(coin=>
    coin.name.toLowerCase().includes(search.toLowerCase())
    )
  
  const handleChange = e=>{
    e.preventDefault()

    setSearch(e.target.value.toLowerCase())
  };
  

  return (
    <div>
    <Head>
    <link rel="shortcut icon" type="image/ico" href="/favicon.ico" />
    </Head>
    <Layout>
        <div className="coin_app">
      <SearchBar type="text" placeholder='Search' onChange={handleChange}/>
      <CoinList filteredCoins={allCoins} />
        </div>
    </Layout>
    </div>
  )
}


export const getServerSideProps = async () => {
  const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');

  const filteredCoins = await res.json();

  return{
    props: {
      filteredCoins
    }
  };
};