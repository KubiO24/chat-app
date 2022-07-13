import { atom } from 'recoil';  

export const usernameState = atom({
    key: 'usernameState',
    default: '',
});

export const avatarColorState = atom({
    key: 'avatarColorState',
    default: '000000',
});

export const loginnedUsersListState = atom({
    key: 'loginnedUsersState',
    default: [],
});

export const selectedChatState = atom({
    key: 'selectedChatState',
    default: {},
});

export const messagesListState = atom({
    key: 'messagesListState',
    default: [],
});

export const newMessageState = atom({
    key: 'newMessageState',
    default: {},
});

export const unreadMessagesState = atom({
    key: 'unreadMessagesState',
    default: [],
});

export const userFilterState = atom({
    key: 'userFilterState',
    default: '',
});