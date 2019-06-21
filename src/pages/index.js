import React from "react"

import SEO from "../components/seo"

const IndexPage = () => (
  <div className="wrapper index">
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <h1 className="salutation">
      Hola! <span role="img" aria-label="Mano saludando">👋</span> 
      <br/>
      Esta es mi página y blog personal
    </h1>
  </div>
)

export default IndexPage
