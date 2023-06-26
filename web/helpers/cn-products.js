/*
  Replaces the productId with product data queried from the Shopify GraphQL Admin API
*/
export function formatProductResponse(rawCodeData) {
  /* Instantiate a new GraphQL client to query the Shopify GraphQL Admin API */
  // const client = new shopify.api.clients.Graphql({
  //   session: res.locals.shopify.session,
  // })

  const result = rawCodeData.body.data?.products?.edges.map((prod) => ({
    ...prod.node,
    imageUrl: prod.node.images?.edges?.[0]?.node?.url,
  }))

  return result
}
