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
export default function UpdateConsumer(props) {

    const [user, setUser] = useState({
        name: "",
        acno: "",
        email: "",
        phone: "",
        password: "",
    })
    const { name, acno, email, phone, password } = user
    const fieldValue = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setUser({ ...user, [name]: value })
    }
    const updateUser = async (e) => {
        try {
            e.preventDefault()
            const result = await fetch(("/updateUser"), {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    name, acno, email, phone, password
                })
            })
            const data = await result.json()
            if (result.status !== 201 || !data) {
                window.alert(data.err);
            }
            else {
                setUser({ name: "", acno: "", email: "", phone: "", password: "" })
                alert(data.msg)
            }

        } catch (err) {
            console.log("Error in client Updation")
        }
    }
    return (
        <>
            <div className={style.add + " row col-4  mx-auto"}>
                <IconButton className="p-0 ms-2 mt-4 "><CloseIcon className={style.close + " m-0 bg-dark me-auto"} onClick={() => { props.handle(props.card) }} /></IconButton>
                <form className={style.form + " col-12 mx-auto  d-flex "}>
                    <h3 className="mx-auto p-2">Update Details</h3>
                    <div className="mb-3 col-10  d-flex mx-auto">
                        <PersonIcon className={style.icon + " col-2 m-auto"} />
                        <input autoComplete="off" name="name" type="text" className={style.field + "   col-10 ms-auto p-2"} value={name} onChange={(e) => { fieldValue(e) }} placeholder="Full Name" />
                    </div>
                    <div className="mb-3 col-10  d-flex mx-auto">
                        <AcUnitIcon className={style.icon + " col-2 m-auto"} />
                        <input autoComplete="off" name="acno" type="text" className={style.field + "   col-10 ms-auto p-2"} value={acno} onChange={(e) => { fieldValue(e) }} placeholder="10 Digit Ac No.(Update Not Allowed)" />
                    </div>
                    <div className="mb-3 col-10  d-flex mx-auto">
                        <PhoneIcon className={style.icon + " col-2 m-auto"} />
                        <input autoComplete="off" name="phone" type="number" className={style.field + "   col-10 ms-auto p-2"} value={phone} onChange={(e) => { fieldValue(e) }} placeholder="Phone Number" />
                    </div>
                    <div className="mb-3 col-10  d-flex mx-auto">
                        <EmailIcon className={style.icon + " col-2 m-auto"} />
                        <input autoComplete="off" name="email" type="email" className={style.field + "   col-10 ms-auto p-2"} value={email} onChange={(e) => { fieldValue(e) }} placeholder="Email" />
                    </div>
                    <div className="mb-3 col-10 d-flex mx-auto">
                        <LockIcon className={style.icon + " col-2 m-auto"} />
                        <input autoComplete="off" name="password" type="password" className={style.field + "   col-10 m-0 p-2"} value={password} onChange={(e) => { fieldValue(e) }} placeholder="Password" />
                    </div>

                    <Button className={style.action + " col-10  mx-auto my-3"} onClick={updateUser}>Update</Button>

                </form>
            </div>
        </>
    )
}
