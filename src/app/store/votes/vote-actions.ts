import {VoterService} from './voter.service';

export interface Action {
  type: any;
  counter ?: number;
  server ?: VoterService;
}

/**
 * VoteAction Constants
 */
export const VoteActions = {
  YES_VOTE : {
    SUBMITTED  : "YES_VOTE_SUBMITTED",
    SUCCESS    : "YES_VOTE_ACCEPTED",
    ERROR      : "YES_VOTE_REJECTED"
  },
  NO_VOTE : {
    SUBMITTED  : "NO_VOTE_SUBMITTED",
    SUCCESS    : "NO_VOTE_ACCEPTED",
    ERROR      : "NO_VOTE_REJECTED"
  },
  TOTAL_VOTES  : {
    REQUESTED  : "LOAD_TOTAL_VOTES_REQUESTED",
    SUCCESS    : "LOAD_TOTAL_VOTES_SUCCESS",
    ERROR      : "LOAD_TOTAL_VOTES_SUCCESS"
  },
};

// *************************************************
// Implement Async Action Creators
// *************************************************

export function voteYesAction(server:VoterService) {
  return subscribe( server.addVote(), VoteActions.YES_VOTE);
}

export function voteNoAction(server:VoterService) {
  return subscribe( server.removeVote(), VoteActions.NO_VOTE);
}

export function loadTotalVotesAction(server:VoterService) {
  return subscribe( server.getVotes(), VoteActions.TOTAL_VOTES);
}

// ************************************************************************
// Internal `subscribe` method prepares async action function which
// will not only call remote service but will also dispatch the 'pending' action
// ************************************************************************

function subscribe(response$,action) {
  return (dispatch, getState) => {
    let actionPending = { type : action.REQUESTED || action.SUBMITTED };
    let onActionDone  = (total) => dispatch({ type:action.SUCCESS,payload:total });
    let onActionError = (error) => dispatch({ type:action.ERROR,  payload:error });

    dispatch( actionPending );
    return response$.subscribe(onActionDone, onActionError);
  }
}
