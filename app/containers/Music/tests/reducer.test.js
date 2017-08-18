
import { fromJS } from 'immutable';
import musicReducer from '../reducer';

describe('musicReducer', () => {
  it('returns the initial state', () => {
    expect(musicReducer(undefined, {})).toEqual(fromJS({}));
  });
});
