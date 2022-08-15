import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './schema.js';
import resolvers from './resolvers.js'

const app = express();
const PORT = 8080;

app.use(express.static('public'));


app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true
}))

const server = app.listen(PORT, ()=> console.log(`Server listening at ${PORT}`));