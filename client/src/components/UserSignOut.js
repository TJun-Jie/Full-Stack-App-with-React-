import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function UserSignOut(props) {
    const history = useHistory()
    const {context} = props;
    useEffect( () => {
        context.actions.signOut();
        history.push('/');
    })
    return null;
}

export default  UserSignOut;