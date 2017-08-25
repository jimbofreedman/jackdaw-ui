
import { fromJS } from 'immutable';
import musicControlReducer from '../reducer';

describe('musicControlReducer', () => {
  it('returns the initial state', () => {
    expect(musicControlReducer(undefined, {})).toEqual(fromJS({}));
  });
});
