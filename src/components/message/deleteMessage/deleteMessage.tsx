import * as Dialog from '@radix-ui/react-dialog';

import './deleteMessage.scss'

interface Props {
    open: boolean;
    onClose: () => void;
    onDelete: () => void;
}

export function DeleteMessage(props: Props) {
    return (
        <Dialog.Root open={props.open}>
            <Dialog.Portal>
                <Dialog.Overlay className="DialogOverlayMessageDelete" />
                <Dialog.Content className="DialogContentMessageDelete">
                    <Dialog.Title className="DialogTitleMessageDelete">Are you sure you want to delete this item?</Dialog.Title>

                    <div>
                        <Dialog.Close asChild>
                            <button onClick={props.onClose}>Cancel</button>
                        </Dialog.Close>
                        <Dialog.Trigger asChild>
                            <button onClick={props.onDelete}>Delete</button>
                        </Dialog.Trigger>
                    </div>

                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}