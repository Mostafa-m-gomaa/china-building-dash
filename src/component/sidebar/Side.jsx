import React from 'react'
import { Link } from 'react-router-dom'
import logo from "../../assets/logo.jpg"
import './side.css'


const Side = () => {
  const linkClick=()=>{
    document.querySelector(".side").classList.remove("side-show")
  }
  return (
 
 <div className="side">

<img src={logo} alt="" />
<div className="links">

    <Link onClick={linkClick} to="/orders">Orders</Link>
    <Link onClick={linkClick} className='add' to="/add-category"> + Category</Link>
    <Link onClick={linkClick} to="/delete-category"> - category</Link>
    <Link onClick={linkClick} className='add' to="/add-subCategory">+ Sub Category</Link>
    <Link onClick={linkClick} to="/delete-sub-category"> - sub category</Link>
    <Link onClick={linkClick} className='add' to="/add-sub-sub-category">+ sub-sub Category</Link>
    <Link onClick={linkClick} to="/delete-sub-sub"> - sub sub category </Link>
    <Link onClick={linkClick} className='add' to="/add-factory">+ Factory</Link>
    <Link onClick={linkClick} to="/delete-factory"> - actory </Link>
    <Link onClick={linkClick} className='add' to="/add-product">+ Product</Link>
    <Link onClick={linkClick} to="/delete-product"> -  product </Link>
    {/* <Link to="/d">Orders</Link> */}
    

</div>

 </div>
  )
}

export default Side
