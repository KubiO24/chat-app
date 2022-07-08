import { useRecoilValue } from 'recoil';  
import { usernameState } from './globalState';
import { socket } from './socketConnection';
import SignIn from './SignIn';

function App() {
    const username = useRecoilValue(usernameState);

    socket.on('userJoined', newCount => {
        console.log(newCount)
    });

    return (
        <> {username == '' ? <SignIn /> : <div/>} </>
    );
}

export default App;
