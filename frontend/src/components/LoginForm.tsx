import { useForm } from 'react-hook-form';
import { useLoginUserMutation } from '../api/baseApi';
import type { AuthFormValues } from '../api/baseApi';

export function LoginForm() {
  const { register, handleSubmit } = useForm<AuthFormValues>();
  const [loginUser, { isLoading }] = useLoginUserMutation();

  async function onSubmit(data: AuthFormValues) {
    const result = await loginUser(data);
    if (result.data) {
      alert('Авторизація успішна');
    } else {
      alert('Не вдалося авторизуватися');
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>Авторизація</h3>
      <div><label htmlFor="login-email">Email</label></div>
      <input id="login-email" type="email" required {...register('email')} />
      <div><label htmlFor="login-password">Пароль</label></div>
      <input id="login-password" type="password" minLength={8} required {...register('password')} />
      <button type="submit" disabled={isLoading}>Увійти</button>
    </form>
  );
}
