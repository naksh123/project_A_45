import React from 'react'
import style from "./css/SearchConsumer.module.scss"
import Button from '@material-ui/core/Button'
import LockIcon from '@material-ui/icons/Lock';
import EmailIcon from '@material-ui/icons/Email';
import SearchIcon from '@material-ui/icons/Search';
import { useState } from 'react';
export default function SearchConsumer(props) {
    // const [input,setInput]=useState("")
    return (
        <>
            <form className={style.form + " col-6 mx-auto  py-2 mb-3"}>
                <div className="mb-3 col-8  d-flex mx-auto">
                    <SearchIcon className={style.icon + " col-2 m-auto"} />
                    <input type="text" value={props.value} onChange={(e)=>props.setValue(e.target.value)} className={style.field + "   col-10 ms-auto p-2"} placeholder="Search by account Number or email" />
                </div>
                <Button onClick={()=>{props.handle()}} className={style.search + " col-3 px-3  mx-auto my-3"}>{props.content?props.content:"Search"}</Button>
            </form>
        </>
    )
}
