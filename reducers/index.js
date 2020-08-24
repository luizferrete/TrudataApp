import {combineReducers} from 'redux';
import LoginReducer from './LoginReducer';
import PrincipalReducer from './PrincipalReducer';
import ContatosReducer from './ContatosReducer';
import ProdutosReducer from './ProdutosReducer';
import ClientesReducer from './ClientesReducer';

export default combineReducers({
  LoginReducer,
  PrincipalReducer,
  ContatosReducer,
  ProdutosReducer,
  ClientesReducer,
});
