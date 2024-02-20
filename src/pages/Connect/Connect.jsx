import React from 'react';
import ConnectForm from '../../components/ConnectForm/ConnectForm'
import CreateAccountForm from '../../components/CreateAccountForm/CreateAccountForm';
import PageBase from '../../components/PageBase/PageBase';

export default class Connect extends PageBase {

    constructor(props)
    {
        super(props);
        this.state = {element: <ConnectForm/>, buttonText: "Créer un compte", connect: true}
        this.buttonCallBack = this.buttonCallBack.bind(this);
    }

    buttonCallBack(event)
    {
        if(this.state.connect === true)
        {
            this.setState({element: <CreateAccountForm/>, buttonText: "J'ai déjà un compte", connect: false})
        }
        else
        {
            this.setState({element: <ConnectForm/>, buttonText: "Créer un compte", connect: true})
        }
        event.preventDefault()
    }

    render() {
        if(this.isConnected())
        {
            console.log("redirection to Profil")
        }
        return(
            <div>
                {this.state.element}
                <button onClick={this.buttonCallBack}>{this.state.buttonText}</button>
            </div>
        )
    }
}