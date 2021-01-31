import React from 'react'

const Social: React.FC = () => {
    return (
        <ul className='d-flex justify-content-center align-items-center m-0 p-0'>
            <li>
                <a href='https://www.facebook.com/avi052' target='_blank' rel="noreferrer noopener" className='d-flex justify-content-center align-items-center'>
                    <i className="fab fa-facebook-f"></i>
                </a>
            </li>
            <li>
                <a href='https://www.instagram.com/aviel_wassa/' target='_blank' rel="noreferrer noopener" className='d-flex justify-content-center align-items-center'>
                    <i className="fab fa-instagram"></i>
                </a>
            </li>
            <li>
                <a href='mailto:avielwassa77@gmail.com'className='d-flex justify-content-center align-items-center'>
                    <i className="far fa-envelope"></i>
                </a>
            </li>
        </ul>

    )
}

export default Social;