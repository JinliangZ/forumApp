import React, { Component } from 'react';

const Button = ({children,type,logout}) => {
    return ( 
        <button className="btn" type = {type} onClick={logout}>
           {children}
        </button>
     );
}
 
export default Button;