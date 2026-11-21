import { useForm } from 'react-hook-form';
import { useRegisterUserMutation } from '../api/baseApi';
import type { AuthFormValues } from '../api/baseApi';

export function RegisterForm() {
  const { register, handleSubmit } = useForm<AuthFormValues>();
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  async function onSubmit(data: AuthFormValues) {
    const result = await registerUser(data);
    if (result.data) {
      alert('Реєстрація успішна');
    } else {
      alert('Не вдалося зареєструватися');
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input id="register-email" type="email" placeholder="email" aria-label="Email для реєстрації" required {...register('email')} />
      <input id="register-password" type="password" placeholder="password" aria-label="Пароль для реєстрації" minLength={8} required {...register('password')} />
      <button type="submit" disabled={isLoading}>Зареєструватися</button>
    </form>
  );
}
