import React from 'react'
import { Route,Switch } from 'react-router'
import StartInterface from './components/StartInterface'
import Navbar from './components/Navbar'
import Register from './components/Register'
import Home from './components/Home'
import Admin from "./components/Admin"
export default function App() {
  return (
    <div className="container-fluid p-0 ">
      <Switch>
        <Route path="/" exact>
          <StartInterface/>
        </Route>
        <Route path="/home" exact>
          <Home/>
        </Route>
        <Route path="/register" >
          {/* <Navbar/> */}
          <Register/> 
        </Route>
        <Route path="/admin" >
          <Admin/>
        </Route>
      </Switch>
    </div>
  )
}
