import React,{Fragment} from 'react';
import axios from "axios";
import { useInfiniteQuery } from 'react-query';

const colorsFetcher = ({pageParam = 1}) => {
    return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`)
}
function InfiniteQueries() {
  const {isLoading,isError,error,data,hasNextPage,fetchNextPage,isFetching,isFetchingNextPage} = useInfiniteQuery(["colors"],colorsFetcher,{
    getNextPageParam: (_lastPage,pages) => {
        if(pages.length < 4) {
            return pages.length + 1
        } else {
            return undefined;
        }
    }
  });
  
  if(isLoading) {
    return <p>Loading...</p>
  }

  if(isError) {
    return <p>{error.message}</p>
  }

  return (
    <div>
        <h1>Infinite Queries</h1>
        {
            data?.pages?.map((group,index) => {
                return (
                    <Fragment key={index}>
                        {
                            group?.data?.map(color => {
                                return <p key={color.id}>{color.id} {color.label}</p>
                            })
                        }
                    </Fragment>
                )
            })
        }
        
        <button onClick={fetchNextPage} disabled={!hasNextPage}>
            {isFetching && isFetchingNextPage ? "Loading..." : "Lode More"}
        </button>
    </div>
  )
}

export default InfiniteQueries