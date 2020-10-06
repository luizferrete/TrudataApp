import {
  MODIFICA_EMAIL,
  MODIFICA_SENHA,
  LOGIN_EM_ANDAMENTO,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  INICIALIZA_LOGIN,
} from './types';
import api from '../services/api';
import {Actions} from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';
import b64 from 'base-64';

export const modificaEmail = texto => {
  return {
    type: MODIFICA_EMAIL,
    payload: texto,
  };
};

export const modificaSenha = texto => {
  return {
    type: MODIFICA_SENHA,
    payload: texto,
  };
};

export const autenticarUsuario = user => {
  return async dispatch => {
    dispatch({type: LOGIN_EM_ANDAMENTO});
    if (user.email === '' || user.senha === '') {
      dispatch({
        type: LOGIN_FAIL,
        payload: 'Por favor, informe o usuário e a senha.',
      });
    } else {
      try {
        await api
          .post('/login', {
            Username: user.email,
            password: user.senha,
          })
          .then(function(response) {
            if (response.data.authenticated) {
              dispatch({
                type: LOGIN_SUCCESS,
                payload: response.data,
              });
              AsyncStorage.setItem('usuarioEmail', b64.encode(user.email));
              AsyncStorage.setItem('usuarioSenha', b64.encode(user.senha));
              Actions.principal();
            } else {
              dispatch({
                type: LOGIN_FAIL,
                payload: response.data.message,
              });
            }
          });
      } catch (error) {
        console.log(error);
        dispatch({
          type: LOGIN_FAIL,
          payload:
            'Não foi possível realizar o login. Tente novamente mais tarde. Se o erro persistir, contate o suporte.',
        });
      }
    }
  };
};

export const inicializaLogin = (email, senha) => {
  return {
    type: INICIALIZA_LOGIN,
    payload: {email: email, senha: senha},
  };
};
