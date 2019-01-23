import React from 'react';

const Banner = () => {
    return (
        <div style={{
            color: 'white',
            padding: '2rem',
            marginBottom: '2rem',
            backgroundColor: "#5CB85C",
            boxShadow: "inset 0 8px 8px -8px rgba(0, 0, 0, 0.3), inset 0 -8px 8px -8px rgba(0, 0, 0, 0.3)"}}>
                <div style={{ maxWidth: '720px',
                        lineHeight: '1.5',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        paddingLeft: '15px',
                        paddingRight: '15px' }}>
                    <h1 style={{ 
                        textShadow: '0px 1px 3px rgba(0, 0, 0, 0.3)',
                        fontWeight: '700 !important',
                        textAlign: 'center',
                        fontSize: '3.5rem',
                        paddingBottom: '0.5rem',
                        color: 'inherit'}}>
                        BB Blog
                    </h1>
                    <p style={{ 
                        color: '#fff',
                        textAlign: 'center',
                        fontSize: '1.5rem',
                        fontWeight: '300 !important',
                        marginBottom: '0px' }}>Music makes you brave</p>
                </div>
            
        </div>
    )
}

export default Banner;