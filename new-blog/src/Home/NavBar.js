import React from 'react'
import { Link } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';

const NavBar = (props) => {
    return (
        <div 
            style={{ margin: "20px auto", 
                padding: '15px',
                width: '80%',
                textAlign: 'left'}}>
                <Link to='/'>
                    Your Feed
                </Link>
                &nbsp; &nbsp;
                <Link to='/'>
                    Global Feed
                </Link>
                
            <Divider light style={{marginTop: "15px"}}/>
        </div>
    )
}

export default NavBar;