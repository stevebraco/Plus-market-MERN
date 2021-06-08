import React from 'react'
import { Link } from "react-router-dom";


const BoxCategory = ({ heading, upto, numberImg }) => {
    return (
        <div className="box">
                <h3 className="box__heading"> {heading} </h3>
                <p className="box__upto"> {upto} </p>
                <img className='box__img' src={`./images/category-${numberImg}.png`} alt="" />
                <Link to='/' className='btn' >shop now</Link>
            </div>
    )
}

export default BoxCategory
