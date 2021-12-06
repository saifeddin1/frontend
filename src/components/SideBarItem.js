import React from 'react'

const SideBarItem = (props) => {
    return (
        <div>
            <li 
            className="row">
            <div id="icon">{props.icon}</div>
            <div id="title">{props.title}</div>
            </li>
        </div>
    )
}

export default SideBarItem
