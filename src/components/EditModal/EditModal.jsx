import React from "react";
import "./EditModal.css";
import { GrClose } from "react-icons/gr";
import { useFormik } from "formik";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditModal({ closeModal,fetchTableData, editData }) {


  const formik = useFormik({
    initialValues: {
      vendorName: editData.vendorName,
      bankAccountNo: editData.bankAccountNo,
      bankName: editData.bankName,
      addressOne: editData.addressOne,
      addressTwo: editData.addressTwo,
      city: editData.city,
      country: editData.country,
      zipCode: editData.zipCode,
      vendorId: editData._id
    },
    onSubmit: (value) => {
      fetchData(value);
    },
  });

  const fetchData = async (data) => {
    console.log(data);
    data.vendorId = editData._id
    await axios({
        method: "PUT",
        url: `http://localhost:5000/api/vendor/vendorEdit`,
        data: data,
      }).then(res=>{
            if(res.status===200){
                toast.success(res.data.message)
                fetchTableData()
                
            }else{
              toast.error(res.data.message)
            }
      }).catch(err=>{
            console.log(err)
            toast.error(err.message)
      })
  };



  return (
    <div className="modal">
    <ToastContainer/>
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
          <div className="input-row">
          {formik.errors.vendorName && formik.touched.vendorName ? (
              <div style={{ color: "red" }}>{formik.errors.vendorName}</div>
            ) : null}
            <label htmlFor="vendorName">Vendor Name</label>
            <input 
            type="text" 
            name="vendorName"
            value={formik.values.vendorName}
            onChange={formik.handleChange}
            />
          </div>
          <div className="input-row">
          {formik.errors.bankAccountNo && formik.touched.bankAccountNo ? (
              <div style={{ color: "red" }}>{formik.errors.bankAccountNo}</div>
            ) : null}
            <label htmlFor="bankAccountNo">Bank Account Number</label>
            <input 
            type="text" 
            name="bankAccountNo"
            value={formik.values.bankAccountNo}
            onChange={formik.handleChange}
            />
          </div>
          <div className="input-row">
          {formik.errors.bankName && formik.touched.bankName ? (
              <div style={{ color: "red" }}>{formik.errors.bankName}</div>
            ) : null}
            <label htmlFor="bankName">Bank Name</label>
            <input 
            type="text" 
            name="bankName"
            value={formik.values.bankName}
            onChange={formik.handleChange}
            />
          </div>
          <div className="input-row">
            <label htmlFor="addressOne">Address One</label>
            <input 
            type="text" 
            name="addressOne"
            value={formik.values.addressOne}
            onChange={formik.handleChange}
            />
          </div>
          <div className="input-row">
            <label htmlFor="addressTwo">Address Two</label>
            <input 
            type="text" 
            name="addressTwo"
            value={formik.values.addressTwo}
            onChange={formik.handleChange}
            />
          </div>
          <div className="input-row">
            <label htmlFor="city">City</label>
            <input 
            type="text" 
            name="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            />
          </div>
          <div className="input-row">
            <label htmlFor="country">Country</label>
            <input 
            type="text" 
            name="country"
            value={formik.values.country}
            onChange={formik.handleChange}
            />
          </div>
          <div className="input-row">
            <label htmlFor="zipCode">Zip Code</label>
            <input 
            type="text" 
            name="zipCode"
            value={formik.values.zipCode}
            onChange={formik.handleChange}
            />
          </div>
          <div className="button-row">
            <button className="btn-create" type="button" style={{backgroundColor: 'rgb(233, 190, 34)', color: 'white'}} onClick={(e)=>{
                e.preventDefault()
                formik.handleSubmit()
            }}>Update</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditModal;
