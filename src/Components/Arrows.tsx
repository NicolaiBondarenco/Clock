import React from 'react'

interface IProps {
  ternArrow: number
  classWrapper: string
  classArrow: string
}

const Arrows: React.FC<IProps> = ({ ternArrow, classWrapper, classArrow }) => {
  return (
    <div className={classWrapper}>
      <div
        className={classArrow}
        style={{ transform: `rotateZ(${ternArrow}deg)` }}
      ></div>
    </div>
  )
}
export default Arrows
