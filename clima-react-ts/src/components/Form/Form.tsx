import { ChangeEvent, FormEvent, useState } from 'react';

import { Alert } from '../Alert/Alert';
import { SearchType } from '../../types';
import { countries } from '../../data/countries';
import styles from './Form.module.css';

type FormProps = {
  fetchWeather: (search: SearchType) => Promise<void>;
};

export const Form = ({ fetchWeather }: FormProps) => {
  const [search, setSearch] = useState<SearchType>({
    city: '',
    country: '',
  });
  const [alert, setAlert] = useState('');

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (Object.values(search).includes('')) {
      setAlert('Todos los campos son obligatorios');
      return;
    }
    setAlert('');
    fetchWeather(search);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {alert && <Alert>{alert}</Alert>}
      <div className={styles.field}>
        <label htmlFor="city">Ciudad: </label>
        <input
          type="text"
          id="city"
          name="city"
          placeholder="Ciudad"
          value={search.city}
          onChange={handleChange}
        />
      </div>
      <div className={styles.field}>
        <label htmlFor="country">Pais: </label>
        <select
          name="country"
          id="country"
          value={search.country}
          onChange={handleChange}
        >
          <option value="">Seleccione un Pais</option>
          {countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      <input type="submit" value="Consultar clima" className={styles.submit} />
    </form>
  );
};
