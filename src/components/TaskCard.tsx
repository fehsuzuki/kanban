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

interface TaskCardProps {
  task: Task;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
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

  return (
    <Card>
      <Flex align="center" gap="4">
        <Heading as="h3" weight="bold" size="3">
          {task.title}
        </Heading>
        <Badge color={getPriorityColor(task.priority)}>{task.priority}</Badge>
      </Flex>

      <Box mt="4">
        <Text>{task.description}</Text>
      </Box>

      <Flex gap="2" mt="4">
        {task.status !== 'done' && (
          <Button
            color={getActionColor(task.status)}
            style={{ cursor: 'pointer' }}
          >
            {getActionText(task.status)}
          </Button>
        )}
        <Button color="red" style={{ cursor: 'pointer' }}>
          Delete
        </Button>
      </Flex>
    </Card>
  );
};
