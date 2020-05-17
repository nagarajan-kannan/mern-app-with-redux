import { ACTION } from '../helpers/app.constant';

const intitalState = {
    stacks: []
};

export const AppReducer = (state = intitalState, action) => {
    switch (action.type) {
        case ACTION.STACKS:
            return {
                ...state,
                stacks: action.stacks
            }
        default:
            return state;
    };
};
