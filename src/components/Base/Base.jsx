import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import CreateVendor from '../CreateVendor/CreateVendor'
import Table from '../Table/Table'
import "./Base.css"
import axios from "axios";

const Base = () => {

    const [modal,setModal] = useState(false);
    const [tableData,setTableData] = useState([]);
    const [currentPage,setCurrentPage] = useState(1);
    const [PerPage] = useState(10);
    const [load,setLoad]=useState(false)

    
    useEffect(()=>{
        fetchTableData()
    },[])

    const fetchTableData= async()=>{
        setLoad(true)
        await axios({
        method: "get",
        url: `${process.env.REACT_APP_DOMAIN_KEY}/api/vendor/getAllVendors`,
      }).then(res=>{
            if(res.status===200){
                setLoad(false)
                setTableData(res.data.data)
            }else{
                setLoad(false)
                alert("Something Went Wrong...")
            }
      }).catch(err=>{
            console.log(err)
            setLoad(false)
            alert("Something Went Wrong...")
      })
    }


    //loader

    if(load){
        return(<>
            <div className="mid_loader">Loading...</div>
        </>)
    }
    
    
    
    
    //get current post
    
    const indexOfLast = currentPage * PerPage;
    const indexOfFirst = indexOfLast - PerPage;
    const currentRow = tableData.slice(indexOfFirst, indexOfLast)


  return (
    <div className='baseContainer'>
        <div className="navContainer">
            <button className="btn-create" onClick={()=>{setModal(true)}}>Create Vendor</button>
        </div>
        <Table tableData={currentRow} PerPage={PerPage} totalRow={tableData.length} setCurrentPage={setCurrentPage} fetchTableData={fetchTableData} currentPage={currentPage}/>

    {
        modal && <CreateVendor closeModal={setModal} fetchTableData={fetchTableData} />
    }
        
    </div>
  )
}

export default Base
