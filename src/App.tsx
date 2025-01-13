import { Box, Flex, Heading } from '@radix-ui/themes';
import { CreateTaskForm } from './components/CreateTaskForm';
import { TaskBoard } from './components/TaskBoard';
import { TasksContextProvider } from './contexts/TasksContext';

export default function App() {
  return (
    <TasksContextProvider>
      <Box maxWidth="80rem" mx="auto">
        <Box height="4rem">
          <Flex align="center" gap="5" height="100%">
            <Heading as="h1" size="8" weight="light">
              Kanban2
            </Heading>
            <CreateTaskForm />
          </Flex>
        </Box>
        <Box>
          <Heading as="h2" mt="6">Task Board</Heading>
        </Box>
        <TaskBoard />
      </Box>
    </TasksContextProvider>
  );
}
