import { Badge, Flex, Grid, ScrollArea } from '@radix-ui/themes';
import { Task } from '../entities/Task';
import { TaskCard } from './TaskCard';
import { useTasks } from '../hooks/useTasks';
import { CreateTaskForm } from './CreateTaskForm';

export const TaskBoard: React.FC = () => {
  const {tasks} = useTasks()

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
            <Flex direction={"row"} justify={"between"} align={"center"} width={"100%"}>
              To do ({tasksTodo.length})
              <CreateTaskForm/>
            </Flex>
          </Badge>
          {tasksTodo.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </Flex>

        <Flex direction="column" gap="4">
          <Badge size="3" color="yellow">
            <Flex direction={"row"} justify={"between"} align={"center"} width={"100%"}>
              In progress ({tasksInProgress.length})
              <CreateTaskForm />
            </Flex>
          </Badge>
          {tasksInProgress.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </Flex>

        <Flex direction="column" gap="4">
          <Badge size="3" color="green">
            <Flex direction={"row"} justify={"between"} align={"center"} width={"100%"}>
              Done ({tasksDone.length})
              <CreateTaskForm />
            </Flex>
          </Badge>
          {tasksDone.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </Flex>
      </Grid>
    </ScrollArea>
  );
};
