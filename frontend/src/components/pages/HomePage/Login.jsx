import React from 'react'

import LoginModal from '../../homepage/modals/LoginModal'

const Login = (props) => {
    return (
        <div className="body">
            <LoginModal {...props} />
        </div>
    )
}

export default Login
