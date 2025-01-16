import { Badge, Box, Button, Dialog, Flex, RadioGroup, Text, TextArea, TextField } from "@radix-ui/themes";
import { FormEventHandler, useState } from "react";
import { useTasks } from "../hooks/useTasks";
import { z } from 'zod';
import { Pencil2Icon } from "@radix-ui/react-icons";

const CreateTaskSchema = z.object({
   title: z.string(),
   description: z.string(),
   status: z.enum(['todo', 'inprogress', 'done']),
   priority: z.enum(['low', 'medium', 'high']),
 });

interface EditTaskFormProps {
  id: string,
  title: string,
  description: string,
  status: string,
  priority: string
}

export const EditTaskForm: React.FC<EditTaskFormProps> = ({id, title, description, status, priority}) => {
   const {editTask} = useTasks()
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

      await editTask(id, taskData)

      console.log("teste")
   };

   return (
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger>
         <Pencil2Icon style={{cursor:"pointer"}}/>
        </Dialog.Trigger>
  
        <Dialog.Content maxWidth="32rem">
          <Dialog.Title>Edit task</Dialog.Title>
  
          <Dialog.Description>Change the task properties</Dialog.Description>
  
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
                  defaultValue={title}
                >
                </TextField.Root>
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
                  defaultValue={description}
                />
              </Box>
              <Flex mb="4">
                <Box>
                  <Text as="div" mb="2">
                    Priority
                  </Text>
                  <RadioGroup.Root name="priority" defaultValue={priority}>
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
                  Update
                </Button>
              </Flex>
            </Flex>
          </form>
        </Dialog.Content>
      </Dialog.Root>
    );
}