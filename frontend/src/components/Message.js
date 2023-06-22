import React from 'react'
import { Alert } from 'reactstrap';

const Message = ({color,children}) => {
    return (
        <Alert color={color}>
            {children}
        </Alert>
    )
}

Message.defaultProps = {
    color:'info'
}

export default Message
