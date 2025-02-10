import { useEffect, useState } from 'react';

import { ChevronRightIcon } from '@chakra-ui/icons';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { Link, useLocation, useRouterState } from '@tanstack/react-router';

export function Breadcrumbs() {
  const breadcrumbs = useBreadcrumbs();

  return (
    // https://v2.chakra-ui.com/docs/components/breadcrumb
    <Breadcrumb spacing="8px" separator={<ChevronRightIcon color="gray.500" />} mb="6">
      {breadcrumbs.map((breadcrumb) => (
        <BreadcrumbItem key={breadcrumb.path}>
          <BreadcrumbLink
            as={Link}
            to={breadcrumb.path}
            textTransform="capitalize"
            _hover={{ textDecoration: 'underline' }}
          >
            {breadcrumb.name}
          </BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
}

function useBreadcrumbs() {
  const location = useLocation();
  const { isLoading } = useRouterState();
  const [breadcrumbs, setBreadCrumbs] = useState<{ name: string; path: string }[]>([]);

  useEffect(() => {
    // Only update the breadcrumbs when TanStack router has finished loading
    if (!isLoading) {
      const prevLocations = location.pathname.split('/').filter((segment) => segment?.length > 0);
      const newBreadCrumbs = prevLocations.reduce(
        (result, route) => {
          const prevPath = result[result.length - 1]?.path ?? '';
          result.push({ name: route, path: `${prevPath}/${route}` });
          return result;
        },
        [] as { name: string; path: string }[],
      );
      setBreadCrumbs(newBreadCrumbs);
    }
  }, [location, isLoading]);

  return breadcrumbs;
}
