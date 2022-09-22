import express from 'express'
import { ApolloServer } from 'apollo-server-express'
;(async () => {
  const server = new ApolloServer({ typeDefs, resolvers })

  const app = express()
  await server.start
  server.applyMiddleware({
    app,
    path: '/graphql',
    cors: {
      origin: ['http://localhost:3000'],
      credentials: true,
    },
  })
  await app.listen({ port: 8000 })
  console.log('sever listening on 8000')
})()
