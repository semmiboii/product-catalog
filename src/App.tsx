import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';

import store from './redux/store';

import Layout from './components/UI/Layout';
import './App.css'

const queryClient = new QueryClient();

const router = createBrowserRouter([{
  path: '/',
  element: <Layout/>
}]);

function App() {

  return (
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <RouterProvider router={router}></RouterProvider>
        </Provider>
      </QueryClientProvider>
  )
}

export default App
