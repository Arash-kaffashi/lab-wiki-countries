import React from 'react';
import { Link } from 'react-router-dom';
import { RootObject } from '../interfaces';

export default function CountriesList({
  countries,
}: {
  countries: RootObject[];
}) {
  return (
    <div className="col-5" style={{ maxHeight: '90vh', overflow: 'scroll' }}>
      <div className="list-group">
        {countries.map(({ name, alpha2Code, alpha3Code }) => (
          <Link
            to={`/${alpha3Code}`}
            key={alpha3Code}
            className="list-group-item list-group-item-action text-center"
          >
            <>
              <img
                src={`https://flagpedia.net/data/flags/icon/72x54/${alpha2Code.toLowerCase()}.png`}
                alt="flag"
              />
              <p>{name.common}</p>
            </>
          </Link>
        ))}
      </div>
    </div>
  );
}

/*
{countries.map((country) => (
        <div
          className="col-5"
          style={{ maxHeight: '90vh', overflow: 'scroll' }}
        >
          <div className="list-group">
            <CountriesList
              country={{
                alpha3Code: country.alpha3Code,
                name: country.name.official,
              }}
            />
          </div>
        </div>
      ))}

*/
