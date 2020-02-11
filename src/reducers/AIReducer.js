import { EXAMPLE_TEST_DATA } from "../actions/types";

const INITIAL_STATE = {
    loaded: false
}

export default (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        
        case EXAMPLE_TEST_DATA:
            return { ...state, loaded: true };
        
        default:
            return state;

    }
}
