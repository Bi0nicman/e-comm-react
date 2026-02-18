'use client';

import { Dropdown } from '../components/Dropdown/dropdown';
import styles from './SignUp.module.css';
import { createUsers } from '../lib/services/eStoreApi';
export default function Page() {

  const  signUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const user = {
      firstName: data.firstName as string,
      lastName: data.lastName as string,
      username: data.username as string,
      password: data.password as string,
      gender: data.gender as string,
      email: data.email as string,
    }
     await createUsers(user);
  }

  return (
    <div className='mt-10 flex flex-col items-center justify-center '>

      <h1 className='text-base/7 font-semibold text-white text-center mb-6'>Sign Up</h1>
      <div className="w-full max-w-md">
        <form onSubmit={signUp} className="space-y-4">
          <div>
            <label htmlFor="firstName" className="block text-white mb-1">First Name:</label>
            <input className={styles.input} type="text" id="firstName" name="firstName" required />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-white mb-1">Last Name:</label>
            <input className={styles.input} type="text" id="lastName" name="lastName" required />
          </div>
          <div>
            <label htmlFor="username" className="block text-white mb-1">Username:</label>
            <input className={styles.input} type="text" id="username" name="username" required />
          </div>
          <div>
            <label htmlFor="password" className="block text-white mb-1">Password:</label>
            <input className={styles.input} type="password" id="password" name="password" required />
          </div>
          <div>
            <label htmlFor="gender" className="block text-white mb-1">Gender:</label>
            <Dropdown 
              options={['M', 'F']}
              placeholder="Select gender"
              name="gender"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-white mb-1">e-mail:</label>
            <input className={styles.input} type="text" id="email" name="email" required />
          </div>
          <div>
            <button type="submit" className={styles.submitButton}>
              Sign Up
            </button>
          </div>
        </form>
      </div>

    </div>
  );
}