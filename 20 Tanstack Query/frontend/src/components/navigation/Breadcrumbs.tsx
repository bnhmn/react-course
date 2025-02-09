import { ChevronRightIcon } from '@chakra-ui/icons';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { Link } from '@tanstack/react-router';

export function Breadcrumbs() {
  // TODO: dummy data
  const breadcrumbs = [{ key: '/events', breadcrumb: 'Events' }];

  return (
    // https://v2.chakra-ui.com/docs/components/breadcrumb
    <Breadcrumb spacing="8px" separator={<ChevronRightIcon color="gray.500" />} mb="6">
      {breadcrumbs.map((breadcrumb) => (
        <BreadcrumbItem key={breadcrumb.key}>
          <BreadcrumbLink as={Link} to={breadcrumb.key} _hover={{ textDecoration: 'underline' }}>
            {breadcrumb.breadcrumb}
          </BreadcrumbLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
}
