import React, { useEffect,useState } from 'react'
import axios from 'axios'
import { server } from '../index'
import { Container, HStack, Heading, VStack,Text,Image} from '@chakra-ui/react';
import Loader from './Loader';
import ErrorComponent from './ErrorComponent';
import CoinCard from './CoinCard';

const Coins = () => {

  const [coins,setCoins] =useState([]);
  const [loading,setloading] =useState(true);
  const [error,setError] =useState(false);
  const [page,setPage] =useState(1);
  const [currency,setCurrency] =useState("inr");

  const currencySymbol= currency==="inr"? "₹" : currency==="eur"?"€":"$"

useEffect(() => {
  
const fetchCoins = async ()=> {
  try {

    const {data} =await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`)

  setCoins(data);
  
  setloading(false);
    
  } catch (error) {
    setError(true);
    setloading(false);
  }
};
fetchCoins(currency,page);  

}, [])

if (error) return <ErrorComponent message={"error while fetching.."}/>;

  return (
    <Container maxW={"container.xl"} >
      {loading? <Loader/>:(

        <>
        
        <HStack wrap={"wrap"}>
         {coins.map((i)=>
         <CoinCard name={i.name}  img={i.image} symbol={i.symbol}  key={i.id} id={i.id} price={i.current_price} currencySymbol={currencySymbol}/>
         
         )}
        </HStack>
        
        
        </>
      )}

    </Container>
  )
}






export default Coins