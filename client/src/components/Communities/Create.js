import { useContext, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import ErrorBox from '../Notifications/ErrorBox';
import './Create.css';
import * as communityService from '../../services/communityService';
import { NotificationContext } from '../Notifications/NotificationProvider';


function Create() {

    const navigate = useNavigate();
    const [error, setError] = useState();
    const [loading, setLoading] = useState();
    const { currentUser } = useAuth();
    const dispatch = useContext(NotificationContext);
    const regex = /^[a-zA-Z0-9]+$/;

    function submitFormHandler(e) {
        e.preventDefault();
        setError('');
        let { title, description } = Object.fromEntries(new FormData(e.currentTarget));
        if (title.length < 3) {
            return setError('Title must be atleast three characters.')
        }
        if (description.length < 10) {
            return setError('Description must be atleast ten characters.')
        }
        if (!title.match(regex)) {
            return setError('Title can only be letters and numbers')
        }

        try {
            setLoading(true)
            communityService.create(title, description, currentUser.token)
            .then(result => {
                if (result?.status === 'Error') {
                    setError(result.message);
                    setLoading(false);
                } else {
                    dispatch({
                        type: "ADD_NOTIFICATION",
                        payload: {
                            type: "SUCCESS",
                            message: "Your community has been created successfully."
                        }
                    })
                    navigate(`/community/${title}`);
                }
            });
        } catch(error) {
            dispatch({
                type: "ADD_NOTIFICATION",
                payload: {
                    type: "ERROR",
                    message: "Could't create community."
                }
            })
            setLoading(false);
        }
    }

    return (
        <section className='community-section'>
        <p className='form-title'>Create a community</p>
        {error && <ErrorBox message={error} />}
        <form className='community-create-form' onSubmit={submitFormHandler}>
            <fieldset className='community-create-field'>
                <label htmlFor='community-title' className='community-input-label'>Name your community</label>
                <input id='community-title' type='text' name='title' className='community-input' />
            </fieldset>
            <fieldset className='community-create-field'>
                <label htmlFor='description' className='community-input-label'>Tell us about it</label>
                <textarea id='description' type='text' name='description' rows="12" cols="20" className='community-textarea'/>
            </fieldset>
            <button className='create-cta' type='submit' disabled={loading} >Create now</button>
        </form>
        </section>
        
    );
};

export default Create;