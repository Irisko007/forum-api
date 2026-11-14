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
      <h2>Авторизація</h2>
      <input id="login-email" type="email" placeholder="email" aria-label="Email для авторизації" required {...register('email')} />
      <input id="login-password" type="password" placeholder="password" aria-label="Пароль для авторизації" minLength={8} required {...register('password')} />
      <button type="submit" disabled={isLoading}>Увійти</button>
    </form>
  );
}
