import { useQuery, useQueryClient } from "react-query";
import axios from "axios"; 

const fetcher = ({ queryKey }) => {
  const heroId = queryKey[1];
  return axios.get(`http://localhost:4000/superheros/${heroId}`);
};

function useSuperHero(heroId) {
  const queryClient = useQueryClient();
  return useQuery(["super-hero", heroId], fetcher, {
    initialData: () => {
      const hero = queryClient
        .getQueryData("super-heros")
        ?.data?.find((hero) => hero.id === parseInt(heroId));
      if (hero) {
        return { data: hero };
      } else {
        return undefined;
      }
    },
  });
}

export default useSuperHero;

// /////////regular code ///////////
// import { useQuery } from "react-query";
// import axios from "axios";

// const fetcher = ({queryKey}) => {
//     const heroId = queryKey[1];
//     return axios.get(`http://localhost:4000/superheros/${heroId}`);
// };

// function useSuperHero(heroId) {
//   return useQuery(["super-hero",heroId],fetcher)
// }

// export default useSuperHero;
