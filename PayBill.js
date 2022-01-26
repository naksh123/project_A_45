import React from 'react'
import style from "./css/PayBill.module.scss"
import Button from '@material-ui/core/Button'
import LockIcon from '@material-ui/icons/Lock';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from "@material-ui/core/IconButton"
export default function PayBill(props) {
    const payBill = async(e) => {

        try {
            e.preventDefault()
            const result = await fetch(("/payBill"), {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    status:"paid",
                    date:new Date()
                })
            })
            const data = await result.json()
            if (result.status !== 201 || !data) {
                window.alert(data.err);
            }
            else {
                alert(data.msg)
                sendMessage()
               }

        } catch (err) {
            console.log("Error in Pay Bill ")
        }

    }
    const sendMessage = async (e) => {
        try {
            // e.preventDefault()
            const result = await fetch(("/paymentSms"), {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    message:"Thanks for paying Bill, Amount Recieved Successfully "
                })
            })
            const sms = await result.json()
            

        } catch (err) {
            console.log()
        }
    }

    return (
        <>
            <div className={style.paybill + " row col-6 mx-auto "}>
                <IconButton className="bg-light p-0 ms-2 mt-4 col-auto me-auto "><CloseIcon className={style.close + " m-0 bg-dark "} onClick={() => { props.handle("") }} /></IconButton>
                <form className={style.form + " col-11 mx-auto  d-flex "}>
                    <h3 className="mx-auto p-2 px-3">Account info</h3>
                    <div className="mb-3 col-12  d-flex mx-auto">
                        <p className={style.label + " col-4 m-auto border-end py-2 px-3  text-center"}>Ac Holder Name</p>
                        <input type="text" className={style.field + "   col-8 ms-auto px-2 bg-secondary "} disabled placeholder="ElectConsDB pvt lmt company" />
                    </div>
                    <div className="mb-3 col-12  d-flex mx-auto">
                        <p className={style.label + " col-4 m-auto border-end py-2 px-3  text-center"}>Ac Number</p>
                        <input type="text" className={style.field + "   col-8 ms-auto px-2 bg-secondary "} disabled placeholder="38423723167" />
                    </div>
                    <div className="mb-3 col-12  d-flex mx-auto">
                        <p className={style.label + " col-4 m-auto border-end py-2 px-3  text-center"}>CIF Number</p>
                        <input type="text" className={style.field + "   col-8 ms-auto px-2 bg-secondary "} disabled placeholder="99196231124" />
                    </div>
                    <div className="mb-3 col-12  d-flex mx-auto">
                        <p className={style.label + " col-4 m-auto border-end py-2 px-3  text-center"}>IFSC Code</p>
                        <input type="text" className={style.field + "   col-8 ms-auto px-2 bg-secondary "} disabled placeholder="SBIN00009866" />
                    </div>
                    <h3 className="mx-auto p-2 px-3">UPI info</h3>
                    <div className="mb-3 col-10  d-flex mx-auto">
                        <p className={style.label + " col-5 m-auto border-end py-2 px-3  text-center"}>Gpay Upi ID</p>
                        <input type="text" className={style.field + "   col-7 ms-auto px-2 bg-secondary "} disabled placeholder="electconsdb@oksbi" />
                    </div>
                    <div className="mb-3 col-10  d-flex mx-auto">
                        <p className={style.label + " col-5 m-auto border-end py-2 px-3  text-center"}>PhonePay Upi ID</p>
                        <input type="text" className={style.field + "   col-7 ms-auto px-2 bg-secondary "} disabled placeholder="electconsdb@ybl" />
                    </div>
                    <div className="mb-3 col-10  d-flex mx-auto">
                        <p className={style.label + " col-5 m-auto border-end py-2 px-3  text-center"}>Paytm Upi ID</p>
                        <input type="text" className={style.field + "   col-7 ms-auto px-2 bg-secondary "} disabled placeholder="electconsdb@paytm" />
                    </div>

                </form>
                <Button className={style.paybill + " col-10  mx-auto my-3"} onClick={payBill}>Pay Bill</Button>
            </div>
        </>
    )
}
