import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { request } from "../utils/axios-utils";

const fetcher = () => {
  // return axios.get("http://localhost:4000/superheros");
  return request({url: "/superheros"});
};

const addSuperHero = (hero) => {
  // return axios.post("http://localhost:4000/superheros",hero);
  return request({url: "/superheros",method: "post",data: hero})
};

export function useSuperHeros(onSuccess, onError) {
  return useQuery("super-heros", fetcher, {
    onSuccess: onSuccess,
    onError: onError,
  });
}

export const useAddSuperHero = () => {
  const queryClient = useQueryClient();
  return useMutation(addSuperHero,{
    /////////////////////23.handing mutations////////////////////
    // onSuccess: (data) => {
    //       ////////////22.query invalidation///////////////
    //       //queryClient.invalidateQueries("super-heros")
    //   // queryClient.setQueryData("super-heros",(oldQueryData) => {
    //   //   return {
    //   //     ...oldQueryData,
    //   //     data: [...oldQueryData?.data,data?.data]
    //   //   }
    //   // })
    // }



    /////////////////optimistics updates (advanced)//////////////
    onMutate: async (newHero) => {
      await queryClient.cancelQueries("super-heros");
      const previousHeroData = queryClient.getQueryData("super-heros");
      queryClient.setQueryData("super-heros",(oldQueryData) => {
        return {
          ...oldQueryData,
          data: [
            ...oldQueryData.data,
            {id: oldQueryData?.data?.length + 1, ...newHero},
          ]
        }
        return {
          previousHeroData
        }
      })
    },
    onError: (_error,_hero,context) => {
      queryClient.setQueryData("super-heros",context.previousHeroData)
    },
    onSettled: () => {
      queryClient.invalidateQueries("super-heros")
    }
  });
}
