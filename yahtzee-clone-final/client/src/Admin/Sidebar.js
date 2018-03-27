import React from 'react';


function Sidebar(props){
    return (
        <div className="sidebarContainer">
            <input
                type="text"
                onChange={props.handleChange}
                name="nameQuery"
                value={props.nameQuery}
                placeholder="Filter Scores by Name"
            />
            <input
                type="text"
                onChange={props.handleChange}
                name="scoreQuery"
                value={props.scoreQuery}
                placeholder="Filter Scores by Score"
            />
        </div>
    )
}

export default Sidebar;
