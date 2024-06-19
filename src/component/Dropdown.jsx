/* eslint-disable */

import '../dropdown.css'

const Dropdown = ({ setDropData, dropData }) => {
  console.log(dropData)
  return (
    <>
      {dropData.map((a, i) => {
        if (i !== 0)
          return (
            <li
              key={i}
              onClick={() => {
                let copy = dropData
                  .filter((x) => x === dropData[i])
                  .concat(dropData.filter((x) => x !== dropData[i]))
                // let copy = [...dropData]
                // copy[(dropData[i + 1], dropData[i], dropData[i + 2])]
                // setDropData(copy)
                setDropData(copy)
              }}
            >
              {dropData[i]}
            </li>
          )
      })}
    </>
  )
}

export default Dropdown
