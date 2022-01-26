import React from 'react'
import style from "./css/StartInterface.module.scss"
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import Button from '@material-ui/core/Button'
import Login from "./Login"
import PersonIcon from '@material-ui/icons/Person';
import RefreshIcon from '@material-ui/icons/Refresh';
import { useState } from "react"
export default function StartInterface() {
    const [admin, setAdmin] = useState(false)
    const [user, setUser] = useState(false)
    const Admin = () => {
    
        // },500)
        const x = document.getElementById("admin")
        const y = document.getElementById("client")
        y.style.width = "0%"
        x.style.width = "100%"
        x.style.boxShadow = "none"
        y.style.display = "none"
        // x.style.margin = "auto"
        setTimeout(() => {
            setAdmin(true)
            setUser(false)
        }, 500)

    }
    const User = () => {
        const x = document.getElementById("admin")
        const y = document.getElementById("client")
        x.style.width = "0%"
        y.style.width = "100%"
        y.style.boxShadow = "none"
        // x.style.margin = "auto"
        setTimeout(() => {
            setAdmin(false)
            setUser(true)
            x.style.display = "none"
        }, 800)
    }
    const Change = () => {
        // window.location.reload()
        const x = document.getElementById("admin")
        const y = document.getElementById("client")
        if (admin) {
            setUser(false)
            setAdmin(false)
            x.style.width = "0%"
           setTimeout(()=>{
            y.style.display = "flex"
            x.style.display = "flex"
            y.style.width = "50%"
            x.style.width = "50%"
           },500)
        }
        else {
            setUser(false)
            setAdmin(false)
            y.style.width = "0%"
            setTimeout(() => {
                y.style.display = "flex"
                // User();
                x.style.display = "flex"
                x.style.width = "50%"
                y.style.width = "50%"
                y.style.boxShadow = "0px 0px 2px 2px rgb(199, 199, 199)"
                x.style.boxShadow = "0px 0px 2px 2px rgb(199, 199, 199)"
            }, 500)
        }
    }

    return (
        <>
            <div className={style.container + " container-fluid "}>
                <div className={style.row + " row"}>

                    <div id="admin" className={style.person + " col-6 "}>

                        <div className={style.userType + " col-12 my-auto "}>
                            <SupervisorAccountIcon className={style.icon + " p-4 mb-3"} />
                            {!admin && !user ?
                                <Button id="admin_btn" className="px-5 py-2" onClick={Admin}>I Am Admin</Button>
                                : <Button id="admin_btn" className="px-5 py-2" onClick={Change}><RefreshIcon className="mx-2" />Change</Button>
                            }
                        </div>
                        {admin ? <Login type="Admin" /> : undefined}

                    </div>
                    <div id="client" className={style.person + " col-6 "}>
                        <div className={style.userType + " col-12  my-auto"}>
                            <PersonIcon className={style.icon + " p-4 mb-3"} />
                            {!admin && !user ?
                                <Button id="client_btn" className="px-5 py-2" onClick={User}>I Am User</Button>
                                : <Button id="client_btn" className="px-5 py-2" onClick={Change}><RefreshIcon className="mx-2" />Change</Button>
                            }
                        </div>
                        {user ? <Login type="User" /> : undefined}
                    </div>

                </div>
            </div>
        </>
    )
}
