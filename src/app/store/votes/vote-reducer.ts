import { VoteActions } from './vote-actions';
import { INITIAL_VOTES_STATE } from 'app/store/votes/vote-state';

/**
 * Use the custom actions to update the counter state!
 */
export function voteReducer(state: VotesState = INITIAL_VOTES_STATE, action) {
  switch (action.type) {
    case VoteActions.NO  :  return {...state, counter: state.counter - 1};
    case VoteActions.YES :  return {...state, counter: state.counter + 1};
    default              :  return state;
  }
}
