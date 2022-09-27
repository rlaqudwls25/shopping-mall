import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import schema from './schema'
import resolvers from './resolver'
import { DBField, readDB } from './dbController'
;(async () => {
  const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    context: {
      db: {
        products: readDB(DBField.PRODUCTS),
        cart: readDB(DBField.CART),
      },
    },
  })

  const app = express()
  await server.start()
  server.applyMiddleware({
    app,
    path: '/graphql',
    cors: {
      origin: [
        'http://localhost:3000',
        'https://studio.apollographql.com',
        'http://127.0.0.1:5173',
      ],
      credentials: true,
    },
  })
  await app.listen({ port: 8000 })
  console.log('sever listening on 8000')
})()
