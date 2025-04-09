import React, { useEffect, useState } from 'react';
import axios from "axios";
import SidebarMenu from './SidebarMenu';

export default function Side_bar() {

    return (

        <>
            <div className='d-flex justify-content-center'>
                <Logo />
            </div>
            <hr className='mt-3 border-light' />
            <div className='p-2'>
                <SidebarMenu/>
            </div>
        </>
    );
}

function Logo() {

    const [logo, setLogo] = useState(null);
    // const [loading,setLoading]=useState(false);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/get-logo/")
            .then(response => {
                setLogo(`${response.data.logo_path}`);
                // setLoading(true);
            })
            .catch(error => {
                console.error("Error fetching logo:", error);
            });
    }, []);

    return (
        <>
            {logo &&
                <img src={logo} alt="logo-image" className="logo_image img-fluid pt-2 ps-2" />
            }
        </>
    );
}
