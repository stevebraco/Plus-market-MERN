import React from 'react'
import { useSelector } from 'react-redux'

const ShippingAddressScreen = (props) => {
    const userSignin = useSelector(state => state.userSignin)
    const { userInfo } = userSignin

    if(!userInfo) {
        props.history.push('/signin')
    }
    return (
        <div>
            SHIP SHIP
        </div>
    )
}

export default ShippingAddressScreen
