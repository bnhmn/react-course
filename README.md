# React - The Complete Guide 2024 Course Resources

This repository is forked from <https://github.com/academind/react-complete-guide-course-resources> and provides code files, slides, and other resources of the [Udemy React course](https://www.udemy.com/course/react-the-complete-guide-incl-redux/).

React is a JavaScript library for building web and native user interfaces.

It uses a declarative programming style: You define the target UI state, but not the steps to get there. Instead, React will figure out how to achieve the target state.

React doesn't produce static HTML code. Instead, it uses JavaScript to manipulate the DOM and dynamically generate the target HTML at runtime on the client side.

When something on the page changes, React only updates that specific part using something called a Virtual DOM, instead of reloading the whole page.

## Repository Content

- **Code Snapshots:** All code snapshots (starting snapshots, intermediate snapshots, finished snapshots) for the various course sections can be found in the [/code](/code/) folder.
- **Lecture Attachments:** Any standalone code files or other attachments that are mentioned in course lectures (and attached to those lectures) are stored in the [/attachments](/attachments/) folder.
- **Other Resources:** Other resources (like the course slides) can be found in the [/other](/other/) folder.

The **Code Snapshots** and **Lecture Attachments** folders contain one subfolder per course section - this allows you to easily access the resources for a specific course section.

## How To Use Code Snapshots

If you want to run the code snapshots on your machine, you'll need to run `npm install` in the individual snapshot folders, followed by `npm run dev` to start the development server - just as shown in the course.
