import React, { Component } from "react";
import './Drawer.css'
import Backdrop from "../../UI/Backdrop/Backdrop";
import { NavLink } from "react-router-dom"

const links = [
    { to: '/', label: 'Список', exact: 'true' },
    { to: '/auth', label: 'Авторизация', exact: 'false' },
    { to: '/quiz-creator', label: 'Создать тест', exact: 'false' }

]

export default class Drawer extends Component {

    clickHandler = () => {
        this.props.onClose()
    }

    renderLinks() {
        return links.map((link, index) => {
            return (
                <li key={index}>
                    <NavLink
                        to={link.to}
                        exact={link.exact}
                        activeClassName="active"
                        onClick={this.clickHandler}
                    >
                        {link.label}
                    </NavLink>
                </li>
            )
        })
    }

    render() {

        const clsDr = ['Drawer']

        if (!this.props.isOpen) {
            clsDr.push('close')
        }

        return (
            <React.Fragment>
                <nav className={clsDr.join(' ')}>
                    <ul>
                        {this.renderLinks()}
                    </ul>
                </nav>
                {this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null}
            </React.Fragment>

        )
    }
}