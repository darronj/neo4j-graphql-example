require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const neo4j = require('neo4j-driver');
const { makeAugmentedSchema } = require('neo4j-graphql-js');

const driver = neo4j.driver(
  process.env.NEO4J_CLUSTER,
  neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)
);

const typeDefs = `
  type Project {
    id: ID!
    name: String
    projectNumber: String
    location: String
    modules: [JobModule]
  }

  type Part {
    id: ID!
    partNumber: String
    name: String
    description: String
    csiId: String
    modules: [Related]
    modeledModules: [ModelRelated]
  }

  type Module {
    id: ID!
    sku: String
    parts: [Related]
    modeledParts: [ModelRelated]
    modelFiles: [ModeledBy]
    projects: [JobModule]
  }

  type ModelFile {
    id: ID!
    name: String
    modules: [ModeledBy]
  }

  type Related @relation(name:"CHILD"){
    from: Module
    to: Part
    quantity: Float
    unit: String
  }

  type ModelRelated @relation(name:"MODELED_CHILD"){
    from: Module
    to: Part
    quantity: Float
    unit: String
  }

  type ModeledBy @relation(name:"MODELED_BY"){
    from: ModelFile
    to: Module
    version: Int
  }

  type JobModule @relation(name:"CHILD") {
    from: Project
    to: Module
    quantity: Int
  }
`;

const schema = makeAugmentedSchema({
  typeDefs,
  config: {
    query: true,
    mutation: true,
    debug: process.env.NEO4J_DEBUG
  }
});

const server = new ApolloServer({
  schema,
  context: {
    driver
  }
});

console.log('Ready for launch. 3... 2... 1... 🚀 ');
server.listen(process.env.PORT, '0.0.0.0').then(({ url }) => {
  console.log(`GraphQL API ready at ${url}`);
});
