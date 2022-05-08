import React from 'react'

import RegisterModal from '../../homepage/modals/RegisterModal'

const Register = (props) => {
    return (
        <div className="body">
            <RegisterModal {...props} />
        </div>
    )
}

export default Register