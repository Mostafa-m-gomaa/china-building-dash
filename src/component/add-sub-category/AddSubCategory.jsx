import React from 'react'
import './adSub.css'
import { useState ,useEffect } from 'react';
import { useContext } from 'react';
import { AppContext } from '../../App';

const AddSubCategory = () => {
    const {onload ,setOnload} =useContext(AppContext)
    const [ename, setEname] = useState('  ');
    const [aname, setAname] = useState('');
    const [cname, setCname] = useState('');
    const [categoryData, setCategoryData] = useState([]);
    const {showSuccess,setShowSuccess} =useContext(AppContext)
    const {showError ,setShowError} =useContext(AppContext)
    const {token,setToken}=useContext(AppContext)

    
    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionChange = (event) => {
        const selectedId = event.target.value;
        const selected = categoryData.find((option) => option.id === selectedId);
        setSelectedOption(selectedId);
      
      };

    const handleEnglishNameChange = (event) => {
      setEname(event.target.value);
    };
    const handleArabicNameChange = (event) => {
      setAname(event.target.value);
    };
    const handleChineseNameChange = (event) => {
      setCname(event.target.value);
    };
  
 
  
    const handleSubmit = async (event) => {
        setOnload(true)
        event.preventDefault();

        const formData = new FormData();

        formData.append('category_id', selectedOption);
        formData.append('name_en', ename);
        formData.append('name_ch', aname);
        formData.append('name_ru', cname);
        
        try {
          const response = await fetch('https://api.sdcbm.com/api/store/subcateg', {
            method: 'POST',
            body: formData,
            headers: {
              'Authorization': `Bearer ${token}`
          }
          });
          if (response.ok) {
           setShowSuccess(true)
            setAname(" ")
            setCname(" ")
            setEname(" ")
            setOnload(false)
            // Add code to handle successful submission
          } else {
            setShowError(true)
            setOnload(false)
          }
        } catch (error) {
          console.log(error);
         
        }
      };

      useEffect(()=>{
        fetch("https://api.sdcbm.com/api/showall/categ")
        .then(resp=>resp.json())
        .then(data=>setCategoryData(data))

    },[])
   

  return (

    
 <div className="add-sub-category">
<h1>Add Sub Category</h1>

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
      <label>
        English Name
        <input type="text" value={ename} onChange={handleEnglishNameChange} />
      </label>
      <label>
        Arabic Name
        <input type="text" value={aname} onChange={handleArabicNameChange} required />
      </label>
      <label>
        Chinese Name
        <input type="text" value={cname} onChange={handleChineseNameChange} required/>
      </label>
    
     
      <button type="submit"  >Add Category</button>
    </form>
 </div>
  )
}

export default AddSubCategory
