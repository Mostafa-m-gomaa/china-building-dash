import React from 'react'
import { useState ,useEffect } from 'react';
import { useContext } from 'react';
import { AppContext } from '../../App';
import './deleteFactory.css'

const DeleteFactory = () => {
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
        fetch("https://api.sdcbm.com/api/destroy/factories/"+selectedOption,{
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
        }
        else{
          setOnload(false)
          setShowError(true)
        }
        })
      };

      useEffect(()=>{
        fetch("https://api.sdcbm.com/api/showall/factories")
        .then(resp=>resp.json())
        .then(data=>setCategoryData(data.data))
    },[])
  return (
   <div className="delete-factory">
 <h1>Delete Factory</h1>

<form onSubmit={handleSubmit}>

<label>
        Select Factory
        <select value={selectedOption?.id} onChange={handleOptionChange}>
          <option value="">-- Select Factory</option>
          {categoryData.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      </label>
     
     
      <button type="submit"  >Delete</button>
    </form>

   </div>
  )
}

export default DeleteFactory
