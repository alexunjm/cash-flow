import * as movimiento from '../actions/movimiento.actions';

export interface MovimientoState {
  numMovimientos: number;
};

const initialState: MovimientoState = {
  numMovimientos: 0
};

export function reducer(state = initialState, action: movimiento.MovimientoActions ): MovimientoState {
  switch (action.type) {
    case movimiento.ActionTypes.CREAR: {
      return {
        numMovimientos: state.numMovimientos + 1
      };
    }
    default: {
      return state;
    }
  }
}
