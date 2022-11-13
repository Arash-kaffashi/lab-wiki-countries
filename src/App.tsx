import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import CountriesList from './components/CountriesList';
import CountryDetails from './components/CountryDetails';
import Navbar from './components/Navbar';
import { RootObject } from './interfaces';

function App() {
  let [countries, setCountries] = useState([] as RootObject[]);

  useEffect(() => {
    (async () => {
      let response = await fetch(
        'https://ih-countries-api.herokuapp.com/countries'
      );
      let data = (await response.json()) as RootObject[];
      data.sort((a, b) => a.name.common.localeCompare(b.name.common));
      console.log('oi');
      setCountries(data);
    })();
  }, []);

  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <div className="row">
          {countries.length ? (
            <>
              <CountriesList countries={countries} />
              <Routes>
                <Route path="/" element={<></>} />
                <Route
                  path="/:alpha3Code"
                  element={<CountryDetails countries={countries} />}
                />
                <Route path="*" element={<h1>Error 404</h1>} />
              </Routes>
            </>
          ) : (
            <h1>Loading data</h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
