import React from 'react'

const SideBarItem = (props) => {
    return (
        <div>
            <li
                className="row" onClick={props.onClick}>
                <div id="icon">{props.icon}</div>
                <div id="title">{props.title}</div>
            </li>
        </div>
    )
}

export default SideBarItem
