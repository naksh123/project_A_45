import React from 'react'
import Contact from './Contact'
import style from "./css/Home.module.scss"
import Navbar from './Navbar'
import Card from './Card'
import Messages from './Messages'
import Delete from './Delete'
import PaymentHistory from './PaymentHistory'
import UserDetails from './UserDetails'
import PayBill from './PayBill'
import {useState} from "react"
export default function Home() {
    const [activeCard,setCard]=useState("");
    const showCard=(card)=>{
        setCard(card)
    } 
    return (
        <>  
           <div className={style.home+ " row col-12 p-0 "}>
                <Navbar/>
                <div className={style.cards+ " row col-12 mx-auto"}>
                    <Card title="My Messages" icon="MessageIcon" card="msg" handle={(card)=>showCard(card)}/>
                    <Card title="My Details" icon="DetailsIcon" card="mydetails" handle={(card)=>showCard(card)} />
                    <Card title="Pay Bill" icon="PaymentIcon" card="pay" handle={(card)=>showCard(card)} />
                    <Card title="Payment History" icon="HistoryIcon" card="history" handle={(card)=>showCard(card)} />
                    <Card title="Delete Account" icon="DeleteForeverIcon" card="delete" handle={(card)=>showCard(card)}/>
                </div>
                <div className={style.cards_details+ " row col-12 p-2 mx-auto"}>
                   {activeCard==="msg"&&<Messages handle={(card)=>showCard(card)} />}
                   {activeCard==="delete"&&<Delete handle={(card)=>showCard(card)} />}
                   {activeCard==="history"&&<PaymentHistory handle={(card)=>showCard(card)} />}
                   {activeCard==="mydetails"&&<UserDetails handle={(card)=>showCard(card)} />}
                   {activeCard==="pay"&&<PayBill handle={(card)=>showCard(card)} />} 
                </div>
                <Contact/>
           </div> 
        </>
    )
}
