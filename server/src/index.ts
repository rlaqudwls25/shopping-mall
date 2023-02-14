import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import schema from './schema'
import resolvers from './resolver'
import { DBField, readDB } from './dbController'
;(async () => {
  const clientUrl = 'https://shopping-mall-client-plum.vercel.app'

  const port = process.env.PORT || 8000
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
        '*',
        'https://studio.apollographql.com',
        'http://127.0.0.1:5173',
        clientUrl,
      ],
      credentials: true,
    },
  })

  await app.listen({ port })
  console.log('sever listening on 8000')
})()
