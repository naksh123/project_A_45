import React from 'react'
import style from "./css/Publish.module.scss"
import Button from '@material-ui/core/Button'
import MoneyIcon from '@material-ui/icons/Money';
import AcUnitIcon from '@material-ui/icons/AcUnit'
import TodayIcon from '@material-ui/icons/Today';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from "@material-ui/core/IconButton"
import { useState, useEffect } from 'react';
export default function PublishBill(props) {
    const [user, setUser] = useState({
        acno: "",
        amount: "",
    })
    const [due, setDue] = useState("")

    const { acno, amount } = user
    const fieldValue = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setUser({ ...user, [name]: value })
    }
    const publishBill = async (e) => {
        try {
            e.preventDefault()
            const result = await fetch(("/publishBill"), {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    acno, amount, due
                })
            })
            const data = await result.json()
            if (result.status !== 201 || !data) {
                window.alert(data.err);
            }
            else {
                setUser({ acno: "", amount: "" })
                alert(data.msg)
            }

        } catch (err) {
            console.log("Error in Publishing Bill ")
        }
    }
    useEffect(() => {
        let year = new Date().getFullYear()
        let month = new Date().getMonth() + 2

        if (month >= 13) {
            year = year + 1
            month = 1
            setDue("05/" + month + "/" + year)
        }
        else {
            setDue("05/" + month + "/" + year)
        }
    }, [])
    return (
        <>
            <form className={style.form + " col-4 mx-auto my-3 py-4 px-0"}>
                <IconButton className="p-0 ms-4 col-12"><CloseIcon className={style.close + " m-0 bg-dark me-auto"} onClick={() => { props.handle(props.card) }} /></IconButton>
                <h3 className="mx-auto p-2">{" Publish bill "}</h3>
                <div className="mb-3 col-10  d-flex mx-auto">
                    <AcUnitIcon className={style.icon + " col-2 m-auto"} />
                    <input autoComplete="off" name="acno" type="text" className={style.field + "   col-10 ms-auto p-2"} value={acno} onChange={(e) => { fieldValue(e) }} placeholder="Account ID" />
                </div>
                <div className="mb-3 col-10 d-flex mx-auto">
                    <MoneyIcon className={style.icon + " col-2 m-auto"} />
                    <input autoComplete="off" name="amount" type="number" className={style.field + "   col-10 ms-auto p-2"} value={amount} onChange={(e) => { fieldValue(e) }} placeholder="Meter value in unit" />
                </div>
                {/* <div className="mb-3 col-10 d-flex mx-auto">
                    <TodayIcon className={style.icon + " col-2 m-auto"} />
                    <input autoComplete="off" name="due" disabled type="date" className={style.field + "   col-10 ms-auto p-2"} value={due} onChange={(e) => { fieldValue(e) }} placeholder="Due Date " />
                </div> */}
                <Button className={style.publish + " col-10  mx-auto my-3"} onClick={publishBill}>Publsh</Button>
            </form>
        </>
    )
}
