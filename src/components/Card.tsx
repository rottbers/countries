import React from 'react';
import { Country } from '../App';

type Props = {
  emoji: string;
  text: string;
  label: string;
};

function CardListItem({ emoji, text, label }: Props) {
  return (
    <li>
      <span role="img" aria-label={`${label} emoji`} title={label}>
        {emoji}
      </span>{' '}
      {text?.split(',').join(', ') || '¯\\_(ツ)_/¯'}
    </li>
  );
}

function Card(country: Country) {
  const { name, emoji, phone, capital, currency, continent } = country;

  return (
    <div className="bg-white text-gray-900 p-4 my-2 border-2 rounded-md w-full md:max-w-xs md:mx-2">
      <h2 className="text-2xl font-bold">
        {name}{' '}
        <span role="img" aria-label={`${country} emoji`}>
          {emoji}
        </span>
      </h2>
      <ul>
        <CardListItem emoji="🗺️" label="continent" text={continent?.name} />
        <CardListItem emoji="🏙" label="capital" text={capital} />
        <CardListItem emoji="💰" label="currency" text={currency} />
        <CardListItem emoji="☎️" label="phone" text={phone} />
      </ul>
    </div>
  );
}

export default Card;
