import { useState } from 'react';
import { useLoaderData, useNavigate, useParams } from 'react-router';

import { Box, Heading } from '@chakra-ui/react';

import { DeleteDialog } from '../../components/DeleteDialog';
import { EventType, EventUpdateType, useEventBackend } from '../../lib/backend';
import { EditEvent } from './EditEvent';
import { ViewEvent } from './ViewEvent';

export function ViewEventPage() {
  const event = useLoaderData<EventType>();
  const params = useParams();
  const backend = useEventBackend(params.eventId!);
  const [isEditMode, setIsEditMode] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // https://reactrouter.com/start/library/navigating
  const navigate = useNavigate();

  function handleStartEdit() {
    setIsEditMode(true);
  }
  async function handleSubmitEdit(event: EventUpdateType) {
    await backend.updateEvent(event);
    setIsEditMode(false);
  }
  function handleCancelEdit() {
    setIsEditMode(false);
  }
  async function handleStartDelete() {
    setDeleteModalOpen(true);
  }
  async function handleSubmitDelete() {
    await backend.deleteEvent();
    setDeleteModalOpen(false);
    navigate('..');
  }
  function handleCancelDelete() {
    setDeleteModalOpen(false);
  }

  return (
    <>
      <Heading mb="10">Event Details</Heading>
      <Box w="100%" h="100%" maxW="45rem">
        {!isEditMode && <ViewEvent event={event} onEdit={handleStartEdit} onDelete={handleStartDelete} />}
        {isEditMode && <EditEvent event={event} onSubmit={handleSubmitEdit} onCancel={handleCancelEdit} />}
      </Box>
      <DeleteDialog
        label={`Delete "${event?.title}"`}
        open={deleteModalOpen}
        onSubmit={handleSubmitDelete}
        onCancel={handleCancelDelete}
      />
    </>
  );
}
