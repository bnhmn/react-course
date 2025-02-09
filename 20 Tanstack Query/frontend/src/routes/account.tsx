import { createFileRoute } from '@tanstack/react-router';

import { LoadingSpinner } from '../components/navigation/LoadingSpinner';

export const Route = createFileRoute('/account')({
  pendingComponent: () => <LoadingSpinner />,
});
