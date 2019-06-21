import React from "react"

import SEO from "../components/seo"

const NotFoundPage = () => (
  <div className="wrapper index">
    <SEO title="404: Not found" />
    <h1>404 - No encontrado</h1>
    <p>
      No sé dónde quisiste entrar o cómo llegaste acá, pero por favor escribime
      para informarme si llegaste acá por error
      <span role="img" aria-label="smiling">
        😄
      </span>
    </p>
  </div>
)

export default NotFoundPage
