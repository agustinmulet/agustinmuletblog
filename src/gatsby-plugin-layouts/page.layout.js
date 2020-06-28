import React from "react"
import Layout from "../components/layout"

const PageLayout = ({ children }) => {
  return <Layout>{children}</Layout>
}

export const BrowserPageLayout = PageLayout
export const SsrPageLayout = PageLayout
