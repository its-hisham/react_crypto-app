import React, { useEffect,useState } from 'react'
import axios from 'axios'
import { server } from '../index'
import { Container, HStack, Heading, VStack,Text,Image} from '@chakra-ui/react';
import Loader from './Loader';
import ErrorComponent from './ErrorComponent';

const Coins = () => {

  const [coins,setCoins] =useState([]);
  const [loading,setloading] =useState(true);
  const [error,setError] =useState(false);
  const [page,setPage] =useState(1);
  const [currency,setCurrency] =useState("inr");

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
         <ExchangeCard name={i.name}  img={i.image} rank={i.trust_score_rank} url={i.url} key={i.id}/>
         
         )}
        </HStack>
        
        
        </>
      )}

    </Container>
  )
}



const ExchangeCard = ({name,img,rank,url})=>(
  
  <a href={url} target={'blank'}>

    <VStack w={'52'} shadow={"lg"} p="8" borderRadius={'lg'} transition={'all 0.3s'} m={'4'}   css={{
      '&:hover':{
        transform:'scale(1.1)'
      }
    }}>
      <Image src={img} w={'10'} h={'10'} objectFit={'contain'} alt={'Exchange'}/>
      <Heading size={'md'} noOfLines={'1'}>{rank}</Heading>
        
        <Text noOfLines={'1'}>{name}</Text>

    </VStack>

  </a>

)


export default Coins