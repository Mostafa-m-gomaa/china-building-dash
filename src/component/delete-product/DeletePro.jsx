import React from 'react'
import { useState ,useEffect } from 'react';
import { useContext } from 'react';
import { AppContext } from '../../App';
import './deletepro.css'

const DeletePro = () => {
    const {onload ,setOnload} =useContext(AppContext)
  
    const [categoryData, setCategoryData] = useState([]);

    const {showSuccess,setShowSuccess} =useContext(AppContext)
    const {showError ,setShowError} =useContext(AppContext)
    const {token,setToken}=useContext(AppContext)

    
    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionChange = (event) => {
        const selectedId = event.target.value;
        // const selected = categoryData.find((option) => option.id === selectedId);
        setSelectedOption(selectedId);
       
      
      };


  
 
  
    const handleSubmit = async (event) => {
        setOnload(true)
        event.preventDefault();
        fetch("https://api.sdcbm.com/api/destroy/product/"+selectedOption,{
          method:'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
        }
        })
        .then(res=>res.json())
        .then(data=>{
           if(data.status=="deleted successfully"){
            setOnload(false)
            setShowSuccess(true)
           }
           else{
            setOnload(false)
            setShowError(true)
           }
        })
      };

      useEffect(()=>{
        fetch("https://api.sdcbm.com/api/showall/products")
        .then(resp=>resp.json())
        .then(data=>setCategoryData(data))
    },[])

    

  return (
    <div className='delete-pro' >
      <h1>Delete Product</h1>

<form onSubmit={handleSubmit}>

<label>
        Select Product
        <select value={selectedOption?.id} onChange={handleOptionChange}>
          <option value="">-- Select Product</option>
          {categoryData.map((option) => (
            <option key={option.id} value={option.id}>
              {option.prod_name}
            </option>
          ))}
        </select>
      </label>
     
     
      <button type="submit"  >Delete</button>
    </form>

    </div>
  )
}

export default DeletePro
