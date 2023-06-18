import React from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/solid'

const Feature = ({feature}) => {
    return (
        <div className='flex pt-3'>
            <CheckCircleIcon className="h-6 w-6 text-green-600" />
            <p>{feature}</p>
        </div>
    );
};

export default Feature;