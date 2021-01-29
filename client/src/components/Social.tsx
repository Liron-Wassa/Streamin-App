import React from 'react'

const Social: React.FC = () => {
    return (
        <ul>
            <li>
                <a href='.#'>
                    <i className="fab fa-facebook-f"></i>
                </a>
            </li>
            <li>
                <a href='.#'>
                    <i className="fab fa-instagram"></i>
                </a>
            </li>
            <li>
                <a href='tel:+972502458858'>
                    <i className="fas fa-phone"></i>
                </a>
            </li>
        </ul>

    )
}

export default Social;