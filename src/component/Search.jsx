/* eslint-disable */

const Search = ({ input, handleChange }) => {
  return (
    <>
      <input
        type='text'
        value={input}
        onChange={(e) => handleChange(e)}
        placeholder='검색어를 입력하세요'
      />
    </>
  )
}

export default Search
