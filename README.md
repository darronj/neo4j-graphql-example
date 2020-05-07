# Neo4j GraphQL example

This project shows a graphql layer on top of Neo4J.

If you don't have a database instance, feel free to use the [free online sandbox](https://neo4j.com/sandbox/)

Documentation for neo4j-graphql.js can be found [here](https://grandstack.io/docs/neo4j-graphql-js.html)

To launch, add a .env file with the following variables defined.

```
NEO4J_CLUSTER=<YOUR CLUSTER BOLT ADDRESS>
NEO4J_USER=<YOUR USER>
NEO4J_PASSWORD=<YOUR PASSWORD>

* optional *
NEO4J_DEBUG // default to false set to true if you want to see the logging
PORT=<YOUR CUSTOM PORT>
```

Launch the server by running

```
npm start
```

Open a browser to [http://localhost:3000](http://localhost:3000/graphql) and enjoy.

Example queries can be found in the [queries.gql file](queries.gql)
