// If we want to forward properties to other JSX elements, we can either explicitly redeclare them
// like the 'id' prop here and forward them to another JSX element like a <section>:
//
export function Section2({ title, children, id }) {
  return (
    <section id={id}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}
//
// Or we can catch all additional props specified by the caller via the ...props field (rest parameter)
// and forward them to the other JSX element.
//
export function Section({ title, children, ...props }) {
  return (
    <section {...props}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}
