import React from 'react'
import MessageToConsumer from './MessageToConsumer'
import style from "./css/Admin.module.scss"
import Navbar from './Navbar'
import Card from './Card'
import ClientMessage from './ClientMessage'
import Delete from './Delete'
import AddCustomer from "./AddCustomer"
import UpdateConsumer from "./UpdateConsumer"
import PublishBill from "./PublishBill"
import SearchAll from "./SearchAll"
import {useState} from "react"
export default function Admin() {
    const [activeCard,setCard]=useState("");
    const showCard=(card)=>{
        setCard(card)
    } 
    return (
        <> 
           <div className={style.home+ " row col-12 p-0 "}>
                <Navbar/>
                <div className={style.cards+ " row col-12 mx-auto"}>
                    <Card title="Messages" icon="MessageIcon" card="msg" handle={(card)=>showCard(card)}/>
                    {/* <Card title="Add Consumer" icon="AddIcon" card="add" handle={(card)=>showCard(card)} /> */}
                    <Card title="Delete Ac" icon="DeleteForeverIcon" card="delete" handle={(card)=>showCard(card)}/>
                    <Card title="Update Ac" icon="UpdateIcon" card="update" handle={(card)=>showCard(card)}/>
                    <Card title="Publish  Bill" icon="PaymentIcon" card="publish" handle={(card)=>showCard(card)}/>
                    <Card title="Search Ac" icon="SearchIcon" card="search" handle={(card)=>showCard(card)} />
                </div>
                <div className={style.cards_details+ " row col-12 p-2 mx-auto"}>
                   {activeCard==="msg"&&<ClientMessage  handle={(card)=>showCard(card)}/>}
                   {activeCard==="delete"&&<Delete  handle={(card)=>showCard(card)}/>}
                   {/* {activeCard==="add"&&<AddCustomer  handle={(card)=>showCard(card)}/>} */}
                   {activeCard==="update"&&<UpdateConsumer  handle={(card)=>showCard(card)}/>}
                   {activeCard==="publish"&&<PublishBill  handle={(card)=>showCard(card)}/>}
                   {activeCard==="search"&&<SearchAll />}
                   
                </div>
                <MessageToConsumer/>
           </div> 
        </>
    )
}
