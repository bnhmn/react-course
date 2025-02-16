// By default, all components in the 'app' folder are server components, so they are executed on the backend.
//
// On first page load, the server renders the full page and returns the rendered HTML to the client.
// Therafter, when the user navigates to other pages, the frontend dynamically loads the new content from the backend
// using fetch, and updates the UI using React's Virtual DOM, making navigation instant and smooth (like an SPA).
//
// The server components:
// - Improve the initial load time and performance by reducing JavaScript sent to the browser.
// - Improve the SEO ranking because search engines can access the rendered page content.
// - Can directly interact with databases, APIs, and server-side logic.
// - Cannot use state (useState), effects (useEffect), hooks, or event listeners.

import Link from 'next/link';

// This is the home page, its served from the root route /
// You can add more routes by adding sub directories like 'about'.

export default function Home() {
  return (
    <main>
      <img src="/logo.png" alt="A server surrounded by magic sparkles." />
      <h1>Welcome to this NextJS Course!</h1>
      <p>Let's get started! 🔥</p>
      <p>
        <Link href="/about">About Us</Link>
      </p>
    </main>
  );
}
