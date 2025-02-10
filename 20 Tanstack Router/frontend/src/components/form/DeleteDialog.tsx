import { useEffect, useRef, useTransition } from 'react';

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from '@chakra-ui/react';

export function DeleteDialog({
  label,
  open,
  onSubmit,
  onCancel,
}: {
  label: string;
  open: boolean;
  onSubmit: () => Promise<any>;
  onCancel: () => void;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<any>(null);
  // Show pending state via https://react.dev/reference/react/useTransition
  const [isSubmitting, startTransition] = useTransition();

  useEffect(() => {
    if (open) {
      onOpen();
    } else {
      onClose();
    }
  }, [open, onOpen, onClose]);

  const handleSubmit = () => {
    startTransition(() => onSubmit());
  };

  return (
    <AlertDialog isOpen={isOpen} isCentered leastDestructiveRef={cancelRef} onClose={onCancel}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {label}
          </AlertDialogHeader>

          <AlertDialogBody>Are you sure? You can't undo this action afterwards.</AlertDialogBody>

          <AlertDialogFooter>
            <Button colorScheme="gray" variant="ghost" ref={cancelRef} onClick={onCancel} isDisabled={isSubmitting}>
              Cancel
            </Button>
            <Button colorScheme="red" variant="solid" onClick={handleSubmit} ml={3} isLoading={isSubmitting}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
