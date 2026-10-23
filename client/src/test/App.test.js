import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";

// api.js imports the hoisted ESM copy of axios, which jest cannot parse.
// The suite never issues requests, so a minimal stand-in is enough. __instance
// exposes the shared instance api.js captured, because CRA's resetMocks wipes
// mock implementations (and create()'s return) between tests.
jest.mock("axios", () => {
  const instance = { post: jest.fn(), get: jest.fn() };
  return {
    __esModule: true,
    default: { create: jest.fn(() => instance) },
    __instance: instance,
  };
});

// The suite asserts what a real visitor gets: the rendered forms, the wiring
// between labels and inputs, the theme contract on <html>, the /home guard,
// and the login -> /home transition (network mocked; no requests escape).

beforeEach(() => {
  window.history.pushState({}, "", "/");
  sessionStorage.clear();
});

test("login screen renders with a link to sign up", async () => {
  render(<App />);

  expect(await screen.findByText("Login")).toBeInTheDocument();
  expect(
    screen.getByText("Enter your email and password to sign in")
  ).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "SIGN IN" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Sign up" })).toHaveAttribute(
    "href",
    "/register"
  );
  expect(screen.getByLabelText("Email")).toBeInTheDocument();
  expect(screen.getByLabelText("Password")).toBeInTheDocument();
});

test("sign-up screen associates every label with its field", async () => {
  window.history.pushState({}, "", "/register");
  render(<App />);

  expect(await screen.findByText("Sign up")).toBeInTheDocument();
  expect(screen.getByLabelText("Name")).toBeInTheDocument();
  expect(screen.getByLabelText("Email")).toBeInTheDocument();
  expect(screen.getByLabelText("Password")).toBeInTheDocument();
  expect(screen.getByLabelText("Confirm Password")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "SIGN UP" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Sign in" })).toHaveAttribute(
    "href",
    "/"
  );
});

test("theme initializes to light when nothing is stored", async () => {
  localStorage.removeItem("theme");
  render(<App />);

  await screen.findByText("Login");
  expect(document.documentElement.className).toBe("light");
});

test("a stored dark theme applies on the login screen", async () => {
  localStorage.setItem("theme", "dark");
  render(<App />);

  await screen.findByText("Login");
  expect(document.documentElement.className).toBe("dark");
});

test("an unauthenticated visit to /home is redirected to the login screen", async () => {
  window.history.pushState({}, "", "/home");
  render(<App />);

  expect(await screen.findByText("Login")).toBeInTheDocument();
  expect(window.location.pathname).toBe("/");
});

test("a successful login stores the session and opens /home", async () => {
  render(<App />);
  await screen.findByText("Login");

  // The instance api.js captured, reached directly past the resetMocks wipe.
  const instance = require("axios").__instance;
  instance.post.mockResolvedValueOnce({
    status: 200,
    data: { userCred: { _id: "u1", name: "Ada", email: "ada@example.com" } },
  });

  fireEvent.change(screen.getByLabelText("Email"), {
    target: { value: "ada@example.com" },
  });
  fireEvent.change(screen.getByLabelText("Password"), {
    target: { value: "secret" },
  });
  fireEvent.submit(screen.getByRole("form", { name: "Sign in" }));

  // Generous timeout: the first require of the lazy Home chunk makes jest
  // transform its whole graph (socket.io-client, simple-peer, moment).
  expect(
    await screen.findByText("Start a chat", {}, { timeout: 10000 })
  ).toBeInTheDocument();
  expect(window.location.pathname).toBe("/home");
  expect(sessionStorage.getItem("_id")).toBe("u1");
}, 15000);
