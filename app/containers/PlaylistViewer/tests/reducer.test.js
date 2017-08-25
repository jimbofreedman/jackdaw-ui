
import { fromJS } from 'immutable';
import playlistViewerReducer from '../reducer';

describe('playlistViewerReducer', () => {
  it('returns the initial state', () => {
    expect(playlistViewerReducer(undefined, {})).toEqual(fromJS({}));
  });
});
