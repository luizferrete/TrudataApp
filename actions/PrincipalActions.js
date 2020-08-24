import {BUSCA_CONTATOS_DIA, BUSCA_CONTATOS_MES, HIGHLIGHT_MENU} from './types';
import api from '../services/api';
import {Actions} from 'react-native-router-flux';

export const buscaContatos = token => {
  return async dispatch => {
    try {
      const config = {
        headers: {
          Authorization: token,
        },
      };
      await api.get('/contatos', config).then(function(response) {
        dispatch({
          type: BUSCA_CONTATOS_DIA,
          payload: response.data.ContatosDia,
        });
        dispatch({
          type: BUSCA_CONTATOS_MES,
          payload: response.data.ContatosMes,
        });
      });
    } catch (error) {
      if (error.response.status === 401) {
        Actions.formLogin();
      }
      dispatch({
        type: BUSCA_CONTATOS_DIA,
        payload: 0,
      });
      dispatch({
        type: BUSCA_CONTATOS_MES,
        payload: 0,
      });
    }
  };
};

export const highlightMenu = value => {
  return {
    type: HIGHLIGHT_MENU,
    payload: value,
  };
};
