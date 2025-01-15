import {
  Badge,
  Card,
  Flex,
  Heading,
  Text,
  Box,
  Button,
} from '@radix-ui/themes';
import { Task, TaskPriority, TaskStatus } from '../entities/Task';
import { useTasks } from '../hooks/useTasks';
import { AlertButton } from './AlertButton';
import { UpdateTaskForm } from './updateTaskForm';

interface TaskCardProps {
  task: Task;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const {updateTask} = useTasks()

  const getPriorityColor = (priority: TaskPriority) => {
    const priorityColors: { [key: string]: 'sky' | 'amber' | 'tomato' } = {
      low: 'sky',
      medium: 'amber',
      high: 'tomato',
    };

    return priorityColors[priority];
  };

  const getActionText = (status: TaskStatus) => {
    const actionsTexts = {
      todo: 'Start',
      inprogress: 'Conclude',
      done: 'Archive',
    };

    return actionsTexts[status];
  };

  const getActionColor = (status: TaskStatus) => {
    const actionColors: { [key: string]: 'indigo' | 'green' | 'bronze' } = {
      todo: 'indigo',
      inprogress: 'green',
      done: 'bronze',
    };

    return actionColors[status];
  };

  const handleUpdate = (id: string) => {
    switch(task.status) {
      case "todo":
        updateTask(id, {status: "inprogress"})
        break

      case "inprogress":
        updateTask(id, {status: "done"})
        break
    }
  }

  return (
    <Card>
      <Flex justify="between">
        <Flex align="center" gap="4">
          <Heading as="h3" weight="bold" size="3">
            {task.title}
          </Heading>
          <Badge color={getPriorityColor(task.priority)}>{task.priority}</Badge>
        </Flex>
        <UpdateTaskForm/>
      </Flex>

      <Box mt="4">
        <Text>{task.description}</Text>
      </Box>

      <Flex gap="2" mt="4">
        {task.status !== 'done' && (
          <Button
            color={getActionColor(task.status)}
            style={{ cursor: 'pointer' }}
            onClick={() => handleUpdate(task.id)}
          >
            {getActionText(task.status)}
          </Button>
        )}
        <AlertButton id={task.id}/>
      </Flex>
    </Card>
  );
};
