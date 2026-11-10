
const AUTH_SESSION_KEY = "nandavaram-auth-session";

export function createAuthSession(user) {
  const session = {
    id: crypto.randomUUID(),
    name: user.name?.trim() || "",
    email: user.email?.trim().toLowerCase() || "",
    mobile: user.mobile?.trim() || "",
    authenticatedAt: new Date().toISOString(),
  };

  try {
    localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));
    window.dispatchEvent(new Event("nandavaram-auth-change"));
    return session;
  } catch {
    return null;
  }
}

export function getAuthSession() {
  try {
    const session = JSON.parse(
      localStorage.getItem(AUTH_SESSION_KEY) || "null"
    );

    if (
      !session ||
      typeof session.name !== "string" ||
      typeof session.email !== "string" ||
      typeof session.mobile !== "string"
    ) {
      return null;
    }

    return session;
  } catch {
    return null;
  }
}

export function clearAuthSession() {
  try {
    localStorage.removeItem(AUTH_SESSION_KEY);
  } finally {
    window.dispatchEvent(new Event("nandavaram-auth-change"));
  }
}

export function isAuthenticated() {
  return Boolean(getAuthSession());
}
