import React, { useState, useEffect } from 'react';
import { useParams, redirect, Link } from 'react-router-dom';
import { RootObject } from '../interfaces';

export default function CountryDetails({
  countries,
}: {
  countries: RootObject[];
}) {
  const { alpha3Code } = useParams();
  let [country, setCountry] = useState<RootObject | null>(null);

  useEffect(() => {
    (async () => {
      let res = await fetch(
        `https://ih-countries-api.herokuapp.com/countries/${alpha3Code}`
      );

      if (res.status !== 200) {
        redirect('/error');
        return null;
      }

      let data = (await res.json()) as RootObject;
      setCountry(data);
    })();
  }, [alpha3Code]);

  if (!country) return <h1>Loading ...</h1>;
  return (
    <div className="col-7 text-center" key={`${country.alpha3Code}`}>
      <img
        src={`https://flagpedia.net/data/flags/w580/${country.alpha2Code.toLowerCase()}.png`}
        alt="flag"
        style={{ width: '360px' }}
      />
      <h1>{country.name.common}</h1>

      <table className="table">
        <tbody>
          <tr>
            <td style={{ width: '30%' }}>Capital</td>
            <td>{country.capital.join(',')}</td>
          </tr>
          <tr>
            <td>Area</td>
            <td>{country.area} km</td>
          </tr>
          <tr>
            <td>Borders</td>
            <td>
              <ul className="list-unstyled">
                {country.borders.map((border) => (
                  <li key={border}>
                    <Link to={`/${border}`}>
                      {
                        countries.find(
                          ({ alpha3Code }) => alpha3Code === border
                        )?.name.common
                      }
                    </Link>
                  </li>
                ))}
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
