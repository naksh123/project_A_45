import React from 'react'
import style from "./css/SearchAll.module.scss"
import SearchConsumer from "./SearchConsumer"
import EmailIcon from '@material-ui/icons/Email';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import PersonIcon from '@material-ui/icons/Person';
import PhoneIcon from '@material-ui/icons/Phone';
import Button from "@material-ui/core/Button"
import HomeIcon from '@material-ui/icons/Home';
import { useState, useEffect } from 'react';
export default function SearchAll(props) {
    const [search, setSearch] = useState("")
    const [detailOf, setDetailsOf] = useState("")
    const [users, setUsers] = useState([{}])
    const showDetails = () => {
        setDetailsOf(search)
        console.log(detailOf)
    }
    const getData = async () => {
        try {
            const result = await fetch(("/allUser"), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    value:""
                })
            })
            const data = await result.json()
            setUsers([...data])
        }
        catch (err) {
            console.log("error in  getData  Search:" + err)
        }
    }
    useEffect(() => {
        getData()
    }, [])
    return (
        <>
            <div className={style.container + " row py-2 col-10 mx-auto"}>
                <div className={style.search + " col-12 py-3"}>
                    <SearchConsumer handle={showDetails} content="show" value={search} setValue={setSearch} />
                </div>
                <div className="col-4 m-0  me-3">
                    {
                        users.map((value, _id) => {

                            if (value.acno?.includes(search) || value.email?.includes(search)) {
                                return (
                                    <form key={value._id} className={style.form + " col-12 mx-auto my-3 py-1"}>
                                        <div className="mb-0 col-10  d-flex mx-auto">
                                            <AcUnitIcon className={style.icon + " col-2 m-auto"} />
                                            <input type="text" value={value.acno} onChange={() => { }} className={style.field + "   col-10 ms-auto p-2"} placeholder="39817498134" />
                                        </div>
                                        <div className=" col-10 d-flex mx-auto">
                                            <EmailIcon className={style.icon + " col-2 m-auto"} />
                                            <input type="email" value={value.email} onChange={() => { }} className={style.field + "   col-10 m-0 p-2"} placeholder="jayraj@gmail.com" />
                                        </div>
                                    </form>
                                )
                            }
                        })
                    }
                </div>
                <div className={style.detail + " border row col-8 my-3 mb-auto"}>
                    <h3 className="mx-auto p-2 text-center col-4 ">Details</h3>
                    {
                        users.map((value, _id) => {
                            if (value.acno === detailOf || value.email === detailOf) {
                                return (
                                    <div className="row col-12  mx-auto p-0 mb-auto">
                                        <div className="col-6 border-end my-2">
                                            <form className={style.form + " col-12 mx-auto  d-flex "}>
                                                <div className="mb-3 col-10  d-flex mx-auto">
                                                    <PersonIcon className={style.icon + " col-2 m-auto"} />
                                                    <input type="text" value={value.name} onChange={() => { }} disabled className={style.field + "   col-10 ms-auto p-2"} placeholder="Full Name" />
                                                </div>
                                                <div className="mb-3 col-10  d-flex mx-auto">
                                                    <AcUnitIcon className={style.icon + " col-2 m-auto"} />
                                                    <input type="text" value={value.acno} onChange={() => { }} disabled className={style.field + "   col-10 ms-auto p-2"} placeholder="10 Digit Ac No." />
                                                </div>
                                                <div className="mb-3 col-10  d-flex mx-auto">
                                                    <PhoneIcon className={style.icon + " col-2 m-auto"} />
                                                    <input type="number" value={value.phone} onChange={() => { }} disabled className={style.field + "   col-10 ms-auto p-2"} placeholder="Phone Number" />
                                                </div>
                                                <div className="mb-3 col-10  d-flex mx-auto">
                                                    <EmailIcon className={style.icon + " col-2 m-auto"} />
                                                    <input type="email" value={value.email} onChange={() => { }} disabled className={style.field + "   col-10 ms-auto p-2"} placeholder="Email" />
                                                </div>
                                                <div className="mb-3 col-10  d-flex mx-auto">
                                                    <HomeIcon className={style.icon + " col-2 m-auto"} />
                                                    <input type="text" value={value.address} onChange={() => { }} disabled className={style.field + "   col-10 ms-auto p-2"} placeholder="Address" />
                                                </div>
                                            </form>
                                        </div>
                                        <div className={style.history + " col-6 p-0  my-2 mx-auto"}>
                                            <h3 className="text-center py-2 col-12 mx-auto mb-3">Payment History</h3>
                                            {
                                                value?.bill?.reverse().map((val, index) => {
                                                    return (
                                                        <div className={style.payment + " col-12 my-2 px-2 pb-3 mx-auto "}>
                                                            <div className={style.time + "  border-bottom mb-2 col-12"}>
                                                                <p className="my-auto p-2">Due date: {val.due}</p>
                                                                <p className="my-auto p-2">Paid on:{val.date}</p>
                                                            </div>
                                                            <p className=" p-2 px-4 col-6  my-auto me-auto ">&#x20B9; {val.amount}/-</p>
                                                            <Button className={style.status + " m-2 col-4  p-0 " + style.paid+ " "}>{val.status}</Button>
                                                        </div>
                                                    )
                                                })
                                            }


                                        </div>
                                    </div>
                                )
                            }
                        })
                    }
                </div>
            </div>
        </>
    )
}
