/* eslint-disable */

import { useState, useEffect } from 'react'
import Pagination from 'react-js-pagination'

import { Nav, Button } from 'react-bootstrap'
import '../paging.css'

const Paging = ({ total, limit, page, setPage }) => {
  const numPages = Math.ceil(total / limit)

  return (
    <>
      <Nav className='paging_nav' style={{ display: 'block' }}>
        <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
          &lt;
        </Button>
        {Array(numPages)
          .fill()
          .map((_, i) => (
            <Button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              aria-current={page === i + 1 ? 'page' : undefined}
            >
              {i + 1}
            </Button>
          ))}
        <Button onClick={() => setPage(page + 1)} disabled={page === numPages}>
          &gt;
        </Button>
      </Nav>
    </>
  )
}

export default Paging
