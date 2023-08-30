import React, { useEffect, useState } from "react";
import axios from "axios";

function SuperHeroesPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error,setError] = useState("");

  useEffect(() => {
      axios.get("http://localhost:4000/superheros").then((res) => {
        setLoading(false);
        setData(res.data);
      }).catch(e => {
        setError(e.message);
      })
  },[]);


  if(error) {
    return <p>{error}</p>
  }

  if(loading) {
    return <p>Loading...</p>
  }

  return (
  <div>
    <h1>super heroes</h1>
    {data?.map(hero => {
      return <p key={hero.id}><b>{hero.name}</b></p>
    })}
  </div>
  )
}

export default SuperHeroesPage;
