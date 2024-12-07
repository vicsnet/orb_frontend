"use client"

import {Provider} from 'react-redux'
import {store} from './store'
import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink, gql, useQuery, } from '@apollo/client' ;

export function ReduxProvider({children}: {children: React.ReactNode}){
 const client = new ApolloClient({
    uri: 'https://happy-stallion-38.hasura.app/v1/graphql',
    
    // Replace with actual endpoint
    cache: new InMemoryCache(),
  });

    return     <Provider store={store}>
         <ApolloProvider client={client}>

        {children}
         </ApolloProvider>
    </Provider>
}