import { DeepPartial } from 'ts-essentials';
import { createStore, Store } from '../../../internal/index';
import { SlideToggleContracts } from '../types/index';
import { SLIDE_TOGGLE_ACTIONS, SlideToggleActions } from './actions/slideToggleActions.js';
import { getStateFromContracts } from './common/getStateFromContracts.js';
import { SLIDE_TOGGLE_DEFAULT_STATE, SlideToggleState } from './state.js';

type SlideToggleStore = Store<SlideToggleActions, SlideToggleState>;

function createSlideToggleStore(
    contracts: DeepPartial<SlideToggleContracts>
) {
    const initialState = getStateFromContracts(SLIDE_TOGGLE_DEFAULT_STATE, contracts);
    return createStore<SlideToggleActions, SlideToggleState>(initialState, SLIDE_TOGGLE_ACTIONS);
}

export type { SlideToggleStore };
export { createSlideToggleStore };
