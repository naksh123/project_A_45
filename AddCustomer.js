import React from 'react'
import style from "./css/AddCustomer.module.scss"
import Button from '@material-ui/core/Button'
import LockIcon from '@material-ui/icons/Lock';
import EmailIcon from '@material-ui/icons/Email';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from "@material-ui/core/IconButton"
import PersonIcon from '@material-ui/icons/Person';
import PhoneIcon from '@material-ui/icons/Phone';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import { useState } from 'react';
export default function AddCustomer(props) {
    
    const [user, setUser] = useState({
        name: "",
        acno: "",
        email: "",
        phone:"",
        cpassword: "",
        apassword: ""
    })
    const {name,acno,email,phone,cpassword,apassword}=user
    const fieldValue = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setUser({ ...user, [name]: value })
    }
    const addCons = async (e) => {
        try {
            e.preventDefault()
            const result = await fetch(("/addCons"), {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                }, 
                body: JSON.stringify({
                    name,acno,email,phone,cpassword,apassword
                })
            })
            const data = await result.json()
            if (result.status !== 201 || !data) {
                window.alert(data.err);
            }
            else {
                setUser({name:"",acno:"",email:"",phone:"",cpassword:"",apassword:""})
                alert(data.msg)
            }

        } catch (err) {
            console.log("Error in Adding Consumer ")
        }
    }
    return (
        <>
            <div className={style.add + " row col-4 mx-auto "}>
            <IconButton className="p-0 ms-2 mt-4 "><CloseIcon  className={style.close+ " m-0 bg-dark me-auto"} onClick={()=>{props.handle(props.card)}}/></IconButton>
                <form className={style.form + " col-12 mx-auto  d-flex "}>
                    <h3 className="mx-auto p-2">Add Consumer</h3>
                    <div className="mb-3 col-10  d-flex mx-auto">
                        <PersonIcon className={style.icon + " col-2 m-auto"} />
                        <input name="name" type="text" className={style.field + "   col-10 ms-auto p-2"} value ={name} onChange={(e)=>{fieldValue(e)}} placeholder="Full Name" />
                    </div>
                    <div className="mb-3 col-10  d-flex mx-auto">
                        <AcUnitIcon className={style.icon + " col-2 m-auto"} />
                        <input name="acno" type="text" className={style.field + "   col-10 ms-auto p-2"} value ={acno} onChange={(e)=>{fieldValue(e)}} placeholder="10 Digit Ac No." />
                    </div>
                    <div className="mb-3 col-10  d-flex mx-auto">
                        <PhoneIcon className={style.icon + " col-2 m-auto"} />
                        <input name="phone" type="number" className={style.field + "   col-10 ms-auto p-2"} value ={phone} onChange={(e)=>{fieldValue(e)}} placeholder="Phone Number" />
                    </div>
                    <div className="mb-3 col-10  d-flex mx-auto">
                        <EmailIcon className={style.icon + " col-2 m-auto"} />
                        <input name="email" type="email" className={style.field + "   col-10 ms-auto p-2"} value ={email} onChange={(e)=>{fieldValue(e)}} placeholder="Email" />
                    </div>
                    <div className="mb-3 col-10 d-flex mx-auto">
                        <LockIcon className={style.icon + " col-2 m-auto"} />
                        <input name="cpassword" type="password" className={style.field + "   col-10 m-0 p-2"} value ={cpassword} onChange={(e)=>{fieldValue(e)}} placeholder="Consumer Password" />
                    </div>
                    <div className="mb-3 col-10 d-flex mx-auto">
                        <LockIcon className={style.icon + " col-2 m-auto"} />
                        <input name="apassword" type="password" className={style.field + "   col-10 m-0 p-2"} value ={apassword} onChange={(e)=>{fieldValue(e)}} placeholder=" Admin Password" />
                    </div>
                    <Button className={style.action + " col-10  mx-auto my-3"} onClick={addCons}>Add</Button>
                    
                </form>
            </div>
        </>
    )
}
