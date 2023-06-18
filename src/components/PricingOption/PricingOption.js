import React from 'react';
import Feature from '../Feature/Feature';

const PricingOption = ({ option }) => {
    const { features } = option;
    return (
        <div className='bg-indigo-200 p-4 rounded-lg'>
            <div>
                <h2 className='text-2xl font-bold pb-3'>{option.name}</h2>
                <p>
                    <span className='text-4xl font-bold'>{option.price}</span>
                    <span>/mon</span>
                </p>
            </div>
            <div>
                {
                    features.map((feature, id) => <Feature
                        key={id.inx}
                        feature={feature}
                    ></Feature>)
                }
            </div>
            <div className='pt-3'>
                <button className='bg-purple-700 w-full py-2 font-bold text-white rounded-lg text-2xl'>
                    Buy Plan
                </button>
            </div>
        </div>
    );
};

export default PricingOption;