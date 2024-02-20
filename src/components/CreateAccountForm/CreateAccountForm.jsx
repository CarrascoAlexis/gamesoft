import React from 'react';
import config from '../../utilities/config';
import Colorful from '@uiw/react-color-colorful';
import Circle from '@uiw/react-color-circle';
import { hsvaToHex } from '@uiw/color-convert'
import { redirect } from 'react-router-dom';

export default class CreateAccountForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mail: '', 
      pass: '', 
      passtwo: '', 
      checked: false,
      username: '',
      firstName: '',
      lastName: '',
      publicProfile: false,
      color: '#ff000',
      colorPicker: false,
      err: false, state: 0
    };
    this.colorList = ['#f44e3b', '#fe9200', '#fcdc00', '#dbdf00']

    this.handleChangeMail = this.handleChangeMail.bind(this);
    this.handleChangePass = this.handleChangePass.bind(this);
    this.handleChangePassTwo = this.handleChangePassTwo.bind(this);
    this.handleChangeChecked = this.handleChangeChecked.bind(this);
    this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
    this.handleChangeLastName = this.handleChangeLastName.bind(this);
    this.handleChangePublic = this.handleChangePublic.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitTwo = this.handleSubmitTwo.bind(this);
  }

  isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  handleChangeMail(event) {
    this.setState({mail: event.target.value});
  }

  handleChangePass(event) {
    this.setState({pass: event.target.value});
  }
  handleChangePassTwo(event) {
    this.setState({passtwo: event.target.value});
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
  
  handleChangeFirstName(event)
  {
    this.setState({firstName: event.target.value})
  }

  handleChangeLastName(event)
  {
    this.setState({lastName: event.target.value})
  }

  handleChangePublic(event)
  {
    this.setState({publicProfile: !this.state.publicProfile})
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
        return redirect('/test')
      })
    })
  }

  handleSubmit(event) {
    config.axiosInstance.get('users', {params: {filter:{"email": `${this.state.mail}`}}})
    .then(res => {
      if(res.data.length !== 0)
      {
        this.setState({err: 2});
        return;
      }
      if(this.isValidEmail(this.state.mail) === false)
      {
        this.setState({err: 4})
        return;
      }
      if(this.state.pass === '')
      {
        this.setState({err: 3})
        return;
      }
      if(this.state.pass !== this.state.passtwo)
      {
        this.setState({err: 1})
        return;
      }
      this.setState({state: 1})
    })
    event.preventDefault();
  }
  
  generateSession(user) {
    config.axiosInstance.get('https://api.ipify.org/?format=json')
    .then(res => {
      const id = user.id
      const checked = (this.state.checked === true) ? "0" : "1"
      console.log("ICI")
      console.log(res.data.ip)
      config.axiosInstance.post('/sessions/create', {params: {"ip": `${res.data.ip}`, "account_id": `${id}`, "ephemeral": `${checked}`}})
      .then(res => {
        console.log(res.data)
        localStorage.setItem("token", res.data.token)
        console.log("CONNECTED")
      })
    })
  }
  

  handleSubmitTwo(event)
  {
    console.log(this.state)
    this.setState({color: hsvaToHex(this.state.color)})
    console.log(this.state)
    config.axiosInstance.post('users/create', {params: this.state})
    .then(res => {
      console.log(res.data)
      const id = res.data.insertId
      config.axiosInstance.post('connectuser', {params: {"id": `${id}`, "pass": `${this.state.pass}`}})
      .then(res => {
        console.log("bIUFEZBUYFG")
        console.log(id)
        if(res.data == true) this.generateSession({id: id})
      })
    })
    event.preventDefault();
  }

  getUserInfos()
  {
    return {mail: this.state.mail, pass: this.state.pass};
  }

  render() {
    if (this.state.state === 0 )
    {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            mail:
            <input type="text" value={this.state.mail} onChange={this.handleChangeMail}/>
            {(this.state.err === 2) ? <p>Deja utilisé</p> : null}
            {(this.state.err === 4) ? <p>Mail invalide</p> : null}
          </label>
          <label>
            Password:
            <input type="password" value={this.state.pass} onChange={this.handleChangePass} />
          </label>
          <label>
            Password 2:
            <input type="password" onChange={this.handleChangePassTwo} />
          </label>
          {(this.state.err === 1) ? <p>Les mots de passe ne correspondent pas</p> : null}
          {(this.state.err === 3) ? <p>Veuillez définir un mot de passe</p> : null}
          <input type="submit" value="Submit" />
        </form>
      );
    }if(!this.colorList.includes(this.state.color)) 
    {
        this.colorList = ['#f44e3b', '#fe9200', '#fcdc00', '#dbdf00']
        this.colorList.push(this.state.color)
    }
    return(
    <form onSubmit={this.handleSubmitTwo}>
        <label>
          First Name:
          <input type="text" value={this.state.firstName} onChange={this.handleChangeFirstName}/>
        </label>
        <label>
          Last Name:
          <input type="text" value={this.state.lastName} onChange={this.handleChangeLastName}/>
        </label>
        <button type="button" onClick={event => {this.setState({colorPicker: !this.state.colorPicker})}}>{this.state.colorPicker === true ? "Simplifier" : "Deployer"}</button>
        {this.state.colorPicker === true ?  
        <Colorful
          color={this.state.color}
          disableAlpha={true}
          onChange={(color) => {
              this.setState({color: color.hex});
          }}
        />
        : 
        <Circle
          colors={this.colorList}
          color={this.state.color}
          onChange={(color) => {
              this.setState({color: color.hex});
          }}
        />
        }
        <label>
          Rester connecté
          <input type="checkbox" onChange={this.handleChangeChecked} checked={this.state.checked}/>
        </label>
        <input type="checkbox" onChange={this.handleChangePublic} checked={this.state.publicProfile}/>
        <input type="submit" value="Submit" />
    </form>
    )
  }
}