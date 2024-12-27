import { Fragment } from 'react';
import reactImage from './assets/react-core-concepts.png';
import { CORE_CONCEPTS } from './data';

export default function App() {
  return (
    // Each React component must return *one* JSX element.
    // When you want to return multiple elements, you either need to wrap them in a <div> or a <Fragment> element.
    //
    // <div>
    //   <Header />
    //   <Main />
    // </div>
    //
    //
    // A <Fragment> is a virtual container for elements that is stripped from the target HTML, allowing you to
    // avoid unnecessary <div> elements.
    //
    <Fragment>
      <Header />
      <Main />
    </Fragment>
    //
    // In modern React, you can also use <> instead of <Fragment>, allowing you to omit the import.
    //
    // <>
    //   <Header />
    //   <Main />
    // </>
  );
}

function Header() {
  return (
    <header>
      <img src={reactImage} alt="Stylized atom" />
      <h1>React Essentials</h1>
      <p>React concepts you will need for almost any app you are going to build!</p>
    </header>
  );
}

function Main() {
  return (
    <main>
      <div id="core-concepts">
        <h2>Core Concepts</h2>
        <ul>
          {CORE_CONCEPTS.map((concept) => (
            <li>
              <img src={concept.image} alt={concept.title} />
              <h3>{concept.title}</h3>
              <p>{concept.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
