module.exports = {
  siteMetadata: {
    title: `Blog de Agustin Mulet`,
    description: `Mi blog y CV`,
    headerTitle: `Agustin Mulet`,
    twitterUsername: `@AgustinDMulet`,
    authorName: `Agustin Mulet`,
    image: `/bg.jpg`,
    siteLanguage: `es-AR`,
    siteLocale: `es_ar`,
    siteUrl: `https://eloquent-gates-0552b9.netlify.app/`,
  },
  plugins: [
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-chakra-ui`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/posts`,
        name: `posts`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/images`,
        name: `images`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `agustinmuletblog`,
        short_name: `MiBlog`,
        start_url: `/`,
        background_color: `#4CAF50`,
        theme_color: `#C2FFA9`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-netlify-cms`,
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        google: {
          families: ["Muli"],
        },
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-shiki`,
            options: {
              theme: `Material-Theme-Palenight`,
            },
          },
        ],
      },
    },
    `gatsby-plugin-layouts`,
  ],
}
