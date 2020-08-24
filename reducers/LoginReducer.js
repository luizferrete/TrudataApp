import {
  MODIFICA_EMAIL,
  MODIFICA_SENHA,
  LOGIN_EM_ANDAMENTO,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  INICIALIZA_LOGIN,
} from '../actions/types';

const INITIAL_STATE = {
  email: '',
  senha: '',
  token: '',
  erroLogin: '',
  loadingLogin: false,
  usuarioLogadoEmail: '',
  usuarioLogadoNome: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MODIFICA_EMAIL:
      return {...state, email: action.payload, erroLogin: ''};
    case MODIFICA_SENHA:
      return {...state, senha: action.payload, erroLogin: ''};
    case LOGIN_EM_ANDAMENTO:
      return {...state, loadingLogin: true};
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: `Bearer ${action.payload.accessToken}`,
        loadingLogin: false,
        erroLogin: '',
        usuarioLogadoEmail: action.payload.username,
        usuarioLogadoNome: action.payload.usuario,
      };
    case LOGIN_FAIL:
      return {...state, loadingLogin: false, erroLogin: action.payload};
    case INICIALIZA_LOGIN:
      return {
        ...state,
        email: action.payload.email,
        senha: action.payload.senha,
      };
    default:
      return state;
  }
};
