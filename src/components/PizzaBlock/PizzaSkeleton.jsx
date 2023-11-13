import React from "react"
import ContentLoader from "react-content-loader"

const PizzaSkeleton = (props) => (
  <ContentLoader 
    className="pizza-block"
    speed={2}
    width={280}
    height={480}
    viewBox="0 0 280 480"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="134" cy="136" r="125" /> 
    <rect x="0" y="292" rx="7" ry="7" width="280" height="23" /> 
    <rect x="1" y="332" rx="10" ry="10" width="280" height="88" /> 
    <rect x="0" y="431" rx="12" ry="12" width="95" height="30" /> 
    <rect x="126" y="431" rx="27" ry="27" width="152" height="45" />
  </ContentLoader>
)

export default PizzaSkeleton