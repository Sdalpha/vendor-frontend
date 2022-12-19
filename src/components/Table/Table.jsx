import React, { useState } from 'react'
import EditModal from '../EditModal/EditModal';
import Pagination from './Pagination';
import "./Table.css";
import {FaEdit,FaTrash} from "react-icons/fa"
import Confirmation from './Confirmation';
 

const Table = ({tableData,PerPage,totalRow,setCurrentPage,fetchTableData,currentPage}) => {

    const [modal,setModal] = useState(false)
    const [editData,setEditData] = useState(false)
    const [deleteData,setDeleteData] = useState(false)
    const [vendorId,setVendorId] = useState("")


    const handleEdit = (data) =>{
        setModal(true)
        setEditData(data)
    }

    const handleDelete=(vendorId)=>{
        setDeleteData(true)
        setVendorId(vendorId)
    }

   
  return (
    <div className='tableContainer'>

    <table className='table-container'>
        <thead>
            <tr>
                <th>Vendor Name</th>
                <th>Bank Account No</th>
                <th>Bank Name</th>
                <th>Address</th>
                <th>City</th>
                <th>Country</th>
                <th>Zip Code</th>
                <th>...</th>
            </tr>
        </thead>
        <tbody>
        {
            tableData.length === 0 ? <tr>
                <td colSpan="8" className='text-center' >No Data</td>
            </tr> : null
        }
        {
            tableData.map((item,idx)=>(
                <tr key={idx}>
                <td>{item.vendorName}</td>
                <td>{item.bankAccountNo}</td>
                <td>{item.bankName}</td>
                <td>{item.addressOne}</td>
                <td>{item.city}</td>
                <td>{item.country}</td>
                <td>{item.zipCode}</td>
                <td className='action_td'>
                    <button onClick={()=>{
                        handleEdit(item)
                    }}><FaEdit/></button>
                    <button onClick={()=>{
                        handleDelete(item._id)
                    }} ><FaTrash/></button>
                </td>
            </tr>
            ))
        }
           
        </tbody>
    </table>
        <Pagination PerPage={PerPage} totalRow={totalRow} currentPage={currentPage} setCurrentPage={setCurrentPage}/>

        {
            modal && <EditModal closeModal={setModal} editData={editData} fetchTableData={fetchTableData}/>
        }
        {
            deleteData && <Confirmation closeModal={setDeleteData} fetchTableData={fetchTableData} vendorId={vendorId}/>
        }
       
    </div>
  )
}

export default Table