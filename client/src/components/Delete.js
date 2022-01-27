import React from 'react'
import style from "./css/Delete.module.scss"
import Button from '@material-ui/core/Button'
import LockIcon from '@material-ui/icons/Lock';
import EmailIcon from '@material-ui/icons/Email';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from "@material-ui/core/IconButton"
import { useState } from 'react';
export default function Delete(props) {
    const [user, setUser] = useState({
        acno: "",
        email: "",
        password: "",
        message:"",
    })
    const {acno,email,password,message}=user
    const fieldValue = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setUser({ ...user, [name]: value })
    }
    const deleteAccount = async (e) => {
        try {
            e.preventDefault()
            const result = await fetch(("/deleteAccount"), {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json"
                }, 
                body: JSON.stringify({
                    acno,email,password,message
                })
            })
            const data = await result.json()
            if (result.status !== 201 || !data) {
                window.alert(data.err);
            }
            else {
                setUser({acno: "",email: "",password: "",message:"",})
                alert(data.msg)
            }

        } catch (err) {
            console.log("Error in client Registeration")
        }
    }
    return (
        <>
            <div className={style.delete + " row col-4 mx-auto p-4"}>
                <IconButton className="bg-light p-0 ms-2 col-auto"><CloseIcon className={style.close + " m-0 bg-dark "} onClick={()=>{props.handle(props.card)}}/></IconButton>
                <form className={style.form + " col-12 mx-auto mb-2 d-flex "}>
                    <h3 className="mx-auto p-2">Delete Account</h3>
                    <div className="mb-1 col-12  d-flex mx-auto">
                        <AcUnitIcon className={style.icon + " col-2 m-auto"} />
                        <input name="acno" type="text" className={style.field + "   col-10 ms-auto p-2"} value ={acno} onChange={(e)=>{fieldValue(e)}} placeholder="10 Digit Ac No." />
                    </div>
                    <div className="mb-1 col-12  d-flex mx-auto">
                        <EmailIcon className={style.icon + " col-2 m-auto"} />
                        <input name="email" type="email" className={style.field + "   col-10 ms-auto p-2"} value ={email} onChange={(e)=>{fieldValue(e)}} placeholder="Email" />
                    </div>
                    <div className="mb-1 col-12 d-flex mx-auto">
                        <LockIcon className={style.icon + " col-2 m-auto"} />
                        <input name="password" type="password" className={style.field + "   col-10 m-0 p-2"} value ={password} onChange={(e)=>{fieldValue(e)}} placeholder="Password" />
                    </div>
                    <div className="mb-1 col-12  d-flex mx-auto">
                        <SentimentVeryDissatisfiedIcon className={style.icon + " col-2 m-auto"} />
                        <textarea name="message" type="text" className={style.field + "   col-10 ms-auto p-2"} value ={message} onChange={(e)=>{fieldValue(e)}} placeholder="Reason to Delete account?" />
                    </div>
                    <Button className={style.Del + " col-12  mx-auto my-3"} onClick={deleteAccount}>Delete Account</Button>

                </form>
            </div>
        </>
    )
}
