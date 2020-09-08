import React, { useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { filterCountries } from './utils';
import useDebounce from './hooks/useDebounce';
import Card from './components/Card';

const ALL_COUNTRIES = gql`
  {
    countries {
      name
      native
      phone
      continent {
        name
      }
      capital
      currency
      languages {
        name
      }
      emoji
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(ALL_COUNTRIES);
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState('');

  const allCountries = data?.countries;

  useEffect(() => {
    if (allCountries) setCountries(allCountries);
  }, [allCountries]);

  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (!allCountries) return;
    const searchKeys = ['name', 'native', 'capital', 'phone', 'currency'];
    const filteredCountries = filterCountries(
      allCountries,
      searchKeys,
      debouncedQuery
    );
    setCountries(filteredCountries);
  }, [debouncedQuery, allCountries]);

  const numberOfDisplayedCountires = countries.length;
  const noResults = query !== '' && numberOfDisplayedCountires === 0;

  return (
    <>
      <div className="container mx-auto p-4 min-h-screen">
        <header className="w-full my-4 flex flex-col items-center">
          <h1 className="text-4xl font-bold">
            {numberOfDisplayedCountires}{' '}
            {numberOfDisplayedCountires === 1 ? 'country' : 'countries'} 🌎
          </h1>
          <input
            className="w-full md:max-w-xl border-2 rounded-md m-2 p-2 text-gray-900"
            type="search"
            placeholder="search country, capital, currency, phone, language etc."
            onChange={(e) => setQuery(e.target.value)}
            disabled={loading || (error && !!error)}
          />
        </header>
        <div className="flex flex-wrap justify-center">
          {countries.map((country: Country) => (
            <Card key={country.emoji} {...country} />
          ))}
          <p>
            {error && 'something went wrong fetching the world 😞'}
            {loading && 'loading... '}
            {noResults && `no results found for "${debouncedQuery}"`}
          </p>
        </div>
      </div>
    </>
  );
}

export default App;

type Continent = {
  code: string; // ID
  name: string;
  countries: Country;
};

type Language = {
  code: string; // ID
  name: string;
  native: string;
  rtl: boolean;
};

type State = {
  code: string;
  name: string;
  country: Country;
};

export type Country = {
  code: string; // ID
  name: string;
  native: string;
  phone: string;
  continent: Continent;
  capital: string;
  currency: string;
  languages: Language;
  emoji: string;
  emojiU: string;
  states: State;
};
