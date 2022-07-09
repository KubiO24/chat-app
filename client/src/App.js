import { useRecoilValue } from 'recoil';  
import { usernameState } from './globalState';
import SignIn from './SignIn';
import Main from './Main';
import './App.css'

function App() {
    const username = useRecoilValue(usernameState);

    return (
        <> {username == '' ? <SignIn /> : <Main />} </>
    );
}

export default App;
