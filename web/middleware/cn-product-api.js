import express from "express"

import shopify from "../shopify.js"
import {
  getQrCodeOr404,
  getShopUrlFromSession,
  parseQrCodeBody,
  formatQrCodeResponse,
} from "../helpers/qr-codes.js"
import { formatProductResponse } from "../helpers/cn-products.js"

const SHOP_DATA_QUERY = `
 query productData($first: Int!) {
  products(first: $first) {
    edges {
      node {
        id
        title
        handle
        images(first: 1) {
          edges {
            node {
              url
            }
          }
        }
      }
    }
  }
}
`
export default function applyProductApiEndpoints(app) {
  // app.get("/api/products", async (req, res) => {
  app.use(express.json())

  app.get("/api/shop-data2", async (req, res) => {
    const shopUrl = await getShopUrlFromSession(req, res)
    console.log(
      "I AM TESTING$$$$$$$$$$$$$$$$$$",
      res.locals?.shopify?.session?.shop
    )
    const client = new shopify.api.clients.Graphql({
      session: res.locals.shopify.session,
    })

    /* Fetch shop data, including all available discounts to list in the QR code form */
    const shopData = await client.query({
      data: {
        query: SHOP_DATA_QUERY,
        variables: {
          first: 10,
        },
      },
    })

    const response = formatProductResponse(shopData)
    console.log("response", response)

    res.send(response)
  })
  // })
}
