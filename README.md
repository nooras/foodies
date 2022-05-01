# Foodies

mutation {
  reference_list: createTable(
    keyspaceName:"foodies",
    tableName:"users",
    ifNotExists:true
    partitionKeys: [ 
      { name: "id", type: {basic: UUID} }
    ]
    clusteringKeys: [
      { name: "email", type: {basic: TEXT}, order: "ASC" }
    ]

    values: [
    { name: "username", type: { basic: TEXT } },
    { name: "name", type: { basic: TEXT } },
    { name: "bio", type: { basic: TEXT } },
    { name: "password", type: { basic: TEXT } }]
  )
}

mutation {
  insertusers(
    value: {id: "00000000-0000-0000-0000-000000000000", email:"abcx@gmail.com", name: "abc", username: "uabc", bio:"bio abc", password:"abcpass" }
    options: { consistency: LOCAL_QUORUM }
  ) {
    value {
      email,
      name,
      username,
      bio, 
      password
    }
  }
}

## Final

<!-- mutation {
  reference_list: createTable(
    keyspaceName:"foodies",
    tableName:"users",
    ifNotExists:true
    partitionKeys: [ 
      { name: "email", type: {basic: TEXT} }
    ]
    clusteringKeys: [
      { name: "password", type: { basic: TEXT } }
    ]

    values: [
    { name: "id", type: { basic: UUID } },
    { name: "username", type: { basic: TEXT } },
    { name: "name", type: { basic: TEXT } },
    { name: "bio", type: { basic: TEXT } },
    ]
  )
} -->

mutation {
  reference_list: createTable(
    keyspaceName:"foodies",
    tableName:"users",
    ifNotExists:true
    partitionKeys: [ 
      { name: "email", type: {basic: TEXT} }
    ]
    # clusteringKeys: [
    #   { name: "email", type: {basic: TEXT} }
    # ]

    values: [
    { name: "id", type: { basic: UUID } },
    { name: "password", type: { basic: TEXT } }
    { name: "username", type: { basic: TEXT } },
    { name: "name", type: { basic: TEXT } },
    { name: "bio", type: { basic: TEXT } },
    ]
  )
}

mutation {
  insertusers(
    value: {id: "00000000-0000-0000-0000-000000000003", email:"abcxx@gmail.com", name: "abc", username: "uabc", bio:"bio abc", password:"abcpass" }
    options: { consistency: LOCAL_QUORUM }
  ) {
    value {
      email,
      name,
      username,
      bio, 
      password
    }
  }
}

query oneuser {
  users(value: { email:"abcxx@gmail.com"}) {
    values {
      email
      name
      username
      bio
      id
    }
  }
}