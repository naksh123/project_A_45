import React from 'react'
import Button  from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
import MessageIcon from '@material-ui/icons/Message';
import DetailsIcon from '@material-ui/icons/Details';
import PaymentIcon from '@material-ui/icons/Payment';
import HistoryIcon from '@material-ui/icons/History';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import AddIcon from '@material-ui/icons/Add';
import UpdateIcon from '@material-ui/icons/Update';
import SearchIcon from '@material-ui/icons/Search';
import style from "./css/Card.module.scss"
export default function Card(props) {
   
    return (
        <> 
            <div className={style.card+ " card col-2 p-0 my-4"}>
                <div className={style.body+" card-body col-12 "}>
                    {props.icon=="MessageIcon"&&<MessageIcon className={style.icon + " col-12"} />}
                    {props.icon=="DetailsIcon"&&<DetailsIcon className={style.icon + " col-12"}/>}
                    {props.icon=="PaymentIcon"&&<PaymentIcon className={style.icon + " col-12"}/>}
                    {props.icon=="HistoryIcon"&&<HistoryIcon className={style.icon + " col-12"}/>}
                    {props.icon=="DeleteForeverIcon"&&<DeleteForeverIcon className={style.icon + " col-12"}/>}
                    {props.icon=="AddIcon"&&<AddIcon className={style.icon + " col-12"}/>}
                    {props.icon=="UpdateIcon"&&<UpdateIcon className={style.icon + " col-12"}/>}
                    {props.icon=="SearchIcon"&&<SearchIcon className={style.icon + " col-12"}/>}
                    <Button className="m-0 px-4" onClick={()=>{props.handle(props.card)}}>{props.title}</Button>
                </div>
            </div>
        </>
    )
}
