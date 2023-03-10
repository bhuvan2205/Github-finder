import { useContext } from 'react';
import Spinner from '../Spinner';
import { GithubContext } from '../../context/github/GithubContext';
import UserItem from './UserItem';

const UserResults = () => {

    const { users, loading } = useContext(GithubContext);

    if (!loading) {
        return (
            <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 '>
                {users.map((user) => (<UserItem key={user.id} user={user} />))}
            </div>
        )
    }

    else {
        return (<Spinner />)
    }


}

export default UserResults