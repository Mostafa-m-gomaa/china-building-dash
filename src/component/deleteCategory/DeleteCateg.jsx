import React from 'react'
import { useState ,useEffect } from 'react';
import { useContext } from 'react';
import { AppContext } from '../../App';
import './deleteCateg.css'

const DeleteCateg = () => {
    const {onload ,setOnload} =useContext(AppContext)
  
    const [categoryData, setCategoryData] = useState([]);
    const {showSuccess,setShowSuccess} =useContext(AppContext)
    const {showError ,setShowError} =useContext(AppContext)

    
    const [selectedOption, setSelectedOption] = useState(null);
    const {token,setToken}=useContext(AppContext)
    const handleOptionChange = (event) => {
        const selectedId = event.target.value;
        // const selected = categoryData.find((option) => option.id === selectedId);
        setSelectedOption(selectedId);
       
      
      };


  
 
  
    const handleSubmit = async (event) => {
        setOnload(true)
        event.preventDefault();
        fetch("https://api.sdcbm.com/api/destroy/categ/"+selectedOption,{
            method:'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`
          }
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.status=="success"){
              setShowSuccess(true)
              setOnload(false)
            } else {
              setShowError(true)
              setOnload(false)
            }
        })
      };

      useEffect(()=>{
        fetch("https://api.sdcbm.com/api/showall/categ")
        .then(resp=>resp.json())
        .then(data=>setCategoryData(data))
    },[])
  return (
   <div className="delete-categ">
    <h1>Delete Category</h1>

<form onSubmit={handleSubmit}>

<label>
        Select Category
        <select value={selectedOption?.id} onChange={handleOptionChange}>
          <option value="">-- Select Category</option>
          {categoryData.map((option) => (
            <option key={option.id} value={option.id}>
              {option.Category_name}
            </option>
          ))}
        </select>
      </label>
     
     
      <button type="submit"  >Delete</button>
    </form>
   </div>
  )
}

export default DeleteCateg
