import { atom } from 'recoil';  

export const socketState = atom({
    key: 'socketState', // unique ID (with respect to other atoms/selectors)
    default: '', // default value (aka initial value)
});

export const usernameState = atom({
    key: 'usernameState', // unique ID (with respect to other atoms/selectors)
    default: '', // default value (aka initial value)
});