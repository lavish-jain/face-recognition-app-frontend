import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { server } from '../../constants';

class Register extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            redirect: false,
        }
    }
    onNameChange = (event) => {
        const state = this.state;
        const newState = {
            ...state,
            name: event.target.value,
        };
        this.setState(newState);
    }
    onEmailChange = (event) => {
        const state = this.state;
        const newState = {
            ...state,
            email: event.target.value,
        };
        this.setState(newState);
    }
    onPasswordChange = (event) => {
        const state = this.state;
        const newState = {
            ...state,
            password: event.target.value,
        };
        this.setState(newState);
    }
    onRegister = async () => {
        const { name, email, password } = this.state;
        const body = {
            name,
            email,
            password,
        }
        try {
            const response = await axios.post(`${server}/register`, body);
            if(response.data) {
                this.props.loadUser(response.data);
                this.props.onRouteChange('home');
                const state = this.state;
                const newState = {
                    ...state,
                    redirect: true,
                }
                this.setState(newState);
            }
        } catch (err) {
            console.log(err);
        }

    }
    render() {
        const { redirect } = this.state;
        if (redirect) {
            return (
                <Redirect to="/" />
            )
        }
        return (
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name" id="name" onChange={this.onNameChange} />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address" id="email-address" onChange={this.onEmailChange} />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password" id="password" onChange={this.onPasswordChange} />
                            </div>
                        </fieldset>
                        <div className="">
                            <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" onClick={this.onRegister} type="submit" value="Register" />
                        </div>
                    </div>
                </main >
            </article>
        );
    }
}

export default Register;