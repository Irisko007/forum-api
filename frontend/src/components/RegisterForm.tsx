import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useRegisterUserMutation } from '../api/baseApi';
import type { AuthFormValues } from '../api/baseApi';

export function RegisterForm() {
  const { register, handleSubmit } = useForm<AuthFormValues>();
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const [message, setMessage] = useState('');

  async function onSubmit(data: AuthFormValues) {
    const result = await registerUser(data);
    if (result.data) {
      setMessage('Реєстрація успішна');
      alert('Реєстрація успішна');
    } else {
      setMessage('Не вдалося зареєструватися');
      alert('Не вдалося зареєструватися');
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>Реєстрація</h3>
      <div><label htmlFor="register-email">Email</label></div>
      <input id="register-email" type="email" required {...register('email')} />
      <div><label htmlFor="register-password">Пароль</label></div>
      <input id="register-password" type="password" minLength={8} required {...register('password')} />
      <button type="submit" disabled={isLoading}>Зареєструватися</button>
      {message && <p role="status">{message}</p>}
    </form>
  );
}
