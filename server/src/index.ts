import express from 'express'
import { ApolloServer, Config, ExpressContext } from 'apollo-server-express'
import schema from './schema'
import resolvers from './resolver'
;(async () => {
  const server = new ApolloServer({ typeDefs: schema as any, resolvers })

  const app = express()
  await server.start()
  server.applyMiddleware({
    app,
    path: '/graphql',
    cors: {
      origin: ['http://localhost:3000', 'https://studio.apollographql.com'],
      credentials: true,
    },
  })
  await app.listen({ port: 8000 })
  console.log('sever listening on 8000')
})()
