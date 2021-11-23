import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

export const SidebarData = [
    {
        title: 'Home',
        path: './',
        icon: <AiIcons.AiFillHome />,
        className: 'nav-text'
    },
    {
        title: 'Add Location',
        path: '/createloc',
        icon: <FaIcons.FaLocationArrow />,
        className: 'nav-text'
    },
    {
        title: 'Register Car',
        path: '/regdriver',
        icon: <AiIcons.AiOutlineTeam />,
        className: 'nav-text'
    },
    {
        title: 'Create Ride',
        path: '/createride',
        icon: <AiIcons.AiFillCar />,
        className: 'nav-text'
    },
    {
        title: 'Request Ride',
        path: '/request',
        icon: <FaIcons.FaHandPaper />,
        className: 'nav-text'
    },
    {
        title: 'Accept Ride',
        path: '/accept',
        icon: <AiIcons.AiFillCarryOut />,
        className: 'nav-text'
    },
    {
        title: 'Pay Ride',
        path: '/pay',
        icon: <IoIcons.IoMdCash />,
        className: 'nav-text'
    },
    {
        title: 'Withdraw Payments',
        path: '/withdrawpay',
        icon: <IoIcons.IoMdCash />,
        className: 'nav-text'
    },
    {
        title: 'Show Ride',
        path: '/fetchride',
        icon: <FaIcons.FaFilter />,
        className: 'nav-text'
    },  
    {
        title: 'D-Ride Balance',
        path: '/getcontbalance',
        icon: <FaIcons.FaUniversity />,
        className: 'nav-text'
    }    
]