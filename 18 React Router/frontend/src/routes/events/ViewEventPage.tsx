import { useParams } from 'react-router';

export function ViewEventPage({}) {
  const { id } = useParams();
  return (
    <>
      <h1>Event Details</h1>
      <p>{id}</p>
    </>
  );
}
