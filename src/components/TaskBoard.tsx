import { Badge, Flex, Grid, ScrollArea } from '@radix-ui/themes';
import { Task } from '../entities/Task';
import { TaskCard } from './TaskCard';
import { useContext } from 'react';
import { TasksContext } from '../contexts/TasksContext';

export const TaskBoard: React.FC = () => {
  const {tasks} = useContext(TasksContext)

  const tasksTodo: Task[] =
    tasks.filter((task) => task.status === 'todo') ?? [];
  const tasksInProgress: Task[] =
    tasks.filter((task) => task.status === 'inprogress') ?? [];
  const tasksDone: Task[] =
    tasks.filter((task) => task.status === 'done') ?? [];

  return (
    <ScrollArea scrollbars="horizontal">
      <Grid columns="3" gap="4" minWidth="64rem" mt="3">
        <Flex direction="column" gap="4">
          <Badge size="3" color="gray">
            To do ({tasksTodo.length})
          </Badge>
          {tasksTodo.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </Flex>

        <Flex direction="column" gap="4">
          <Badge size="3" color="yellow">
            In progress ({tasksInProgress.length})
          </Badge>
          {tasksInProgress.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </Flex>

        <Flex direction="column" gap="4">
          <Badge size="3" color="green">
            Done ({tasksDone.length})
          </Badge>
          {tasksDone.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </Flex>
      </Grid>
    </ScrollArea>
  );
};
