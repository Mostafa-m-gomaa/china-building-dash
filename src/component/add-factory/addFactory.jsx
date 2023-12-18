import React from 'react'
import './addfactory.css'
import { useState } from 'react';
import { useContext } from 'react';
import { AppContext } from '../../App';


const AddFactory = () => {
    const {onload ,setOnload} =useContext(AppContext)
    const {showSuccess,setShowSuccess} =useContext(AppContext)
    const {showError ,setShowError} =useContext(AppContext)
    const [ename, setEname] = useState('');
    const [aname, setAname] = useState('');
    const [cname, setCname] = useState('');
    const [image, setImage] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const {token,setToken}=useContext(AppContext)

    const handleOptionChange = (event) => {
        const selectedId = event.target.value;
        // const selected = categoryData.find((option) => option.id === selectedId);
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
  
    const handleImageChange = (event) => {
        const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImage(file);
    } else {
      setImage(null);
    }
    };


    
    const handleSubmit = async (event) => {
        event.preventDefault();
        setOnload(true)
  
          const formData = new FormData();
          formData.append('name_en', ename);
          formData.append('name_ch', aname);
          formData.append('name_ru', cname);
          formData.append('status',selectedOption);
          formData.append('image', image, image.name);
          try {
            const response = await fetch('https://api.sdcbm.com/api/store/factories', {
              method: 'POST',
              body: formData,
              headers: {
                'Authorization': `Bearer ${token}`
            }
            });
            if (response.ok) {
              setShowSuccess(true)
              setOnload(false)
              setAname("")
              setEname("")
              setCname("")
            } else {
                setOnload(false)
              setShowError(true)
            }
          } catch (error) {
            console.log(error);
           
          }
        };
      
  return (
<div className="add-factory">
<h1>Add Factory</h1>

<form onSubmit={handleSubmit}>
      <label>
        English Name
        <input type="text" value={ename} onChange={handleEnglishNameChange} required/>
      </label>
      <label>
        Arabic Name
        <input type="text" value={aname} onChange={handleArabicNameChange} required />
      </label>
      <label>
        Chinese Name
        <input type="text" value={cname} onChange={handleChineseNameChange} required/>
      </label>
      <label>
        Select Status
        <select value={selectedOption?.id} onChange={handleOptionChange}>
          <option value="">-- Select Status</option>
          <option value="our">our</option>
          <option value="partner">partner</option>
     
        </select>
      </label>
      <label>
        Image
        <input type="file"   onChange={handleImageChange} required />
      </label>

    
     
      <button type="submit"  >Add Factory</button>
    </form>
   </div>
  )
}

export default AddFactory
