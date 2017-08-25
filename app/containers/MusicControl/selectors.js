import { createSelector } from 'reselect';

/**
 * Direct selector to the musicControl state domain
 */
const selectMusicControlDomain = () => (state) => state.get('music');

/**
 * Other specific selectors
 */


/**
 * Default selector used by MusicControl
 */

const makeSelectMusicControl = () => createSelector(
  selectMusicControlDomain(),
  (substate) => substate.toJS()
);

export default makeSelectMusicControl;
export {
  selectMusicControlDomain,
};
