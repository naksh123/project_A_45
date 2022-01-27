import React from 'react'
import style from "./css/Register.module.scss"
import Button from '@material-ui/core/Button'
import LockIcon from '@material-ui/icons/Lock';
import EmailIcon from '@material-ui/icons/Email';
import PersonIcon from '@material-ui/icons/Person';
import PhoneIcon from '@material-ui/icons/Phone';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import { Link, useHistory } from 'react-router-dom'
import { useState } from 'react';
export default function Register(props) {
    const history = useHistory()
    const [user, setUser] = useState({
        name: "",
        address: "",
        email: "",
        phone:"",
        password: ""
    })
    const {name,address,email,phone,password}=user
    const fieldValue = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setUser({ ...user, [name]: value })
    }
    const Register = async (e) => {
        try {
            e.preventDefault()
            const result = await fetch(("/register"), {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                }, 
                body: JSON.stringify({
                    name,address,email,phone,password
                })
            })
            // 
            const data = await result.json()
            if (result.status !== 201 || !data) {
                window.alert(data.err);
            }
            else {
                alert("Registeration Successful")
                history.push("/")
            }

        } catch (err) {
            console.log("Error in client Registeration")
        }
    }
    return (
        <>
            <div className={style.register + "  row col-12 p-3"}>
                <form className={style.form + " col-4 mx-auto  d-flex py-4"}>
                    <h3 className="mx-auto p-2">Register Here</h3>
                    <div className="mb-3 col-10  d-flex mx-auto">
                        <PersonIcon className={style.icon + " col-2 m-auto"} />
                        <input autoComplete="off" name="name" type="text" className={style.field + "   col-10 ms-auto p-2"} value ={name} onChange={(e)=>{fieldValue(e)}} placeholder="Full Name" />
                    </div>
                    <div className="mb-3 col-10  d-flex mx-auto">
                        <PhoneIcon className={style.icon + " col-2 m-auto"} />
                        <input autoComplete="off" name="phone" type="number" className={style.field + "   col-10 ms-auto p-2"} value ={phone} onChange={(e)=>{fieldValue(e)}} placeholder="Phone Number" />
                    </div>
                    <div className="mb-3 col-10  d-flex mx-auto">
                        <EmailIcon className={style.icon + " col-2 m-auto"} />
                        <input autoComplete="off" name="email" type="email" className={style.field + "   col-10 ms-auto p-2"} value ={email} onChange={(e)=>{fieldValue(e)}} placeholder="Email" />
                    </div>
                    <div className="mb-3 col-10  d-flex mx-auto">
                        <AcUnitIcon className={style.icon + " col-2 m-auto"} />
                        <input autoComplete="off" name="address" type="text" className={style.field + "   col-10 ms-auto p-2"} value ={address} onChange={(e)=>{fieldValue(e)}} placeholder="Enter city/state" />
                    </div>
                    <div className="mb-3 col-10 d-flex mx-auto">
                        <LockIcon className={style.icon + " col-2 m-auto"} />
                        <input autoComplete="off" name="password" type="password" className={style.field + "   col-10 m-0 p-2"} value ={password} onChange={(e)=>{fieldValue(e)}} placeholder="Password" />
                    </div>
                    <Button className={style.Register + " col-10  mx-auto my-3"} onClick={Register}>Register</Button>
                    <Link to="/" className=" mx-auto">Already have an Account ?</Link>
                </form>
            </div>
        </>
    )
}
