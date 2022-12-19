import React from 'react'

function Pagination({PerPage,totalRow,setCurrentPage}) {

    const pageNumber = []

    for(var i=1;i<=Math.ceil(totalRow/PerPage);i++){
        pageNumber.push(i)
    }


  return (

      <ul id="pagination">
    
    {
        pageNumber.map(page=>(
            <li key={page} ><a href="!#" onClick={()=>{setCurrentPage(page)}}>{page}</a></li>
        ))
    }
    
  </ul> 

  )
}

export default Pagination
