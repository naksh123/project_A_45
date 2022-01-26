import React from 'react'
import style from "./css/UserDetails.module.scss"
import Button from '@material-ui/core/Button'
import LockIcon from '@material-ui/icons/Lock';
import CloseIcon from '@material-ui/icons/Close';

import IconButton from "@material-ui/core/IconButton"
import { useEffect,useState } from "react"
export default function UserDetails(props) {
    const [disable,setDesable]=useState(true)
    const [user,setUser]=useState({
        name:"",
        email:"",
        acno:"",
        phone:"",
        address:"",
        password:""
    })
    const fieldValue = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setUser({ ...user, [name]: value })
    }
    const {name,email,acno,phone,password,address}  =user 
    const getData = async () => {
        try {
            const result = await fetch(("/data"), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    value:""
                })
            })
            const data = await result.json()
            if (data.user) {
                const {name,email,acno,phone,address}  =data.user 
                setUser({...user,name,email,acno,phone,address})  
            }
        }
        catch (err) {
            console.log("error in getData :" + err)
        }
    }
    const updateData = async () => {
        try {
            // console.log("hello")
            // e.preventDefault()
            const result = await fetch(("/updateUser"), {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    name, acno, email, phone, password,address
                })
            })
            const data = await result.json()
            if (result.status !== 201 || !data) {
                window.alert(data.err);
            }
            else {
                props.handle("")
                alert(data.msg)
            }

        } catch (err) {
            console.log("Error in client Updation"+err)
        }
    }
    useEffect(() => {
        getData()
    }, [])
    return (
        <>
            <div className={style.user_details + " row col-4 mx-auto "}>
                <IconButton className="bg-light p-0 ms-2 mt-4 col-auto me-auto "><CloseIcon  className={style.close+ " m-0 bg-dark "} onClick={()=>{props.handle("")}}/></IconButton>
                <form className={style.form + " col-11 mx-auto  d-flex "}>
                    <h3 className="mx-auto p-2 px-3">My Details</h3>
                    <div className="mb-3 col-12  d-flex mx-auto">
                        <p className={style.label + " col-3 m-auto border-end py-2 px-3  text-center"}>Name</p>
                        <input autoComplete="off" disabled={disable?"disabled":undefined} name="name" type="text" className={style.field + "   col-10 ms-auto p-2"} value={name} onChange={(e) => { fieldValue(e) }} placeholder="Full Name" />
                    </div>
                    <div className="mb-3 col-12  d-flex mx-auto">
                        <p className={style.label + " col-3 m-auto border-end py-2 px-3  text-center"}>Ac/No</p>
                        <input autoComplete="off" disabled name="acno" type="text" className={style.field + "   col-10 ms-auto p-2"} value={acno} onChange={(e) => { fieldValue(e) }} placeholder="10 Digit Ac No.(Update Not Allowed)" />
                    </div>
                    <div className="mb-3 col-12  d-flex mx-auto">
                        <p className={style.label + " col-3 m-auto border-end py-2 px-3  text-center"}>Phone</p>
                        <input autoComplete="off" disabled={disable?"disabled":undefined} name="phone" type="number" className={style.field + "   col-10 ms-auto p-2"} value={phone} onChange={(e) => { fieldValue(e) }} placeholder="Phone Number" />
                    </div>
                    <div className="mb-3 col-12  d-flex mx-auto">
                        <p className={style.label + " col-3 m-auto border-end py-2 px-3  text-center"}>Email</p>
                        <input autoComplete="off" disabled={disable?"disabled":undefined} name="email" type="email" className={style.field + "   col-10 ms-auto p-2"} value={email} onChange={(e) => { fieldValue(e) }} placeholder="Email" />
                    </div>
                    <div className="mb-3 col-12  d-flex mx-auto">
                        <p className={style.label + " col-3 m-auto border-end py-2 px-3  text-center"}>Address</p>
                        <input autoComplete="off" disabled={disable?"disabled":undefined} name="address" type="text" className={style.field + "   col-10 ms-auto p-2"} value={address} onChange={(e) => { fieldValue(e) }} placeholder="Address" />
                    </div>
                    {!disable?<div className="mb-3 col-12 d-flex mx-auto">
                        <LockIcon className={style.icon + " col-2 m-auto"} />
                        <input autoComplete="off" disabled={disable?"disabled":undefined} type="password" name="password" className={style.field + "   col-10 m-0 p-2"} value={password} onChange={(e) => { fieldValue(e) }} placeholder="Password" />
                    </div>:""}
                    <Button className={style.update + " col-12  mx-auto my-3"} onClick={()=>setDesable(!disable)}>{disable?"Want to update":"Cancel"}</Button>
                    {!disable?<Button className={style.update + " col-12  mx-auto my-3"} onClick={()=>updateData()}>Update</Button>:undefined}

                </form>
            </div>
        </>
    )
}
