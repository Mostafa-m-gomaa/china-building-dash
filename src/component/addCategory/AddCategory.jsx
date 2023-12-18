import React, { useEffect } from 'react'
import './category.css'
import { useState } from 'react';
import { useContext } from 'react';
import { AppContext } from '../../App';
import { useNavigate } from 'react-router-dom';


const AddCategory = () => {
  const {onload ,setOnload} =useContext(AppContext)
  const history =useNavigate()
 
    const [ename, setEname] = useState('');
    const [aname, setAname] = useState('');
    const [cname, setCname] = useState('');
    const [image, setImage] = useState(null);
    
    const {showSuccess,setShowSuccess} =useContext(AppContext)
    const {showError ,setShowError} =useContext(AppContext)
    const {token,setToken}=useContext(AppContext)


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
  
    // const handleSubmit = (event) => {
    //   event.preventDefault();
    //   // Add code to submit the category data to the API using fetch
      
    // //   fetch('https://api.sdcbm.com/api/store/categ', {
    // //     method: 'POST',
    // //     headers: { 'Content-Type': 'application/json' },
    // //     body: JSON.stringify({
    // //         name_en:ename,
    // //         name_ch: aname,
    // //         name_ru: cname,
    // //         image:image
    // //     })
    // //   }).then(resp=>resp.json())
    // //     .then(data=>console.log(data));
      
    //     // Add code to handle successful submission

        
   
    // };

    const handleSubmit = async (event) => {
      event.preventDefault();
      setOnload(true)

        const formData = new FormData();
        formData.append('name_en', ename);
        formData.append('name_ch', aname);
        formData.append('name_ru', cname);
        formData.append('image', image, image.name);
        try {
          const response = await fetch('https://api.sdcbm.com/api/store/categ', {
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
            setShowError(true)
            setOnload(false)
          }
        } catch (error) {
          console.log(error);
         
        }
      };




  return (

    
 <div className="add-category">
<h1>Add Category</h1>

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
        Image
        <input type="file"   onChange={handleImageChange} required />
      </label>
     
      <button type="submit"  >Add Category</button>
    </form>
 </div>
  )
}

export default AddCategory
