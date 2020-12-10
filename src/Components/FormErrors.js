import React, { useState, useEffect } from 'react';

const FormErrors = ({success,errors}) => {
    return ( 
        <div className="form_errors">
                <ul>
                    <li>{errors}</li> 
                    <li>{success}</li> 
                </ul>          
        </div>
     );
}
 
export default FormErrors;