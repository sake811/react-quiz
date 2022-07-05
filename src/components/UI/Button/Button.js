import React from "react";
import './Button.css'

const Button = props => {

    const clsas = [
        "Button",
        props.type
    ]

    return (
        <button
            onClick={props.onClick}
            className={clsas.join(' ')}
            disabled={props.disabled}
        >
            {props.children}
        </button>
    )
}

export default Button