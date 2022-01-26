import React from 'react'
import style from "./css/Contact.module.scss"
import Button from '@material-ui/core/Button'
import LockIcon from '@material-ui/icons/Lock';
import EmailIcon from '@material-ui/icons/Email';
import CallIcon from '@material-ui/icons/Call';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import { useState } from 'react';
export default function MessageToConsumer() {
    
    const [user, setUser] = useState({
        acno: "",
        email: "",
        message:"",
        password: "",
        type:"admin"
    })
    const {acno,email,message,password,type}=user
    const fieldValue = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setUser({ ...user, [name]: value })
    }
    const sendMessage = async (e) => {
        try {
            e.preventDefault()
            const result = await fetch(("/messageConsumer"), {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    acno,email,message,password,type:"admin"
                })
            })
            const data = await result.json()
            if (result.status !== 201 || !data) {
                window.alert(data.err);
            }
            else {
                setUser({ acno: "", email: "", message: "", password: "" })
                alert(data.msg)
            }

        } catch (err) {
            console.log("Error in Mesaaging client")
        }
    }
    return (
        <>
            <div id="contact" className={style.container+ " col-10 mx-auto my-5"}>
                <h3 className="mx-auto p-2 col-6 ">Message to Consumer</h3>
                <form id="contact" className={style.contact + "  col-12 mx-auto py-4"}>
                    <div className="mb-3 col-10 col-md-auto col-lg-3 p-0 d-flex mx-auto">
                        <AcUnitIcon className={style.icon + "  col-2 m-auto"} />
                        <input name="acno" type="text" value={acno} className={style.field + "   col-10 m-0 p-2 "} onChange={(e) => { fieldValue(e) }} placeholder="Account Number" />
                    </div>
                    <div className="mb-3 col-10 col-md-4 col-lg-3 d-flex mx-auto">
                        <EmailIcon className={style.icon + " col-2 m-auto"} />
                        <input name="email" type="email" value={email} className={style.field + "   col-10 ms-auto p-2"} onChange={(e) => { fieldValue(e) }} placeholder="Email" />
                    </div>
                    <div className="mb-3 col-10 col-md-4 col-lg-3 d-flex mx-auto">
                        <LockIcon className={style.icon + " col-2 m-auto"} />
                        <input name="password" type="password" value={password} className={style.field + "   col-10 m-0 p-2"} onChange={(e) => { fieldValue(e) }} placeholder="Password" />
                    </div>
                    <div className="mb-3 col-10 col-sm-10 col-lg-11  d-flex mx-auto">
                        <textarea  name="message" type="text" value={message} className={style.field + "   col-10 m-0 p-2"} onChange={(e) => { fieldValue(e) }} placeholder="Write Message here..."></textarea>
                    </div>
                    <Button className={style.sendMsg + " col-10 col-sm-6 col-md-4 mx-auto my-3"} onClick={sendMessage}>Send Messsage</Button>
                </form>
            </div> 

        </>
    )
}
