import { ApolloClient } from 'apollo-client'
import { ApolloProvider, useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory'
import React from 'react'
import ReactDOM from 'react-dom'

import { resolvers, typeDefs } from './resolvers'
import Login from './pages/login'

import injectStyles from './styles'
import Pages from './pages'

const IS_LOGGED_IN = gql`
    query IsUserLoggedIn {
        isLoggedIn @client
    }
`

const cache = new InMemoryCache()

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
    cache,
    link: new HttpLink({
        uri: 'http://localhost:4000/graphql',
        headers: {
            authorization: localStorage.getItem('token'),
        },
    }),
    typeDefs,
    resolvers,
});

cache.writeData({
    data: {
        isLoggedIn: !!localStorage.getItem('token'),
        cartItems: [],
    },
})

injectStyles()

ReactDOM.render(
    <ApolloProvider client={client}>
        <IsLoggedIn />
    </ApolloProvider>,
    document.getElementById('root')
)

function IsLoggedIn() {
    const { data } = useQuery(IS_LOGGED_IN);
    return data.isLoggedIn ? <Pages /> : <Login />;
}
