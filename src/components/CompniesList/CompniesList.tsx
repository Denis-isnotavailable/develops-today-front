'use client';
import { useState, useEffect } from 'react';
import cls from './CompniesList.module.css';
import { CompniesListItem } from './CompniesListItem/CompniesListItem';

interface ICountryList {
    status: string
    data: ICountry[]    
}

export interface ICountry {
    countryCode: string
    name: string   
}

const URL = process.env.NEXT_PUBLIC_BASE_COUNTRIES_URL;

export const CompniesList = () => {
    const [countries, setCountries] = useState<ICountryList>();

    useEffect(() => {
        const getCountries = async () => {
            const data = URL ? await fetch(`${URL}/countries`) : null;
            const countries: ICountryList = data ? await data.json() : null;

            if (countries) setCountries(countries);
        }

        getCountries();

    }, []);

    if (!countries) {
        return (
            <div>
                List is Empty
            </div>
        );
    }


    return (
        <ul className={cls.list}>
            {
                countries.data.map(({ countryCode, name }) =>
                    <CompniesListItem key={countryCode} countryCode={countryCode} name={name} />)
            }
        </ul>
    )
};
