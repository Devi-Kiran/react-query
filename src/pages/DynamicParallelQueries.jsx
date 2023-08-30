import React from 'react';
import axios from "axios";
import { useQueries } from 'react-query';

const heroFetcher = (heroId) => {
    return axios.get(`http://localhost:4000/superHeros/${heroId}`);
}

function DynamicParallelQueries({heroIds}) {
  const queryResults = useQueries(heroIds.map(id => {
    return {
        queryKey: ["super-hero",id],
        queryFn: () => heroFetcher(id)
    }
  }))
// useQueries([
//     {
//         queryKey: ["super-hero",1],
//         queryFn:  () => {
//             return axios.get(`http://localhost:4000/superHeros/1`);
//         }
//     },
//     {
//         queryKey: ["super-hero",2],
//         queryFn:  () => {
//             return axios.get(`http://localhost:4000/superHeros/2`);
//         }
//       }
// ])
  console.log(queryResults[0]?.data?.data.name);
  return (
    <div>
        <h1>Dynamic Parallel Queries</h1>
        <p>{queryResults[0]?.data?.data?.name} - {queryResults[0]?.data?.data?.alterName}</p>
        <p>{queryResults[1]?.data?.data?.name} - {queryResults[0]?.data?.data?.alterName}</p>
    </div>
  )
}

export default DynamicParallelQueries