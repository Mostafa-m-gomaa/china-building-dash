import React from 'react'
import './addproduct.css'
import { useState ,useEffect} from 'react';
import { useContext } from 'react';
import { AppContext } from '../../App';

const AddProduct = () => {
    const {onload ,setOnload} =useContext(AppContext)
    const [units, setUnits] = useState(' ');
    const [ecolor, setEcolor] = useState(' ');
    const [acolor, setAcolor] = useState(' ');
    const [ccolor, setCcolor] = useState('');
    const [edisc, setEdisc] = useState('');
    const [adisc, setAdisc] = useState('');
    const [cdisc, setCdisc] = useState('');
    const [ename, setEname] = useState('');
    const [aname, setAname] = useState('');
    const [cname, setCname] = useState('');
    const [image1, setImage1] = useState(null);
    const [image2, setImage2] = useState(null);
    const [image3, setImage3] = useState(null);
    const [image4, setImage4] = useState(null);
    const [categoryData, setCategoryData] = useState([]);
    const [factoryData, setFactoryData] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedFactory, setSelectedFactory] = useState(null);
    const {showSuccess,setShowSuccess} =useContext(AppContext)
    const {showError ,setShowError} =useContext(AppContext)
    const {token,setToken}=useContext(AppContext)

    const handleOptionChange = (event) => {
        const selectedId = event.target.value;
        const selected = categoryData.find((option) => option.id === selectedId);
        setSelectedOption(selectedId);
     
      
      };
    const handleFactory = (event) => {
        const selectedId = event.target.value;
        // const selected = categoryData.find((option) => option.id === selectedId);
        setSelectedFactory(selectedId);
       
      
      };


    const handleUnits = (event) => {
      setUnits(event.target.value);
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
    const handleChineseDiscChange = (event) => {
      setCdisc(event.target.value);
    };
    const handleArabicDiscChange = (event) => {
      setAdisc(event.target.value);
    };
    const handleEnglishDiscChange = (event) => {
      setEdisc(event.target.value);
    };
    const handleEnglishColor = (event) => {
      setEcolor(event.target.value);
    };
    const handleArabicColor = (event) => {
      setAcolor(event.target.value);
    };
    const handleChineseColor = (event) => {
      setCcolor(event.target.value);
    };
  
    const handleImageChange1 = (event) => {
        const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImage1(file);
    } else {
      setImage1(null);
    }
    };
    const handleImageChange2 = (event) => {
        const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImage2(file);
    } else {
      setImage2(null);
    }
    };
    const handleImageChange3= (event) => {
        const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImage3(file);
    } else {
      setImage3(null);
    }
    };
    const handleImageChange4 = (event) => {
        const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImage4(file);
    } else {
      setImage4(null);
    }
    };
  


    const handleSubmit = async (event) => {
        setOnload(true)
        event.preventDefault();

        const formData = new FormData();

        formData.append('subsubcategory_id', selectedOption);
        formData.append('factory_id',selectedFactory);
        formData.append('name_en', ename);
        formData.append('name_ch', aname);
        formData.append('name_ru', cname);
        formData.append('Desc_en', edisc);
        formData.append('Desc_ch', adisc);
        formData.append('Desc_ru', cdisc);
        formData.append('image1', image1, image1.name);
        formData.append('image2', image2, image2.name);
        formData.append('image3', image3, image3.name);
        formData.append('image4', image4, image4.name);
        formData.append('colors_en', ecolor);
        formData.append('colors_ch', acolor);
        formData.append('colors_ru', ccolor);
        formData.append('units', units);
        try {
          const response = await fetch('https://api.sdcbm.com/api/store/product', {
            method: 'POST',
            body: formData,
            headers: {
              'Authorization': `Bearer ${token}`
          }
          });
          if (response.ok) {
           
            setShowSuccess(true)
            setOnload(false)
          } else {
            setOnload(false)
            setShowError(true)
          }
        } catch (error) {
          console.log(error);
         
        }
      };
      useEffect(()=>{
        fetch("https://api.sdcbm.com/api/showall/subsubcateg")
        .then(resp=>resp.json())
        .then(data=>setCategoryData(data))

        fetch("https://api.sdcbm.com/api/showall/factories")
        .then(resp=>resp.json())
        .then(data=>setFactoryData(data.data))

    },[])

  return (

    
 <div className="add-product">
<h1>Add Product</h1>

<form onSubmit={handleSubmit}>
<label>
        Select Sub Sub Category
        <select value={selectedOption?.id} onChange={handleOptionChange}>
          <option value="">-- Select Sub Sub Category</option>
          {categoryData.map((option) => (
            <option key={option.id} value={option.id}>
              {option.SubSubCateg_name}
            </option>
          ))}
        </select>
      </label>
<label>
        Select Factory 
        <select value={selectedFactory?.id} onChange={handleFactory}>
          <option value="">-- Select Factory</option>
          {factoryData.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      </label>
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
        English Description
        <input type="text" value={edisc} onChange={handleEnglishDiscChange} required/>
      </label>
      <label>
        Arabic Description
        <input type="text" value={adisc} onChange={handleArabicDiscChange} required/>
      </label>
      <label>
        Chinese description
        <input type="text" value={cdisc} onChange={handleChineseDiscChange} required/>
      </label>
      <label>
       English colors
        <input type="text" value={ecolor} onChange={handleEnglishColor} required/>
      </label>
      <label>
       Arabic colors
        <input type="text" value={acolor} onChange={handleArabicColor} required/>
      </label>
     
      <label>
       Chinese colors 
        <input type="text" value={ccolor} onChange={handleChineseColor} required/>
      </label>
      <label>
       Units 
        <input type="text" value={units} onChange={handleUnits} required/>
      </label>
      <label>
        Image 1
        <input type="file"   onChange={handleImageChange1} required />
      </label>
      <label>
        Image 2
        <input type="file"   onChange={handleImageChange2}  />
      </label>
      <label>
        Image 3
        <input type="file"   onChange={handleImageChange3} />
      </label>
      <label>
        Image 4
        <input type="file"   onChange={handleImageChange4}  />
      </label>
     
      <button type="submit"  >Add Product</button>
    </form>
 </div>
  )
}

export default AddProduct
