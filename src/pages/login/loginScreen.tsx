import { Data } from '../../components/data/data';

import * as Dialog from '@radix-ui/react-dialog';
import { useForm } from 'react-hook-form';
import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from "react-router-dom";

import './loginScreen.scss';

const NewLoginFormSchema = zod.object({
    login: zod.string().nonempty(),
});

type NewLoginFormInput = zod.infer<typeof NewLoginFormSchema>;

export function LoginScreen() {
    const navigate = useNavigate();

    const open = true;

    const { register, handleSubmit, reset, formState } = useForm<NewLoginFormInput>({
        resolver: zodResolver(NewLoginFormSchema)
    });

    function handleCreateNewLogin(data: NewLoginFormInput) {       
        if (Data.find(value => value.login === data.login)) {
            navigate('/feed', { state: { data } });
        } else {
            alert('Invalid login')
        }
        reset();
    }

    return (
        <Dialog.Root open={open}>
            <Dialog.Portal>
                <Dialog.Overlay className="DialogOverlay" />
                <Dialog.Content className="DialogContent">
                    <Dialog.Title className="DialogTitle">Welcome to CodeLeap network!</Dialog.Title>
                    <Dialog.Description className="DialogDescription">
                        Please enter your username
                    </Dialog.Description>

                    <form onSubmit={handleSubmit(handleCreateNewLogin)}>
                        <input placeholder="Please, insert your login" required {...register('login')} />

                        <button type="submit" disabled={!formState.isValid}>Enter</button>
                    </form>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}

