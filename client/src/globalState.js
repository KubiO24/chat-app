import { atom } from 'recoil';  

export const usernameState = atom({
    key: 'usernameState', // unique ID (with respect to other atoms/selectors)
    default: '', // default value (aka initial value)
});

export const avatarColorState = atom({
    key: 'avatarColorState', // unique ID (with respect to other atoms/selectors)
    default: '000000', // default value (aka initial value)
});

export const loginnedUsersListState = atom({
    key: 'loginnedUsersState', // unique ID (with respect to other atoms/selectors)
    default: [], // default value (aka initial value)
});

export const selectedChatState = atom({
    key: 'selectedChatState', // unique ID (with respect to other atoms/selectors)
    default: '', // default value (aka initial value)
});

export const messagesListState = atom({
    key: 'messagesListState', // unique ID (with respect to other atoms/selectors)
    default: [], // default value (aka initial value)
});

export const newMessageState = atom({
    key: 'newMessageState', // unique ID (with respect to other atoms/selectors)
    default: {}, // default value (aka initial value)
});