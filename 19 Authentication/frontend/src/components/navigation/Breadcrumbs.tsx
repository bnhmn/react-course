import { NavLink } from 'react-router';
import useBreadcrumbs from 'use-react-router-breadcrumbs';

import { ChevronRightIcon } from '@chakra-ui/icons';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';

export function Breadcrumbs() {
  // https://www.npmjs.com/package/use-react-router-breadcrumbs
  const breadcrumbs = useBreadcrumbs().filter((bc) => bc.key !== '/');

  return (
    // https://v2.chakra-ui.com/docs/components/breadcrumb
    <Breadcrumb spacing="8px" separator={<ChevronRightIcon color="gray.500" />} mb="6">
      {breadcrumbs.map((breadcrumb) => (
        <BreadcrumbItem key={breadcrumb.key}>
          <BreadcrumbLink as={NavLink} to={breadcrumb.key} _hover={{ textDecoration: 'underline' }}>
            {breadcrumb.breadcrumb}
          </BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
}
