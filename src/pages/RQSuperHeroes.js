import React,{useState} from 'react';
import {useSuperHeros,useAddSuperHero} from '../hooks/useSuperHeros';
import { Link } from 'react-router-dom';
// import { useQuery } from "react-query";
// import axios from "axios";

// const fetcher = () => {
//   return axios.get("http://localhost:4000/superheros")
// }

function RQSuperHeroesPage() {
  const onSuccess = (data) => {
    // console.log("successfully fetched data",data.data);
  }

  const onError = (error) => {
    // console.log("something is wrong",error.message);
  }

  const {data,isLoading,isError,error,isFetching,refetch} = useSuperHeros(onSuccess,onError);
  const [hero,setHero] = useState("");
  const [alterName,setAlterName] = useState("");
  const {mutate: addHero,isLoading: addLoading,isError: addIsError, error: addError} = useAddSuperHero();

  const addHeroSubmitHandler = (e) => {
    e.preventDefault();
    const heroObj = {name: hero,alterName: alterName};
    addHero(heroObj);
  }


  // const {data,isLoading,isError,error,isFetching,refetch} = useQuery("superHeroes",fetcher,{
  //   // cacheTime: 300000,

  //   // staleTime: 0,

  //   // refetchOnMount: true, ///it fetches data when page is focused, if its value is false 
  //                         ///then it fetches data only  single time

  //                         ///(true,false,"alsways")

  //   // refetchOnWindowFocus: true, ////automatically fetches data when focus on window

  //   // refetchInterval: 2000, ///////fetches data every 2seconds ex:stock prices

  //   // refetchIntervalInBackground: true, ///////it runs when window is not active also

  //   // enabled: false, it is used for fetch data when the button is clicked

  //   onSuccess: onSuccess, ////perform side effect when data fetched successfully

  //   onError: onError, ////perform side effect when data is not fetched

  //   // select: (data) => {
  //   //    return  data.data.map(hero => hero.name)
  //   // } //to receive required data from objects
  // });

  
  if(isLoading) {
    return <p>Loading...</p>
  }

  if(isError) {
    return <p>{error.message}</p>
  }


  return (
    <div>
      <h1>RQ Super Heroes</h1>
      <form onSubmit={addHeroSubmitHandler}>
        <input onChange={(e) => setHero(e.target.value)} placeholder="hero name"/>
        <input onChange={(e) => setAlterName(e.target.value)} placeholder="alter hero name"/>
        <button>add hero</button>
      </form>
      <button onClick={refetch}>fetch data</button>
      {/* {
        data.map(hero => {
          return <p key={hero}><b>{hero}</b></p>
        })
      } */}
      {
        data?.data.map(hero => {
          return <p key={hero.id}><Link to={`/rq-super-heroes/${hero.id}`}><b>{hero.name}</b></Link></p>
        })
      }
    </div>
  )
}

export default RQSuperHeroesPage