import React from 'react'
import './updatecat.css'
import { useState,useEffect } from 'react';

const UpCategory = () => {

    const [ename, setEname] = useState('');
    const [aname, setAname] = useState('');
    const [cname, setCname] = useState('');
    const [image, setImage] = useState('');
    const [categoryData, setCategoryData] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionChange = (event) => {
      const selectedId = event.target.value;
      const selected = categoryData.find((option) => option.id === selectedId);
      setSelectedOption(selected);
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
      setImage(event.target.value);
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();

      const formData = new FormData();
      formData.append('name_en', ename);
      formData.append('name_ch', aname);
      formData.append('name_ru', cname);
      formData.append('image', image, image.name);
      try {
        const response = await fetch('https://api.sdcbm.com/api/store/categ', {
          method: 'POST',
          body: formData,
        });
        if (response.ok) {
          console.log('Image uploaded successfully');
          // Add code to handle successful submission
        } else {
          console.error("say");
        }
      } catch (error) {
        console.log("sayed");
       
      }
    };

    useEffect(()=>{
        fetch("https://api.sdcbm.com/api/showall/categ")
        .then(resp=>resp.json())
        .then(data=>setCategoryData(data))

    },[])
   
  return (
 <div className="update-category">
<h1>Update Category</h1>

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
        <input type="text" value={ename} onChange={handleEnglishNameChange}  />
      </label>
      <label>
        Arabic Name
        <input type="text" value={aname} onChange={handleArabicNameChange} />
      </label>
      <label>
        Chinese Name
        <input type="text" value={cname} onChange={handleChineseNameChange} />
      </label>
      <label>
        Image
        <input type="file" value={image} onChange={handleImageChange} />
      </label>
      <button type="submit"> Add Category </button>
    </form>
 </div>
  )
}

export default UpCategory
