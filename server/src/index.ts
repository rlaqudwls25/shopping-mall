import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import schema from './schema'
import resolvers from './resolver'
import { DBField, readDB } from './dbController'
;(async () => {
  const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    csrfPrevention: true,
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
        'https://api.jin-shop.link:80',
        'https://studio.apollographql.com',
        'https://api.jin-shop.link:443',
        'https://api.jin-shop.link:8000',
      ],
      credentials: true,
    },
  })

  await app.listen({ port: 8000 })
  console.log('sever listening on 8000')
})()
