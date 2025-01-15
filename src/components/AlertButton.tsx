import { AlertDialog, Button, Flex } from "@radix-ui/themes"
import { useTasks } from "../hooks/useTasks"

interface AlertButtonProps {
	id: string
}

export const AlertButton: React.FC<AlertButtonProps> = ({id}) => {
	const {deleteTask} = useTasks()

	const handleDelete = (id: string) => {
		deleteTask(id)
	 }

	return(
    <AlertDialog.Root>
		<AlertDialog.Trigger>
			<Button color="red" style={{ cursor: 'pointer' }}>
         	Delete
        </Button>
		</AlertDialog.Trigger>
			<AlertDialog.Content className="AlertDialogContent">
				<AlertDialog.Title className="AlertDialogTitle">
					Are you sure?
				</AlertDialog.Title>
				<AlertDialog.Description mb="4">
					This action cannot be undone. This will permanently delete your task.
				</AlertDialog.Description>
				<Flex justify={"end"} gap={"4"}>
					<AlertDialog.Cancel>
						<Button color="gray" style={{cursor:"pointer"}}>Cancel</Button>
					</AlertDialog.Cancel>
					<AlertDialog.Action>
						<Button color="red" style={{cursor:"pointer"}} onClick={() => handleDelete(id)}>Delete task</Button>
					</AlertDialog.Action>
				</Flex>
			</AlertDialog.Content>
	</AlertDialog.Root>
	)
}