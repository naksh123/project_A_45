import React from 'react'
import style from './css/PaymentHistory.module.scss'
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from "@material-ui/core/IconButton"
import Button from "@material-ui/core/Button"
import TodayIcon from '@material-ui/icons/Today';
import { useState, useEffect } from 'react';
export default function PaymentHistory(props) {
    
    const [bill, setBill] = useState([])
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
                setBill([...data.user.bill])
            }
        }
        catch (err) {
            console.log("error in getData :" + err)
        }
    }
    useEffect(() => {
        getData()
        console.log(bill)
    }, [])
    return (
        <>
            <div className={style.history_container + " col-5 mx-auto "}>
                <IconButton className="bg-light p-0 ms-2 mt-4"><CloseIcon className={style.close + " m-0 bg-dark "} onClick={() => { props.handle("") }} /></IconButton>
                <h3 className="text-center py-2 col-6 mx-auto mb-3">Payment History</h3>
                {
                    bill.reverse().map((value) => {
                        return (
                            <div key={value._id} className={style.payment + " col-12 my-2 px-2 pb-2"}>
                                <div className={style.time + "  border-bottom col-12 mb-2"}>
                                    <TodayIcon className={style.icon + " m-2 "} />
                                    <p className="my-auto p-2">Due date: {value.due}</p>
                                    <p className="my-auto p-2">Paid on:{value.date}</p>
                                </div>
                                <p className=" p-2 px-4 col-6  my-auto me-auto ">Amount : &#x20B9; {value.amount}/-{value.status=="paid"?<input className="bg-danger text-light outline-0 border-0 rounded px-2" type="text" disabled  value={value.extra==="0"?"+0 Rs as a penalty":"+"+value.extra+" Rs as a penalty"}/>:""}</p>
                                <Button className={style.status + " m-2 col-4  " + style.paid + " "}>{value.status=="paid"?"Paid":"Not Paid"}</Button>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}
