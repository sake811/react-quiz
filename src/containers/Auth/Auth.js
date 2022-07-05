import React, { Component } from "react";
import './Auth.css';
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import is from "is_js";
import axios from "axios";




export default class Auth extends Component {

    state = {
        isFormValid: false,
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errorMessage: 'Введите корректный email',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Password',
                errorMessage: 'Пароль не может быть меньше 8 символов, введите корректный пароль!',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 8
                }
            }
        }
    }

    loginHandler = async () => {
        const authData = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true
        }

        try {
            const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyArz0incsBn5piSnGkRzE31hfmhb7RgdWc', authData)
            console.log(response)
        } catch (e) {

        }
    }

    registerHandler = async () => {
        const authData = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true
        }

        try {
            const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyArz0incsBn5piSnGkRzE31hfmhb7RgdWc', authData)
            console.log(response)
        } catch (e) {

        }

    }

    submitHandler = event => {
        event.preventDefault()
    }

    validateControl(value, validation) {
        if (!validation) {
            return true
        }

        let isValid = true

        if (validation.required) {
            isValid = value.trim() !== '' && isValid
        }

        if (validation.email) {
            isValid = is.email(value) && isValid
        }

        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid
        }

        return isValid
    }

    onChangeHandler = (event, controlName) => {
        // console.log(`${controlName}:`, event.target.value)

        const formControls = { ...this.state.formControls }
        const control = { ...formControls[controlName] }

        control.value = event.target.value
        control.touched = true
        control.valid = this.validateControl(control.value, control.validation)

        formControls[controlName] = control

        let isFormValid = true

        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid
        })

        this.setState({
            formControls: formControls,
            isFormValid: isFormValid
        })
    }

    renderInputs() {
        const inputs = Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]
            return (
                <Input
                    key={controlName + index}
                    type={control.type}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    shouldValidate={!!control.validation}
                    errorMessage={control.errorMessage}
                    onChange={(event) => this.onChangeHandler(event, controlName)}
                />
            )
        })

        return inputs
    }


    render() {
        return (
            <div className="Auth">
                <div>
                    <h1>
                        Авторизация
                    </h1>
                    <form className="AuthForm" onSubmit={this.submitHandler}>
                        {this.renderInputs()}
                        <Button type="success" onClick={this.loginHandler} disabled={!this.state.isFormValid}>Войти</Button>
                        <Button type="primary" onClick={this.registerHandler} disabled={!this.state.isFormValid}>Зарегестрироваться</Button>
                    </form>
                </div>
            </div>
        )
    }
}