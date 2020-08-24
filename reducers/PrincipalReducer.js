import {
  BUSCA_CONTATOS_DIA,
  BUSCA_CONTATOS_MES,
  HIGHLIGHT_MENU,
} from '../actions/types';

const INITIAL_STATE = {
  contatosMes: 0,
  contatosDia: 0,
  menuItem: 'home',
};

export default (state = INITIAL_STATE, action) => {
  console.log(action);
  switch (action.type) {
    case BUSCA_CONTATOS_MES:
      return {...state, contatosMes: action.payload};
    case BUSCA_CONTATOS_DIA:
      return {...state, contatosDia: action.payload};
    case HIGHLIGHT_MENU:
      return {...state, menuItem: action.payload};
    default:
      return state;
  }
};
