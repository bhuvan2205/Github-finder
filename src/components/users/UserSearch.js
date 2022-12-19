import { useContext, useState } from 'react';
import { GithubContext } from '../../context/github/GithubContext';
import { AlertContext } from '../../context/alert/AlertContext';

const UserSearch = () => {

    const [text, setText] = useState('');

    const { users, fetchUsers, clearUsers } = useContext(GithubContext);
    const { setAlert } = useContext(AlertContext);

    const handleChange = (e) => {

        setText(e.target.value);
    }

    const handleSubmit = (e) => {

        e.preventDefault();

        if (text === '') {

            setAlert('Please enter Something..', 'error');
        }

        else {

            fetchUsers(text);
            setText('');
        }
    }

    const handleClear = () => {

        clearUsers();
        setText('');
    }

    return (
        <div className='flex w-full justify-center align-top mb-12 transition duration-300 ease-in-out'>
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="form-control">
                        <div className="relative">
                            <input type="text" placeholder='Find Github Profile' className="w-full pr-40 bg-gray-200 input input-lg text-black" value={text} onChange={handleChange} />
                            <button className='absolute top-0 right-0 rounded-l-none w-20 btn btn-lg md:w-32'>Go</button>
                        </div>
                    </div>
                </form>
            </div>
            {
                users.length > 0 && (<div>
                    <button className='btn btn-ghost btn-lg' onClick={handleClear}>Clear</button>
                </div>)
            }

        </div>
    )
}

export default UserSearch;