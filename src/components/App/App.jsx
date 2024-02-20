import React from 'react';

import {
    createBrowserRouter,
    RouterProvider
} from "react-router-dom";

import config from '../../utilities/config';

import Header from "../Header/Header";
import Connect from '../../pages/Connect/Connect';
import Profil from '../../pages/Profil/Profil';
import PageBase from '../PageBase/PageBase';

export default class App extends PageBase {
    constructor(props)
    {
        super(props)
        this.state = {
            account: []
        }

        this.router = createBrowserRouter([
            {
                path: "/",
                element: 
                <div>
                    <Header account={this.state.account}/>
                    <p>Hello world!</p>
                </div>,
            },
            {
                path: "/compte",
                element: 
                <div>
                    <Header account={this.state.account}/>
                    <p>compte</p>
                </div>
            },
            {
                path: "/connexion",
                element:
                <div>
                    <Header account={this.state.account}/>
                    <Connect/>
                </div>
            },
            {
                path: "/contact",
                element: 
                <div>
                    <Header account={this.state.account}/>
                    <p>contact</p>
                </div>
            },
            {
                path: "/profil",
                element: 
                <div>
                    <Header account={this.state.account}/>
                    <Profil account={this.state.account}/>
                </div>
            },
            {
                path:"/services",
                element: 
                <div>
                    <Header account={this.state.account}/>
                    <p>services</p>
                </div>
            },
            {
                path: "*",
                element: <p>404</p>
            }
        ]);
    }
    
    render(){
        return(
            <RouterProvider router={this.router}/>
        );
    }
    
}