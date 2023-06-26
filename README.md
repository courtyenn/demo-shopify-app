# App for Modelic

This is a demo Shopify App integration that embeds a page with a list of products into the admin panel. This project is meant to document what I've learned, next steps, and display my knowledge of developing on Shopify.

## What I learned

**Shopify CLI**

In order to develop on Shopify, one must learn the `shopify-cli`. It comes with essential tools to build an app, and/or custom theme. Underneath, it uses Ruby 3.0. I installed `rvm` to manage my Ruby installations because I had an older one installed.

**Shopify Partner**

Shopify Partner is a developer account that allows free access to some APIs: themes, and Storefront API / GraphQL. _I believe_ the Hydrogen headless CMS requires a consultation before I am allowed to install the app on my demo store.

**Theming**

My first idea was to build a custom theme. I figured it would be a great portfolio piece because I am tuned in to best design practices, SEO/A11y standards, animation and responsive code. I quickly ran into an [issue with M1 MacOs](https://github.com/Shopify/cli/issues/1260) and ceased work here.

- It is critical to understand [Shopify's Best Practices](https://shopify.dev/docs/themes/best-practices) when it comes to creating a theme, or an app.

**Admin App**

Creating an Admin App required a full understanding of systems. Unlike creating a theme that focuses on just the frontend code, an Admin App is a fullstack area of expertise. I first used a QR Code tutorial on Shopify's website, so a lot of the code in this repo does that the tutorial piece embedded.

- Shopify requires the app to look like Shopify using their UI System, Polaris.
- "App Bridge" JS Library to streamline embedding an app inside Admin

## Next steps

The intent behind this project was to display a list of products and give them code that will allow users to copy and paste into other websites for advertising purposes.

## Some unknowns

I'd like to know if admin apps are contained within their own page or if it can build widgets that live next to Shopify code

## **How to run the app**

0.) Have Shopify-CLI installed [The Shopify CLI](https://shopify.dev/docs/apps/tools/cli)

1.) Pull down source code locally on machine

2.) Have a Shopify Partner's test shop

3.) Go to Shopify Partner's dashboard, and retrieve the `Client ID`. This is the API key needed to run the app

4.) Have an ngrok account and an ngrok Client ID

4.) Install && run

Using yarn:

```shell
SHOPIFY_API_KEY=XXXX pnpm install && pnpm dev
```

Open the URL generated in your console. Once you grant permission to the app, you can start development. It'll ask for an ngrok api key
