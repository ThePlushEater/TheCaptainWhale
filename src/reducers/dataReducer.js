import Immutable from 'seamless-immutable';
import store from "./../store";
import moment from 'moment';
import { AnimateHorizontalScroll } from './../utils/scroll';


const defaultState = {
  fetching: false,
  fetched: false,
  error: null,
  allPosts: [],
  positions: [],
  programPosts: [],
  designPosts: [],
  artPosts: [],
  aboutPost: null,
  selectedPost: null,
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
    case "FETCH_POSTS_PENDING": {
      return {...state, fetching: true};
      // return state.merge({fetching: true});
    }
    case "FETCH_POSTS_REJECTED": {
      return {...state, fetching: false, error: action.payload};
      // return state.merge({fetching: false, error: action.payload});
    }
    case "FETCH_POSTS_FULFILLED": {
      const allPosts = action.payload.data.sort(function(a, b) {
        const aDateValue = new moment(a.date).valueOf();
        const bDateValue = new moment(b.date).valueOf();
        if (aDateValue > bDateValue) {
          return -1;
        } else if (aDateValue < bDateValue) {
          return 1;
        } else {
          return 0;
        }
      });

      let lastType = "";
      let lastDateValue = new moment(allPosts[0].date).valueOf();
      let accumulatedPosition = -0.475;
      allPosts.map((item, index) => {
        // console.log(Math.max(1, (lastDateValue - new moment(item.date).valueOf()) / (1000 * 60 * 60 * 24 * 30)));
        const difference = Math.floor(Math.min(1, Math.max(1, (lastDateValue - new moment(item.date).valueOf()) / (1000 * 60 * 60 * 24 * 30))));
        if (lastType == item.acf.category) {
          accumulatedPosition += 1 * difference;
        } else {
          accumulatedPosition += 0.5 * difference;
        }
        lastType = item.acf.category;
        lastDateValue = new moment(item.date).valueOf();
        item.position = accumulatedPosition;
        item.height = 0;
        item.graphValue = Math.random();
      });

      const programPosts = allPosts.filter((item) => {
        return item.acf.category == "program";
      });
      const designPosts = allPosts.filter((item) => {
        return item.acf.category == "design";
      });
      const artPosts = allPosts.filter((item) => {
        return item.acf.category == "art";
      });
      const aboutPost = allPosts.filter((item) => {
        return item.acf.category == "about";
      })[0];

      const selectedPost = allPosts.filter((item) => {
        return item.title.rendered.toLowerCase().split(' ').join('-') == store.getState().browser.route;
      })[0];

      if (selectedPost && selectedPost.acf.category != "about") {
        setTimeout(function() {
          const width = store.getState().browser.windowSize[0];
          const scrollLeft = Math.max(400, Math.floor(width / 3)) * selectedPost.position + 60 - width * 0.5 + Math.max(320, Math.floor(width / 3.5)) * 0.5;
          new AnimateHorizontalScroll('#post-list', scrollLeft, 1000);
        }.bind(this), 500);
      }

      return {...state, fetching: false, fetched: true, allPosts: allPosts, programPosts: programPosts, designPosts: designPosts, artPosts: artPosts, aboutPost: aboutPost, selectedPost: selectedPost};
      // return state.merge({fetching: false, fetched: true, allPosts: allPosts, programPosts: programPosts, designPosts: designPosts, artPosts: artPosts});
      // return state.merge({fetching: false, fetched: true, allPosts: allPosts, positions: positions});
    }
    case "UPDATE_POST_HEIGHT": {
      return {...state};
    }
    case "SET_SELECTED_POST": {
      if (action.payload) {
        if (action.payload.acf.category != "about") {
          setTimeout(function() {
            const width = store.getState().browser.windowSize[0];
            const scrollLeft = Math.max(400, Math.floor(width / 3)) * action.payload.position + 60 - width * 0.5 + Math.max(320, Math.floor(width / 3.5)) * 0.5;
            new AnimateHorizontalScroll('#post-list', scrollLeft, 1000);
          }.bind(this), 500);
        }
      }
      return {...state, selectedPost: action.payload};
    }
  }
  return state;
};
