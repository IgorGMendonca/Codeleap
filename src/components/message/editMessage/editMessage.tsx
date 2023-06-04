import * as Dialog from '@radix-ui/react-dialog';

import { useForm } from 'react-hook-form';
import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import './editMessage.scss'
import { api } from '../../../actions/api';

interface Props {
    id: number | null;
    open: boolean;
    onClose: () => void;
    onEdit: () => void;
}

const NewMessageFormSchema = zod.object({
    title: zod.string().nonempty('Please enter a title'),
    content: zod.string().nonempty('Please enter a content'),
});

type NewMessageFormInputs = zod.infer<typeof NewMessageFormSchema>;

export function EditMessage(props: Props) {
    const { register, handleSubmit, reset } = useForm<NewMessageFormInputs>({
        resolver: zodResolver(NewMessageFormSchema)
    });


    async function handleEditMessage(data: NewMessageFormInputs) {
        const patchData = {
            title: data.title,
            content: data.content
        };

        await api.patch(`careers/${props.id}/`, patchData)
            .then(() => {
                props.onEdit();
            })
            .catch(error => {
                console.error(error);
            });

        reset();
    }

    return (
        <Dialog.Root open={props.open}>
            <Dialog.Portal>
                <Dialog.Overlay className="DialogOverlayMessageEdit" />
                <Dialog.Content className="DialogContentMessageEdit">
                    <Dialog.Title className="DialogTitleMessageEdit">Edit item</Dialog.Title>


                    <form onSubmit={handleSubmit(handleEditMessage)}>
                        <label>Title</label>
                        <input type="text" placeholder='Your title' required {...register('title')} />

                        <label>Content</label>
                        <textarea placeholder='Your content' required maxLength={500} {...register('content')}></textarea>

                        <div>
                            <Dialog.Close asChild>
                                <button onClick={props.onClose}>Cancel</button>
                            </Dialog.Close>

                            <button >Save</button>
                        </div>
                    </form>


                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}