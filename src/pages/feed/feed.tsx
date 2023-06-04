import { useForm } from 'react-hook-form';
import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import './feed.scss'
import { useLocation, useNavigate } from 'react-router-dom';
import { Message } from '../../components/message/message';
import { api } from '../../actions/api';
import { useState } from 'react';
import { SignOut } from 'phosphor-react';


const NewMessageFormSchema = zod.object({
    title: zod.string().nonempty(),
    content: zod.string().nonempty(),
});

type NewMessageFormInputs = zod.infer<typeof NewMessageFormSchema>;

export function Feed() {
    const location = useLocation();
    const state = location.state;

    const navigate = useNavigate();

    const [atualization, setAtualization] = useState(0);
    const [signOutHovered, setSignOutHovered] = useState(false);

    const { register, handleSubmit, reset, formState } = useForm<NewMessageFormInputs>({
        resolver: zodResolver(NewMessageFormSchema)
    });

    const contentTextarea = document.getElementById('contentTextarea');

    function resetTextareaSize() {
        if (contentTextarea) {
            contentTextarea.style.height = '';
            contentTextarea.style.height = contentTextarea.scrollHeight + 'px';
        }
    }

    function handleCreateNewLogin(data: NewMessageFormInputs) {

        const postData = {
            username: state.data.login,
            title: data.title,
            content: data.content
        }

        api.post('careers/', postData)
            .then(() => {
                setAtualization(atualization + 1);
            })
            .catch(error => {
                console.error(error);
            });

        reset();
        resetTextareaSize();
    }

    return (
        <>
            <header>
                <span>CodeLeap Network</span>

                <div>
                    <span>{state.data.login}</span>
                    <SignOut
                        size={32}
                        color={signOutHovered ? '#ff0000' : '#ffffff'}
                        weight="bold"
                        className="signOut"
                        onClick={() => navigate('/')}
                        onMouseEnter={() => setSignOutHovered(true)}
                        onMouseLeave={() => setSignOutHovered(false)}
                    />
                </div>
            </header>

            <section>
                <h3>What’s on your mind?</h3>

                <form onSubmit={handleSubmit(handleCreateNewLogin)}>
                    <label>Title</label>
                    <input type="text" placeholder='Your title' required {...register('title')} />

                    <label>Content</label>
                    <textarea placeholder='Your content'
                        required
                        maxLength={500}
                        {...register('content')}
                        id="contentTextarea"></textarea>

                    <button disabled={!formState.isValid}>Create</button>
                </form>
            </section>

            <Message login={state.data.login} atualization={atualization} />
        </>
    )
}