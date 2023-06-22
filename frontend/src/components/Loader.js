import React from 'react'
import { Spinner } from 'reactstrap';

const Loader = () => {
    return (
            <Spinner style={{ width: '100px', height: '100px',margin:'auto',display:'block' }} color="primary">
                <span className='sr-only'>Loading...</span>
            </Spinner>
    )
}

export default Loader
