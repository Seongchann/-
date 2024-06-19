/* eslint-disable */
import Card from './Card'

const RestaurantList = ({ data, offset, limit }) => {
  return (
    <>
      {data
        .slice(offset, offset + limit)
        .map((a, i) =>
          data[i + offset] &&
          data[i + offset].REFINE_ROADNM_ADDR !== null &&
          data[i].REFINE_ROADNM_ADDR ? (
            <Card key={i} {...a} />
          ) : (
            <p>안뜸</p>
          )
        )}
    </>
  )
}

export default RestaurantList
