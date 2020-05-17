import { ACTION } from '../helpers/app.constant';

export const updateStack = (stacks) => {
    return {
        type: ACTION.STACKS,
        stacks: stacks
    };
};
