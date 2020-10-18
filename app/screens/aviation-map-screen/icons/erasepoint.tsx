import * as React from "react"

function ErasePoint(props) {
  return (
    <svg width={24} height={24} fillRule="evenodd" clipRule="evenodd" {...props}>
      <path d="M5.662 23L.293 17.635a.996.996 0 010-1.414L15.222 1.293a1.001 1.001 0 011.414 0l7.071 7.073a.994.994 0 01.293.708.995.995 0 01-.293.707L12.491 21h5.514v2H5.662zm3.657-2l-5.486-5.486-1.419 1.414L6.49 21h2.829zm.456-11.429l-4.528 4.528 5.658 5.659 4.527-4.53-5.657-5.657z" />
    </svg>
  )
}

export default ErasePoint
