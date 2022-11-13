import React from 'react';
import { useParams, redirect, Link } from 'react-router-dom';
import { Countries } from '../interfaces';

export default function CountryDetails({
  countries,
}: {
  countries: Countries;
}) {
  const { alpha3Code: alpha } = useParams();
  if (alpha === undefined) {
    redirect('/error');
    return null;
  }

  const country = countries.find(({ alpha3Code }) => alpha3Code === alpha);

  if (country === undefined) {
    redirect('/error');
    return null;
  }

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
