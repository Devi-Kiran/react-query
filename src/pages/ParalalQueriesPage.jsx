import React from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';

const superHeroesFetcher = () => {
    return axios.get("http://localhost:4000/superheros")
}

const friendsFetcher = () => {
    return axios.get("http://localhost:4000/friends")
}

function ParalalQueriesPage() {
  const {data: superHeros} = useQuery(["superHeros"],superHeroesFetcher);
  const {data: friends} = useQuery(["friends"],friendsFetcher);
  console.log(superHeros?.data);
  console.log(friends?.data);
  return (
    <div>ParalalQueriesPage</div>
  )
}

export default ParalalQueriesPage