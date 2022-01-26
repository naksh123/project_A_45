import React from 'react'
import style from "./css/StartInterface.module.scss"
import Button from '@material-ui/core/Button'
import LockIcon from '@material-ui/icons/Lock';
import EmailIcon from '@material-ui/icons/Email';
import { Link, useHistory } from 'react-router-dom'
import { useState } from 'react'
export default function Login(props) {
    const history = useHistory()
    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    const fieldValue = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setUser({ ...user, [name]: value })
    }
    const Login = async (e,type) => {
        try {
            e.preventDefault()
            
            const { email, password } = user;
            const result = await fetch(("/login"), {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    email, password,type
                })
            })
            const data = await result.json();
            if (result.status !== 201) {
                alert(data.err)
            }
            else {
                alert(data.msg ? data.msg : "Login Successfull")
                console.log(data.type)
                if(data.type==="Admin"){
                    history.push("/admin")
                }
                else{
                    history.push("/home")
                }
                // console.log("data:"+data)
            }
        }
        catch (err) {
            console.log("Error in Login")
        }
    }
    return (
        <>
            <form className={style.form + " col-3 mx-auto my-3 py-4"}>
                <h3 className="mx-auto p-2">{props.type+" Login"}</h3>
                <div className="mb-3 col-10  d-flex mx-auto">
                    <EmailIcon className={style.icon + " col-2 m-auto"} />
                    <input autoComplete="off" type="email" name="email" className={style.field + "   col-10 ms-auto p-2"} value={user.email}  onChange={(e)=>fieldValue(e)} placeholder="Email" autoComplete="off" />
                </div>
                <div className="mb-3 col-10 d-flex mx-auto">
                    <LockIcon className={style.icon + " col-2 m-auto"} />
                    <input autoComplete="off" type="password" name="password" className={style.field + "   col-10 m-0 p-2"} value={user.password} onChange={(e)=>fieldValue(e)} placeholder="Password" />
                </div>
                <Button className={style.login + " col-10  mx-auto my-3"} onClick={(e)=>Login(e,props.type)}>Login</Button>
                
               {props.type==="User"? <Link to="/register" className=" mx-auto">Do not have any Account ?</Link>:undefined}
            </form>
        </>
    )
}
