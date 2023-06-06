import React, { useEffect,useState } from 'react'
import axios from 'axios'
import { server } from '../index'
import { Container, HStack, Heading, VStack,Text,Image, Button, RadioGroup, Radio} from '@chakra-ui/react';
import Loader from './Loader';
import ErrorComponent from './ErrorComponent';
import CoinCard from './CoinCard';

const Coins = () => {

  const [coins,setCoins] =useState([]);
  const [loading,setloading] =useState(true);
  const [error,setError] =useState(false);
  const [page,setPage] =useState(1);
  const [currency,setCurrency] =useState("inr");

  const currencySymbol= currency==="INR"? "₹" : currency==="EUR" ? "€" : "$"

  const changePage= (page)=> {
    setPage(page);
    setloading(true)
  }

  const btns=new Array(132).fill(1)

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
        <RadioGroup value={currency} onChange={setCurrency} p={8}>
          <HStack spacing={"4"}>
            <Radio value={"INR"}>INR</Radio>
            <Radio value={"USD"}>USD</Radio>
            <Radio value={"EUR"}>EUR</Radio>
            
          </HStack>
        </RadioGroup>
        
        <HStack justifyContent={'space-evenly'} wrap={"wrap"}>
         {coins.map((i)=>
         <CoinCard name={i.name}  img={i.image} symbol={i.symbol}  key={i.id} id={i.id} price={i.current_price} currencySymbol={currencySymbol}/>
         
         )}
        </HStack>

        

        <HStack w={"full"} overflow={"auto"} p={8}>
         {
          btns.map((items,index)=>(
            <Button key={index} bgColor={'blackAlpha.900'} color={'white'} onClick={()=>changePage(index+1)}>
            {index+1}
          </Button>
          ))
         }
        </HStack>
        
        
        </>
      )}

    </Container>
  )
}






export default Coins