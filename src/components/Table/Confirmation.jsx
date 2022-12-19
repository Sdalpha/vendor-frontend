import {React, useState} from 'react'
import { GrClose } from "react-icons/gr";
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Confirmation({closeModal, vendorId, fetchTableData}) {

    const [load,setLoad]=useState(false)

    const deleteData = ()=>{
        setLoad(true)
        axios.delete(`${process.env.REACT_APP_DOMAIN_KEY}/api/vendor/deleteVendor/${vendorId}`)
        .then((res)=>{
            console.log(res)
            setLoad(false)
            if(res.status===200){
               
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




    //loader

if(load){
    return(<>
        <div className="mid_loader">Loading...</div>
    </>)
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
