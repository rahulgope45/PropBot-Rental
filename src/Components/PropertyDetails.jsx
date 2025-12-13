import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../context/authContext';
import { PROPERTY_URL } from '../Services/consfig';
import axios from 'axios';
import toast from 'react-hot-toast';

function PropertyDetails() {

    const id = useParams();
    const navigate = useNavigate();
    const { userLoogedIn } = useAuth();

    const [property, setProperty] = useState(null)
    const [loading, setloading] = useState(true)
    const [selectImage, setSelectImage] = useState(0);
    const [showContentModal, setshowContentModal] = useState(false);

    useEffect(() => {
        fetchProperty();
    }, [id])

    const fetchProperty = async () => {
        setloading(true);
        try {
            const responce = await axios.get(`${PROPERTY_URL}/${id}`);
            setProperty(responce.data.property);

        } catch (error) {
            console.log('Error fetching property', error);
            toast.error('Failed to load Property', error);
            navigate('/buy');
        } finally {
            setloading(false)
        }
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(price);
    };

    const handleContactOwner = () => {
        if(!userLoogedIn){
            toast.error("Please login to conrtact owner");
            console.log("user not logged in");
            navigate("/login")
            return;
        }
        setshowContentModal(true);
    }


   //Loading State
    if(loading){
        return(
            <div className='flex justify-center items-center min-h-screen'>
                <div className='text-center'>
                    <i className='bi bi-hourglass-split text-4xl text-blue-900 animate-spin mb-4 '></i>
                    <p className='text-gray-600'>
                        Loading properties details....
                    </p>
                </div>

            </div>
        )
    }

    //no property state 
    if(!property){
        <div>
            <div>
                <i className='bi bi-exclamation-triangle text-6xl text-red-600 mb-4'></i>
                <p>
                    Property Not Found
                </p>
            </div>
        </div>
    }
}

export default PropertyDetails