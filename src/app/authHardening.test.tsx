import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { AppShell } from "./AppShell";
import { AppProviders, useAuth, type OpenEdRole } from "./providers";
import { RoleRoute } from "./router";

function RoleProbe() {
  const { role, signUp } = useAuth();
  return (
    <>
      <output aria-label="role">{role}</output>
      <button type="button" onClick={() => void signUp("new@example.com", "password123", "New Learner")}>
        Sign up
      </button>
    </>
  );
}

function seedProfile(role: OpenEdRole) {
  localStorage.setItem(
    "opened.mockProfile",
    JSON.stringify({
      id: "local-dev-user",
      email: `${role}@example.com`,
      full_name: role,
      role,
    }),
  );
}

describe("auth hardening", () => {
  it("public signup creates learner only", async () => {
    render(
      <AppProviders>
        <RoleProbe />
      </AppProviders>,
    );

    await userEvent.click(screen.getByRole("button", { name: "Sign up" }));

    await waitFor(() => expect(screen.getByLabelText("role")).toHaveTextContent("learner"));
    expect(JSON.parse(localStorage.getItem("opened.mockProfile") ?? "{}")).toMatchObject({ role: "learner" });
  });

  it("hides the role switcher when the explicit dev flag is absent", async () => {
    seedProfile("learner");

    render(
      <MemoryRouter>
        <AppProviders>
          <AppShell />
        </AppProviders>
      </MemoryRouter>,
    );

    await waitFor(() => expect(screen.queryByLabelText("Preview role")).not.toBeInTheDocument());
  });

  it("blocks learners from educator routes", async () => {
    seedProfile("learner");

    render(
      <MemoryRouter initialEntries={["/educator"]}>
        <AppProviders>
          <Routes>
            <Route element={<RoleRoute allowed={["educator", "opened_team"]} />}>
              <Route path="/educator" element={<div>Educator Studio</div>} />
            </Route>
            <Route path="/learn" element={<div>Learner Dashboard</div>} />
          </Routes>
        </AppProviders>
      </MemoryRouter>,
    );

    await waitFor(() => expect(screen.getByText("Learner Dashboard")).toBeInTheDocument());
    expect(screen.queryByText("Educator Studio")).not.toBeInTheDocument();
  });

  it("blocks educators from team routes", async () => {
    seedProfile("educator");

    render(
      <MemoryRouter initialEntries={["/team"]}>
        <AppProviders>
          <Routes>
            <Route element={<RoleRoute allowed={["opened_team"]} />}>
              <Route path="/team" element={<div>Team Console</div>} />
            </Route>
            <Route path="/learn" element={<div>Learner Dashboard</div>} />
          </Routes>
        </AppProviders>
      </MemoryRouter>,
    );

    await waitFor(() => expect(screen.getByText("Learner Dashboard")).toBeInTheDocument());
    expect(screen.queryByText("Team Console")).not.toBeInTheDocument();
  });
});
