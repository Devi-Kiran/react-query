import React from 'react';
import { useParams } from 'react-router-dom';
import useSuperHero from '../hooks/useSuperHero';

function RQSuperHeroPage() {
  const {heroId} = useParams();
  const {data,isLoading,isFetching,isError,error} =  useSuperHero(heroId);

  if(isLoading || isFetching) {
    return <p>Loading...</p>
  }

  if(isError) {
    return <p>{error.message}</p>
  }

  return (
    <div>
        <h1>Super hero details:</h1>
        <h2>{data.data.name} - {data.data.alterName}</h2>
    </div>
  )
}

export default RQSuperHeroPage;