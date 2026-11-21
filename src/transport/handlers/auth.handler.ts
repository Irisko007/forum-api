import type { CookieOptions, RequestHandler, Response } from "express";
import type { PublicUser } from "../../domain/user/entity.js";
import type { ErrorDto } from "../../dto/error.dto.js";
import type { AuthService, AuthTokens } from "../../services/auth.types.js";

const cookieOptions: CookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  path: "/",
};

function setAuthCookies(res: Response, tokens: AuthTokens) {
  res.cookie("accessToken", tokens.accessToken, { ...cookieOptions, maxAge: 60 * 60 * 1000 });
  res.cookie("refreshToken", tokens.refreshToken, { ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000 });
}

function readRefreshToken(cookie: string | undefined): string {
  return cookie?.match(/(?:^|;\s*)refreshToken=([^;]*)/)?.[1] ?? "";
}

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

    const { user, ...tokens } = await authService.login(input);
    setAuthCookies(res, tokens);
    res.status(200).json(user);
  };

  const refresh: RequestHandler = async (req, res) => {
    const tokens = await authService.refresh(readRefreshToken(req.headers.cookie));
    setAuthCookies(res, tokens);
    res.sendStatus(204);
  };

  const logout: RequestHandler = async (req, res) => {
    await authService.logout(readRefreshToken(req.headers.cookie));
    res.clearCookie("accessToken", cookieOptions);
    res.clearCookie("refreshToken", cookieOptions);
    res.sendStatus(204);
  };

  return { register, login, refresh, logout };
}
