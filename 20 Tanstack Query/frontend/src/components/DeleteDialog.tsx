import { useEffect, useRef, useState } from 'react';

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
  onSubmit: () => void;
  onCancel: () => void;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isPending, setIsPending] = useState(false);
  const cancelRef = useRef<any>();

  useEffect(() => {
    if (open) {
      onOpen();
    } else {
      onClose();
    }
  }, [open, onOpen, onClose]);

  function handleSubmit() {
    setIsPending(true);
    onSubmit();
  }

  function handleClose() {
    onCancel();
  }

  return (
    <AlertDialog isOpen={isOpen} isCentered leastDestructiveRef={cancelRef} onClose={handleClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {label}
          </AlertDialogHeader>

          <AlertDialogBody>Are you sure? You can't undo this action afterwards.</AlertDialogBody>

          <AlertDialogFooter>
            <Button colorScheme="gray" variant="ghost" ref={cancelRef} onClick={handleClose} isDisabled={isPending}>
              Cancel
            </Button>
            <Button colorScheme="red" variant="solid" onClick={handleSubmit} ml={3} isLoading={isPending}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
