import React from 'react';
import config from '../../utilities/config';
import { useLocation, Navigate } from 'react-router-dom';
import { redirect } from "react-router-dom";

export default class ConnectForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {mail: '', pass: '', checked: false, connected: true};

    this.handleChangeMail = this.handleChangeMail.bind(this);
    this.handleChangePass = this.handleChangePass.bind(this);
    this.handleChangeChecked = this.handleChangeChecked.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeMail(event) {
    this.setState({mail: event.target.value});
  }

  handleChangePass(event) {
    this.setState({pass: event.target.value});
  }

  handleChangeChecked(event) {
    if(this.state.checked === true)
    {
      this.setState({checked: false})
      console.log("unchecked")
    }
    else
    {
      this.setState({checked: true})
      console.log("checked")
    }
  }

  generateSession(user) {
    console.log("bite")
    config.axiosInstance.get('https://api.ipify.org/?format=json')
    .then(res => {
      const id = user.id
      const checked = (this.state.checked === true) ? "0" : "1"
      console.log("ICI")
      console.log(res)
      config.axiosInstance.post('/sessions/create', {params: {"ip": `${res.data.ip}`, "account_id": `${id}`, "ephemeral": `${checked}`}})
      .then(res => {
        localStorage.setItem("token", res.data.token)
        console.log("connecté")
        this.setState({connected: true})
        console.log(this.state)
      })
    })
  }

  handleSubmit(event) {
    config.axiosInstance.get('users', {params: {filter: {"email": this.state.mail}}})
    .then(res => {
      console.log(res.data)
      const user = res.data[0]
      if(res.data.length === 0) return false;
      config.axiosInstance.post('connectuser', {params: {"id": `${res.data[0].id}`, "pass": `${this.state.pass}`}})
      .then(res => {
        if(res.data === true) this.generateSession(user)
      })
    })
    event.preventDefault();
  }

  render() {
    redirect("/")
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          mail:
          <input type="text" value={this.state.mail} onChange={this.handleChangeMail}/>
        </label>
        <label>
          Name:
          <input type="password" value={this.state.pass} onChange={this.handleChangePass} />
        </label>
        <label>
          Rester connecté
          <input type="checkbox" onChange={this.handleChangeChecked} checked={this.state.checked}/>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}