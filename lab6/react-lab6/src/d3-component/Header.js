import { color } from 'd3';
import React from 'react'

function Header(props) {
    
    const columns = props.columns;
    const iscolumnsUndefined  = props.iscolumnsUndefined ;

    if (iscolumnsUndefined) {
        return <h1>Loading...</h1>
    } 
    return (
        <div
            className="header-div" 
            style={{
                marginTop:"0.5vh"
            }}
        >
            {columns.map((property, i) => {
                return <button 
                            key={i} 
                            value={property} 
                            onClick={(e) => {
                                props.yColumnHandler(e.target.value)
                            }}
                            style={{
                                // whiteSpace:"normal",
                                textAlign:"center",
                                marginLeft:"1vw",
                                borderRadius:"10px",
                                width:"6.6vw",
                                height:"3vh",
                                fontSize:"0.7rem",
                                fontWeight:"bold"
                            }}
                        >{property}</button>
            })}
        </div>
        
    )
    

    
}

export default Header;