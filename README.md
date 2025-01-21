# React Course Resources

This repository contains my personal code files of the [Udemy React course](https://www.udemy.com/course/react-the-complete-guide-incl-redux/).

[React](https://react.dev) is a JavaScript library for building web and native user interfaces.

It uses a declarative programming style: You define the target UI state, but not the steps to get there.
Instead, React will figure out how to achieve the target state.

React doesn't produce static HTML code. Instead, it uses JavaScript to manipulate the DOM and dynamically
generate the target HTML at runtime on the client side.

When something on the page changes, React only updates that specific part using something called a Virtual DOM,
instead of reloading the whole page.

See also: <https://react.dev/learn/your-first-component>.

## How To Use

You need to have [Node.js](https://nodejs.org/en/download) on your machine.

If you want to run the code snapshots, switch to one of the code snapshot folders and execute these commands
in your terminal:

- Run `npm ci` to download the dependencies.
- Run `npm run dev` to start the development server.
