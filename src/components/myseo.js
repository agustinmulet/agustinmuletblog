import React from "react"
import Seo from "react-seo-component"
import { useSiteMetadata } from "../hooks/useSiteMetadata"

export default function MySEO({ pageTitle = "Blog" }) {
  const {
    title,
    image,
    siteLocale,
    twitterUsername,
    siteUrl,
    siteLanguage,
    description,
  } = useSiteMetadata()
  return (
    <Seo
      title={pageTitle}
      titleTemplate={title}
      titleSeparator={`|`}
      description={description}
      image={`${siteUrl}${image}`}
      pathname={siteUrl}
      siteLanguage={siteLanguage}
      siteLocale={siteLocale}
      twitterUsername={twitterUsername}
    />
  )
}
