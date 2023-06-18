import React from 'react';
import PricingOption from '../PricingOption/PricingOption';

const Pricing = () => {
    const pricingOptions = [
        {id: 1, name: 'Basic', price: '$0.00', features: [
            'Free Users',
            'Simple limit experience',
            'You have tell this basic',
            'You must not valid user in',
            'Not this long tram use basic',
            'You have must premium this basic',
            'And this is you best option in Platina'
        ]},
        {id: 2, name: 'Premium', price: '$9.99', features: [
            'Best Premium Plan',
            'Simple limit experience',
            'You have tell this basic',
            'You must not valid user in',
            'Not this long tram use basic',
            'You have must premium this basic',
            'And this is you best option in Platina'
        ]},
        {id: 3, name: 'Platina', price: '$19.99', features: [
            'Best Platina Plan',
            'Simple limit experience',
            'You have tell this basic',
            'You must not valid user in',
            'Not this long tram use basic',
            'You have must premium this basic',
            'And this is you best option in Platina'
        ]}
    ]
    return (
        <div className=''>
            <h1 className='text-5xl bg-indigo-700 font-bold p-10 rounded-lg text-white'>SELECT YOUR BEST PLAN</h1>
            <div className='grid md:grid-cols-3 gap-3 pt-5'>
                {
                    pricingOptions.map(option => <PricingOption
                    key={option.id}
                    option={option}
                    ></PricingOption>)
                }
            </div>
        </div>
        
    );
};

export default Pricing;