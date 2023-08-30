import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import SuperHeroesPage from './pages/SuperHeroes';
import RQSuperHeroesPage from './pages/RQSuperHeroes';
import RQSuperHeroPage from './pages/RQSuperHero';
import ParalalQueriesPage from './pages/ParalalQueriesPage';
import DynamicParallelQueries from './pages/DynamicParallelQueries';
import DependentQueries from './pages/DependentQueries';
import PaginatedQueriesPage from './pages/PaginatedQueriesPage';
import InfiniteQueries from './pages/InfiniteQueries';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

function App() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/super-heroes" element={<SuperHeroesPage/>}/>
        <Route path="/rq-super-heroes" element={<RQSuperHeroesPage/>}/>
        <Route path="/rq-super-heroes/:heroId" element={<RQSuperHeroPage/>}/>
        <Route path="/rq-paralal-query" element={<ParalalQueriesPage/>}/>
        <Route path="/rq-dynamic-paralal-query" element={<DynamicParallelQueries heroIds={[1,3]}/>}/>
        <Route path="/rq-dependent-query" element={<DependentQueries email="ak333007@gmail.com"/>}/>
        <Route path="/rq-paginated-query" element={<PaginatedQueriesPage/>}/>
        <Route path="/rq-infinite-queries" element={<InfiniteQueries/>}/>
      </Routes>
      <ReactQueryDevtools initialIsOpen={false} position='bottom-right'/>
    </QueryClientProvider>
  );
}

export default App;
