import * as React from "react"

function AddPoint(props) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" {...props}>
      <path d="M12 0C8.852 0 6 2.553 6 5.702c0 4.682 4.783 5.177 6 12.298 1.217-7.121 6-7.616 6-12.298C18 2.553 15.149 0 12 0zm0 8a2 2 0 11-.001-3.999A2 2 0 0112 8zm12 16l-6.707-2.427L12 24l-5.581-2.427L0 24l4-9 3.96-1.584c.38.516.741 1.08 1.061 1.729l-3.523 1.41-1.725 3.88 2.672-1.01 1.506-2.687-.635 3.044 4.189 1.789L12 19.55l.465 2.024 4.15-1.89-.618-3.033 1.572 2.896 2.732.989-1.739-3.978-3.581-1.415c.319-.65.681-1.215 1.062-1.731L20.064 15 24 24z" />
    </svg>
  )
}

export default AddPoint