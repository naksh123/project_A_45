import React from 'react'
import style from './css/ClientMessage.module.scss'
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from "@material-ui/core/IconButton"
import { useEffect, useState } from "react"
export default function Mesages(props) {
    const x = new Date()
    const date = x.getDate()
    const month = x.getMonth() + 1
    const year = x.getFullYear()
    let hour = `${x.getHours()}`
    let min = `${x.getMinutes()}`
    if (min.length == 1) {
        min = "0" + min
    }
    if (hour.length == 1) {
        hour = "0" + hour
    }
    const fulldate = date + "/" + month + "/" + year + "  " + hour + ":" + min
    const [msg, setMsg] = useState([{}])
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
                // console.log(data.user)
                setMsg([...data.user.messages])
            }
        }
        catch (err) {
            console.log("error in getData :" + err)
        }
    }
    useEffect(() => {
        getData()
    }, [])
    return (
        <>
            <div className={style.msg_container + " col-5 mx-auto "}>
                <IconButton className="bg-light p-0 ms-2 mt-4"><CloseIcon className={style.close + " m-0 bg-dark "} onClick={() => { props.handle("") }} /></IconButton>
                <h3 className="text-center py-2 col-6 mx-auto mb-3">Messages</h3>
                {
                    msg.reverse().map((value) => {
                        return (
                            <div key={value._id} className={style.msg + " col-12  "}>
                                <div className={style.time + " row col-12 border-bottom  my-2 py-2 mx-auto"}>
                                    <h4 className="my-auto px-2 col-4 ">Ac: {value.acno}</h4>
                                    <p className="my-auto col-7 ">{value.date?.substring(0,25)}</p>
                                </div>
                                <p className=" p-2 px-4 text-center ">{value.message}</p>
                            </div>
                        )
                    })
                }

            </div>
        </>
    )
}
