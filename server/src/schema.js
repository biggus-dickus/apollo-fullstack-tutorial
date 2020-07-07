const fs = require('fs');
const { gql } = require('apollo-server');
const path = require('path');

// That's the only feasible way to push this crap to studio.apollographql.com
// (there MUST be schema.graphql in root).
// The "automatic" way described by those wankers does not work
const schema = fs.readFileSync(path.join(__dirname, '../', 'schema.graphql'));

const typeDefs = gql`${schema}`;

module.exports = typeDefs;
