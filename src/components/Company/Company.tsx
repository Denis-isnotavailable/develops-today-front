'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image'
import cls from './Company.module.css';
import { CompniesListItem } from '../CompniesList/CompniesListItem/CompniesListItem';
import { ChartComponent } from './Chart/Chart';

const URL = process.env.NEXT_PUBLIC_BASE_COUNTRIES_URL;

interface IBordersInfo {    
    borders: IBordersCountry[]
    commonName: string
    countryCode: string
    officialName: string
    region: string    
}

interface IBordersCountry {
    commonName: string
    officialName: string
    countryCode: string
    region: string
    borders: null
}

export const Company = ({ countryCode }: { countryCode: string }) => {
    const [countriesBordered, setCountriesBordered] = useState<IBordersInfo>();
    const [flagImage, setFlagImage] = useState();
    const [population, setPopulation] = useState();

    useEffect(() => {
        const getCountries = async () => {
            const data = await fetch(`${URL}/countries/bordered/${countryCode}`);
            const countries = await data.json();

            if (countries) setCountriesBordered(countries.data);
        }

        getCountries();

    }, [countryCode]);

    useEffect(() => {
        const getFlag = async () => {
            const data = await fetch(`${URL}/countries/flag/${countriesBordered?.commonName}`);
            const flag = await data.json();

            if (flag) setFlagImage(flag.data.flag);
        }

        if (countriesBordered?.commonName) getFlag();

    }, [countriesBordered?.commonName]);

    useEffect(() => {
        const getPopulation = async () => {
            const data = await fetch(`${URL}/countries/population/${countriesBordered?.commonName}`);
            const populationData = await data.json();

            if (populationData) setPopulation(populationData.data.populationCounts);
        }

        if (countriesBordered?.commonName) getPopulation();

    }, [countriesBordered?.commonName]);
   

    return (
        <div className={cls.main_box}>
            <div className={cls.heading_box}>
                <h2>Country Name: {countriesBordered?.commonName}</h2>
                {flagImage && <Image
                    src={flagImage}
                    width={80}
                    height={50}
                    alt="Flag Image"
                />}
            </div>

            <ul className={cls.list}>
                {
                    countriesBordered?.borders.map(({commonName, countryCode}) =>
                        <CompniesListItem key={countryCode} countryCode={countryCode} name={commonName} />)
                }
            </ul>

            {population && <ChartComponent population={population} />}
            
        </div>
    )
};
