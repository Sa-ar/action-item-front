import { useQuery } from 'react-query';
import axios from 'axios';

export const server = "http://localhost:3000";

export interface User {
  login: {
    uuid: string;
  };
  name: {
    title: string;
    first: string;
    last: string;
  };
  gender: string;
  location: {
    country: string;
    street: {
      number: number;
      name: string;
    },
    city: string;
    state: string;
  };
  email: string;
  phone: string;
  picture: {
    thumbnail: string;
  };
  dob: {
    date: string;
    age: number;
  }
}

export function useFetchUsers() {
  return useQuery('users', async () => {
    const { data } = await axios.get('https://randomuser.me/api/?results=10');
    return data.results as User[];
  });
}

export function useFetchSavedUsers() {
  return useQuery('savedUsers', async () => {
    const { data = [] } = await axios.get(`${server}/users`);
    return data.map((user: User & { _id: string }) => ({ ...user, login: { uuid: user._id } }));
  });
}
