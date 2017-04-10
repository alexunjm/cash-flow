import { MovimientoState } from './reducers/movimiento.reducer';
import { UserState } from './reducers/user.reducer';

export interface GlobalState {
  userReducer: UserState;
  movimientoReducer: MovimientoState;
}
