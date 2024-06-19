/* eslint-disable */

const Card = (props) => {
  const { BIZPLC_NM, REFINE_ROADNM_ADDR, TELNO } = props
  return (
    <>
      <div className={'map_list_box'}>
        <div>
          <h5>식당명:</h5>
          <h5>지번주소:</h5>
          <h5>전화번호:</h5>
        </div>
        <div style={{ marginLeft: '20px' }}>
          <p>{BIZPLC_NM}</p>
          <p>{REFINE_ROADNM_ADDR}</p>
          <p>{TELNO}</p>
        </div>
        {/*  식당명:*/}
        {/*  {BIZPLC_NM}*/}
        {/*</p>*/}
        {/*<p>지번주소: {REFINE_ROADNM_ADDR}</p>*/}
        {/*<p>전화번호: {TELNO}</p>*/}
      </div>
    </>
  )
}

export default Card
