import React from 'react'
import './orders.css'
import { useState ,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import { AppContext } from '../../App';
const Orders = () => {

  const history =useNavigate()

  const [mainData,setMainData]=useState([])
  
  const {login,setLogin}=useContext(AppContext)


  const renderOrders = () => {
    if (mainData.length > 0) {
      return (
        <div className="container">
          {mainData.map((order) => {
            return (
              <div key={order.id} className="order active">
                <h2>order</h2>
                <div className="top">
                  <div className="name">order from : {order.name}</div>
                  <div>client email : {order.email}</div>
                  <div>client whatsapp : {order.phone}</div>
                  <div>client message : {order.message}</div>
                </div>
                <div className="bottom">
                  <h2>order description</h2>
                  {order.order_items.map((item) => {
                    return (
                      <div key={item.id} className="bottom-container">
                        <div>
                          <div>

                          quantity : {item.quantity} {item.unit} from{" "}
                          {item.product ==null ? <div>the product that ordered is deleted from data base</div>  :<span>{item.product.prod_name}</span>}
                           the color is : {item.color} ,,
                          </div>
                          {item.comment ? <div>comment with this product :{item.comment}</div>:null}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      );
    } else {
      return <div>There are no orders yet.</div>;
    }
  };



  useEffect(()=>{
    fetch("https://api.sdcbm.com/api/getOrders")
    .then(res=>res.json())
    .then(data=>{
      setMainData(data)
    })
   
  },[login])
  useEffect(()=>{
    if(login==true){
      window.onpopstate = () => {
        history("/orders")
      };
    }
else{
  console.log("ahmed")
}
  },[])

        
  return (
 <div className="orders">
    
      
        {renderOrders()}
   
 </div>
  )
}

export default Orders
