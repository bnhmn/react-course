import { useEffect, useState } from 'react';

import { ChevronRightIcon } from '@chakra-ui/icons';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { Link, ParsedLocation, useLocation, useRouterState } from '@tanstack/react-router';

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
  const [breadcrumbs, setBreadcrumbs] = useState<{ name: string; path: string }[]>(extractBreadcrumbs(location));

  useEffect(() => {
    // Update the breadcrumbs only after the router has finished loading. Otherwise, if both the new and old pages
    // contain the Breadcrumb component, the new breadcrumbs may be displayed too early.
    if (!isLoading) {
      const newBreadcrumbs = extractBreadcrumbs(location);
      setBreadcrumbs(newBreadcrumbs);
    }
  }, [isLoading, location]);

  return breadcrumbs;
}

function extractBreadcrumbs(location: ParsedLocation) {
  const prevLocations = location.pathname.split('/').filter((segment) => segment?.length > 0);
  const breadCrumbs = prevLocations.reduce(
    (result, route) => {
      const prevPath = result[result.length - 1]?.path ?? '';
      result.push({ name: route, path: `${prevPath}/${route}` });
      return result;
    },
    [] as { name: string; path: string }[],
  );
  return breadCrumbs;
}
