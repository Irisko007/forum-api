import type { RequestHandler } from "express";
import type { PublicUser } from "../../domain/user/entity.js";
import type { ErrorDto } from "../../dto/error.dto.js";
import type { AuthService } from "../../services/auth.types.js";

interface CredentialsBody {
  email: string;
  password: string;
}

function credentials(body: unknown): CredentialsBody | undefined {
  if (!body || typeof body !== "object" || Array.isArray(body)) return undefined;
  const fields = Object.keys(body);
  if (fields.some((field) => !["email", "password"].includes(field))) return undefined;

  const { email, password } = body as Partial<CredentialsBody>;
  if (typeof email !== "string" || typeof password !== "string") return undefined;
  const normalizedEmail = email.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail) || password.length < 8) return undefined;
  return { email: normalizedEmail, password };
}

export function createAuthHandlers(authService: AuthService) {
  const register: RequestHandler<{}, PublicUser | ErrorDto, unknown> = async (req, res) => {
    const input = credentials(req.body);
    if (!input) {
      res.status(422).json({ message: "Потрібні коректний email і пароль від 8 символів" });
      return;
    }

    const user = await authService.register(input);
    res.status(201).json(user);
  };

  const login: RequestHandler<{}, PublicUser | ErrorDto, unknown> = async (req, res) => {
    const input = credentials(req.body);
    if (!input) {
      res.status(422).json({ message: "Потрібні коректний email і пароль від 8 символів" });
      return;
    }

    const { user, accessToken } = await authService.login(input);
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 1000,
      path: "/",
    });
    res.status(200).json(user);
  };

  return { register, login };
}
