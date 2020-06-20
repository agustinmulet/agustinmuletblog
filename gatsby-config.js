module.exports = {
  siteMetadata: {
    title: `Blog de Agustin Mulet`,
    description: `Mi blog y CV`,
    headerTitle: `Agustin Mulet`,
    author: `@AgustinDMulet`,
    siteUrl: `https://agustinmulet.dev/`,
    image: `src/images/bg.jpg`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-chakra-ui`,
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
        excerpt_separator: `<!-- end -->`,
        plugins: [
          {
            resolve: `gatsby-remark-shiki`,
            options: {
              theme: "Material-Theme-Palenight",
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/components/layout.js`),
      },
    },
  ],
}
