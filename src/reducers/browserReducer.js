import Immutable from 'seamless-immutable';
import store from "./../store";

const defaultState = Immutable({
  windowSize: [window.innerWidth, window.innerHeight],
  scrollLeft: 0,
  router: null,
  route: "",
  showInstructionAbout: true,
});

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case "SET_WINDOW_SIZE": {
      return state.merge({windowSize: action.payload});
    }
    case "UPDATE_LIST_SCROLL_LEFT": {
      return state.merge({scrollLeft: action.payload});
    }
    case "SET_ROUTER": {
      return state.merge({router: action.payload.router, route: action.payload.route });
    }
    case "PUSH_ROUTE": {
      if (action.payload != state.route) {
        if (action.payload == "") {
          state.router.push({pathname: ""});
        } else {
          state.router.push({pathname: action.payload.toString()});
        }
        return state.merge({route: action.payload});
      }
    }
    case "SHOW_INSTRUCTION_ABOUT": {
      return state.merge({showInstructionAbout: action.payload}); 
    }
  }
  return state;
};
