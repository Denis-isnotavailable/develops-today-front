import Link from "next/link";
import { ICountry } from "../CompniesList";
import cls from './CompniesListItem.module.css';


export const CompniesListItem = ({ countryCode, name }: ICountry) => {    

    return (
        <li className={cls.list_item}>
            <Link href={`/country/${countryCode}`}>
                <p>{countryCode}</p>
                <p>{ name }</p>
            </Link>            
        </li>
    )
};
