import React from 'react'
import { useState ,useEffect } from 'react';
import { useContext } from 'react';
import { AppContext } from '../../App';
import './eleteSub.css'

const DeleteSub = () => {

    const {onload ,setOnload} =useContext(AppContext)

    const {showSuccess,setShowSuccess} =useContext(AppContext)
    const {showError ,setShowError} =useContext(AppContext)
    const {token,setToken}=useContext(AppContext)
  
    const [categoryData, setCategoryData] = useState([]);

    
    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionChange = (event) => {
        const selectedId = event.target.value;
        // const selected = categoryData.find((option) => option.id === selectedId);
        setSelectedOption(selectedId);
       
      
      };


  
 
  
    const handleSubmit = async (event) => {
        setOnload(true)
        event.preventDefault();
        fetch("https://api.sdcbm.com/api/destroy/subcateg/"+selectedOption,{
            method:'DELETE',
            headers: {
              'Authorization': `Bearer ${token}`
          }
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.status=="success"){
              setOnload(false)
              setShowSuccess(true)
            } else{
              setOnload(false)
              setShowError(true)
            }
        })
      };

      useEffect(()=>{
        fetch("https://api.sdcbm.com/api/showall/subcateg")
        .then(resp=>resp.json())
        .then(data=>setCategoryData(data))
    },[])
  return (
   <div className="delete-sub">
    <h1>Delete Sub Category</h1>

<form onSubmit={handleSubmit}>

<label>
        Select Sub Category
        <select value={selectedOption?.id} onChange={handleOptionChange}>
          <option value="">-- Select Sub Category</option>
          {categoryData.map((option) => (
            <option key={option.id} value={option.id}>
              {option.SubCateg_name}
            </option>
          ))}
        </select>
      </label>
     
     
      <button type="submit"  >Delete</button>
    </form>
   </div>
  )
}

export default DeleteSub
