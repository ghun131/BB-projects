import React from 'react';
import Button from '@material-ui/core/Button';

const PageNumber = (props) => {
    return (
        <div>
            {props.pageNumbers.map(num => 
                <Button
                    key={num}
                    onClick={() => props.clicked(num)}>
                    {num}
                </Button>
            )}
        </div>
    )
}

export default PageNumber;