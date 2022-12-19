import React from 'react'
import { GrClose } from "react-icons/gr";
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Confirmation({closeModal, vendorId, fetchTableData}) {

    const deleteData = ()=>{
        axios.delete(`http://localhost:5000/api/vendor/deleteVendor/${vendorId}`)
        .then((res)=>{
            console.log(res)
            if(res.status===200){
                toast.success("Deleted Successfully")
                fetchTableData()
                closeModal(false)
            }else{
                toast.error(res.data.message)
            }
            
        }).catch((err)=>{
            console.log(err)
            toast.error(err.message)
        })
    }

  return (
    <div>
    <ToastContainer
/>
       <div className="modal">
      <div className="modalBody">
        <button
          className="close-btn"
          onClick={() => {
            closeModal(false);
          }}
        >
          <GrClose size={20} />
        </button>

        <div className="formbody">
          <h1>Delete </h1>
          <p>Are you sure to delete ?</p>
          <div className="button-row">
            <button className="btn-create" type="button" style={{backgroundColor: 'rgb(238, 59, 59)', color: 'white'}} onClick={deleteData}>Delete</button>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Confirmation
