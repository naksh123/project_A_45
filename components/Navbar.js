import React from 'react'
import { useEffect } from "react"
import { NavLink } from "react-router-dom"
import { useHistory } from 'react-router-dom'
import { HashLink as Link } from 'react-router-hash-link';
// import { useSelector, useDispatch } from "react-redux"
// import { Login, Logout } from "../actions/action"
import style from "./css/Navbar.module.scss"
export default function Navbar() {
    // const myState = useSelector((state) => state.changeTheUserLog)
    // const dispatch = useDispatch()
    const history = useHistory()
    const LogoutUser = async () => {

        try {
            // dispatch(Logout())
            const result = await fetch(("/logout"), {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            history.push("/")
            window.location.reload()
        }
        catch (err) {
            console.log("error in navbar :" + err)
        }
    }
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
            // console.log("result"+result)
            // console.log("data"+data)
            if (data?.user) {
                // dispatch(Login())
                if (data.type == "Admin") {
                    history.push("/admin")
                }
                else {
                    history.push("/home")
                }
            }

        }
        catch (err) {
            // dispatch(Logout())
            history.push("/")
            // console.log("error in getData :" + err)
        }
    }
    useEffect(() => {
        getData()
    }, [])
    return (
        <>
            <nav className={style.navbar + " navbar navbar-expand-lg p-0 mx-auto"}>
                <div className={style.link_container + " container-fluid"}>
                    <NavLink to="/" className={style.logo + " col-2 me-auto  "}>ELectConsDB</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className={style.main_link + " collapse navbar-collapse  "} id="navbarSupportedContent">
                        <ul className={style.navbar_nav + " col-12 navbar-nav mb-2 mb-lg-0"}>
                            <li className={style.nav_item + " nav-item "}>
                                <NavLink to="/home" className={style.navlink + " "}>Home</NavLink>
                            </li>
                            <>
                                <li className={style.nav_item + " nav-item"}>
                                    <Link smooth to="#contact" className={style.navlink}>Contact</Link>
                                </li>
                                <li className={style.nav_item + " nav-item"}>
                                    <NavLink to="/" className={style.navlink} onClick={LogoutUser}>Logout</NavLink>
                                </li>
                            </>
                            {/* {
                                !myState ?
                                    <>
                                        <li className={style.nav_item + " nav-item"}>
                                            <NavLink to="/" className={style.navlink}>Login</NavLink>
                                        </li>
                                        <li className={style.nav_item + " nav-item"}>
                                            <NavLink to="/register" className={style.navlink}>Register</NavLink>
                                        </li>
                                    </> : */}


                            {/* } */}

                        </ul>

                    </div>
                </div>
            </nav>
        </>
    )
}
