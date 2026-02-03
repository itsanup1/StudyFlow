export function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}

export function loadTheme() {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme) {
    setTheme(savedTheme);
    return;
  }

  const systemDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  setTheme(systemDark ? "dark" : "light");
}

export function toggleTheme() {
  const current =
    document.documentElement.getAttribute("data-theme") || "light";

  const newTheme = current === "dark" ? "light" : "dark";

  setTheme(newTheme);
}

export function ThemeToggleButton() {
  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 rounded-md border text-[rgb(var(--pritext))]"
    >
      Toggle Theme
    </button>
  );
}