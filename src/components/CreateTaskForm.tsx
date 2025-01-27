import {
  Badge,
  Box,
  Button,
  Dialog,
  Flex,
  RadioGroup,
  Text,
  TextArea,
  TextField,
} from '@radix-ui/themes';
import { PlusIcon } from '@radix-ui/react-icons';
import { FormEventHandler, useState } from 'react';
import { z } from 'zod';
import { useTasks } from '../hooks/useTasks';

const CreateTaskSchema = z.object({
  title: z.string(),
  description: z.string(),
  status: z.enum(['todo', 'inprogress', 'done']),
  priority: z.enum(['low', 'medium', 'high']),
});

interface CreateTaskFormProps {
  status: string
}

export const CreateTaskForm: React.FC<CreateTaskFormProps> = ({status}) => {
  const {createTask} = useTasks()
  const [open, setOpen] = useState(false)

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (ev) => {
    setOpen(false)
    ev.preventDefault();

    const formData = new FormData(ev.currentTarget);

    const title = formData.get('title');
    const description = formData.get('description');
    const priority = formData.get('priority');

    ev.currentTarget.reset();

    const taskData = CreateTaskSchema.parse({
      title,
      description,
      status,
      priority,
    });

    await createTask(taskData)
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Button style={{ cursor: 'pointer' }}>
          <PlusIcon />
        </Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="32rem">
        <Dialog.Title>New Task</Dialog.Title>

        <Dialog.Description>Add new tasks to the board</Dialog.Description>

        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap="5">
            <Box maxWidth="32rem">
              <Box mt="4" mb="2">
                <Text as="label" htmlFor="title">
                  Title
                </Text>
              </Box>
              <TextField.Root
                placeholder="Write a title"
                name="title"
                id="title"
                autoFocus
                required
              />
            </Box>
            <Box maxWidth="32rem">
              <Box mb="2">
                <Text as="label" htmlFor="description">
                  Description
                </Text>
              </Box>
              <TextArea
                placeholder="Write a description"
                name="description"
                id="description"
                required
              />
            </Box>
            <Flex mb="4">
              <Box>
                <Text as="div" mb="2">
                  Priority
                </Text>
                <RadioGroup.Root name="priority" defaultValue="low">
                  <RadioGroup.Item value="low">
                    <Badge color="sky">Low</Badge>
                  </RadioGroup.Item>
                  <RadioGroup.Item value="medium">
                    <Badge color="amber">Medium</Badge>
                  </RadioGroup.Item>
                  <RadioGroup.Item value="high">
                    <Badge color="tomato">High</Badge>
                  </RadioGroup.Item>
                </RadioGroup.Root>
              </Box>
            </Flex>
            <Flex gap="4" justify="end">
              <Dialog.Close>
                <Button color="red" style={{ cursor: 'pointer' }}>
                  Cancel
                </Button>
              </Dialog.Close>
              <Button type="submit" color="green" style={{ cursor: 'pointer' }}>
                Create
              </Button>
            </Flex>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
};
