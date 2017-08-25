import { createSelector } from 'reselect';

/**
 * Direct selector to the playlistViewer state domain
 */
const selectPlaylistViewerDomain = () => (state) => state.get('playlistViewer');

/**
 * Other specific selectors
 */


/**
 * Default selector used by PlaylistViewer
 */

const makeSelectPlaylistViewer = () => createSelector(
  selectPlaylistViewerDomain(),
  (substate) => substate.toJS()
);

export default makeSelectPlaylistViewer;
export {
  selectPlaylistViewerDomain,
};
