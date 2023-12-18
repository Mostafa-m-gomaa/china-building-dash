import './App.css';
import { Link, Route,Routes } from 'react-router-dom';
import { createContext } from 'react';
import React, { useContext, useState ,useEffect } from 'react';
import Side from './component/sidebar/Side';
import AddCategory from './component/addCategory/AddCategory';
import UpCategory from './component/updateCategory/UpCategory';
import AddSubCategory from './component/add-sub-category/AddSubCategory';
import AddSubSubCategory from './component/add-sub-sub-category/AddSubSub';
import AddProduct from './component/add-product/AddProduct';
import AddFactory from './component/add-factory/addFactory';
import { MdOutlineDoneOutline} from 'react-icons/md';
import {BiError} from 'react-icons/bi';
import DeleteCateg from './component/deleteCategory/DeleteCateg';
import DeleteSub from './component/delete-sub-category/DeleteSub';
import Orders from './component/orders/Orders';
import DeleteSubSub from './component/delete-sub-sub/deleteSubSub';
import DeletePro from './component/delete-product/DeletePro';
import DeleteFactory from './component/delete-factory/DeleteFactory';
import Login from './component/login/Login';
import burger from "./assets/9666728_menu_burger_vertical_icon.png"


export const AppContext = createContext();

function App() {
  const [token,setToken] =useState("")
  const [login,setLogin]=useState(false)

  const [onload ,setOnload]=useState(false)
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const burgerClick=()=>{
    document.querySelector(".side").classList.toggle("side-show")
  }

  useEffect(() => {
    let timeout;
    if (showSuccess) {
      timeout = setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [showSuccess]);
  useEffect(() => {
    let timeout;
    if (showError) {
      timeout = setTimeout(() => {
        setShowError(false);
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [showError]);
 
  useEffect(()=>{
    if (sessionStorage.getItem("token")){
      setToken(sessionStorage.getItem("token"))
      setLogin(true)
  }
  
  },[login])




  return (
    <AppContext.Provider value={{onload,setOnload ,showSuccess,setShowSuccess,showError,setShowError,token,setToken,login,setLogin}} >
    
 
      <div className="App">
      <img src={burger} onClick={burgerClick} className='burger' />
        {onload ?    <div className='spin-cont'>
          <div className='back-ground'></div>
          <div className="spinner"></div>
        </div> : null}

      {showSuccess ?  <div className='success'>
          Done <MdOutlineDoneOutline />
        </div>
       :null}
      {showError?  <div className='wrong'>
          try again <BiError />
        </div>
       :null}
      

        

    <Side />
     <Routes>
     <Route path="/" element={<Login/>} />
     <Route path="/add-category" element={<AddCategory/>} />
     <Route path="/update-category" element={<UpCategory/>} />
     <Route path="/add-SubCategory" element={<AddSubCategory/>} />
     <Route path="/add-sub-sub-category" element={<AddSubSubCategory/>} />
     <Route path="/add-product" element={<AddProduct/>} />
     <Route path="/add-factory" element={<AddFactory/>} />
     <Route path="/delete-category" element={<DeleteCateg/>} />
     <Route path="/delete-sub-category" element={<DeleteSub/>} />
     <Route path="/orders" element={<Orders/>} />
     <Route path="/delete-sub-sub" element={<DeleteSubSub/>} />
     <Route path="/delete-product" element={<DeletePro/>} />
     <Route path="/delete-factory" element={<DeleteFactory/>} />
      </Routes>



  
  
 </div>
 </AppContext.Provider>
  
  );
}

export default App;
