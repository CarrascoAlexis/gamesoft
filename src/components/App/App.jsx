import React from 'react';

import {
    createBrowserRouter,
    RouterProvider
} from "react-router-dom";
import axios from 'axios';

import Header from "../Header/Header";

const router = createBrowserRouter([
{
    path: "/",
    element: 
    <div>
        <p>Hello world!</p>
    </div>,
},
{
    path: "/compte",
    element: 
    <div>
        <p>compte</p>
    </div>
},
{
    path: "/connexion",
    element: 
    <div>
        <p>connexion</p>
    </div>
},
{
    path: "/contact",
    element: 
    <div>
        <p>contact</p>
    </div>
},
{
    path:"/services",
    element: 
    <div>
        <p>services</p>
    </div>
},
{
    path: "*",
    element: <p>404</p>
}
]);

const axiosInstance = axios.create({
    baseURL : 'http://localhost:5100/', 
    timeout: 800,
});



export default class App extends React.Component {
    state = {
        account: []
    }
    componentDidMount() {
        if(localStorage.getItem("token") != undefined)
        {
            console.log("ici")
            axiosInstance.get(`sessions`, {params: {"filter": {"token": "a4087aa265b29597a6978c9630e2bd21933e1f65736ad65bae"}}})
            .then(res => {
                const session = res.data;
                console.log(session.date)
                this.setState({ account: account });
                console.log(session)
            })
        }
        else{
            localStorage.setItem("token", "a4087aa265b29597a6978c9630e2bd21933e1f65736ad65bae")
        }
    }
    
    render(){
        return(
            <div>
                <Header account={this.state.account}/>
                <RouterProvider router={router}/>
            </div>
        );
    }
    
}