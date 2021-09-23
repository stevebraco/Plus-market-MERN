import React from 'react'
import { Link } from "react-router-dom";


const Banner = ({heading, text, ImgSrc}) => {
    return (
            <div className="banner">
                <img src={ImgSrc} alt="banner1" className="banner__img" />
                <div className="banner__content">
                    <h3 className="banner__heading"> {heading} </h3>
                    <p className='banner__upto'> {text}</p>
                    <Link to='/' className='btn btn--black'>check out</Link>
                </div>
            </div>
           
    )
}

export default Banner
