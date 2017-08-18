import { createSelector } from 'reselect';

/**
 * Direct selector to the music state domain
 */
const selectMusicDomain = () => (state) => state.get('music');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Music
 */

const makeSelectMusic = () => createSelector(
  selectMusicDomain(),
  (substate) => substate.toJS()
);

export default makeSelectMusic;
export {
  selectMusicDomain,
};
