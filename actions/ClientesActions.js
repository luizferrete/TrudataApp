import {
  BUSCA_LISTA_CLIENTES,
  BUSCA_DETALHES_CLIENTE,
  ENVIA_CODIGO_CLIENTE,
  ALTERA_SKIP,
  ALTERA_DATA_LOAD,
  MOSTRA_PESQUISAR_CLIENTES,
  MODIFICA_SEARCH_CLIENTE,
  VALIDA_LISTA_CLIENTES,
  VALIDA_DETALHES_CLIENTE,
  IS_LOADING_CLIENTES,
  MOSTRAR_ICONE_FILTRO_CLIENTES,
} from './types';
import api from '../services/api';
import {Actions} from 'react-native-router-flux';

export const buscaListaClientes = (token, skip, top) => {
  return async dispatch => {
    try {
      const config = {
        headers: {
          Authorization: token,
        },
      };
      await api
        .get(`/clientes?$orderby=Codigo&$skip=${skip}&$top=${top}`, config)
        .then(function(response) {
          dispatch({
            type: BUSCA_LISTA_CLIENTES,
            payload: response.data,
          });
        });
    } catch (error) {
      if (error.response.status === 400) {
        validaListaClientes(
          'Ops! Ocorreu um erro ao buscar os clientes. Reabra o aplicativo e, se o erro persistir, contate o suporte.',
          dispatch,
        );
      }
      if (error.response.status === 500) {
        validaListaClientes(
          'Ops! Ocorreu um erro no servidor ao buscar os clientes.. Por favor, tente novamente, se o erro persistir contate o suporte.',
          dispatch,
        );
      }
      if (error.response.status === 401) {
        Actions.formLogin();
      }
    }
  };
};

const validaListaClientes = (msg, dispatch) => {
  dispatch({
    type: VALIDA_LISTA_CLIENTES,
    payload: msg,
  });
};

export const buscaDetalhesCliente = (token, cdCliente) => {
  return async dispatch => {
    try {
      const config = {
        headers: {
          Authorization: token,
        },
      };
      await api
        .get(`clientes/detail/${cdCliente}`, config)
        .then(function(response) {
          dispatch({
            type: BUSCA_DETALHES_CLIENTE,
            payload: response.data,
          });
        });
    } catch (error) {
      if (error.response.status === 400) {
        validaDetalhesCliente(
          'Ops! Ocorreu um erro ao buscar os detalhes do cliente. Reabra o aplicativo e, se o erro persistir, contate o suporte.',
          dispatch,
        );
      }
      if (error.response.status === 500) {
        validaDetalhesCliente(
          'Ops! Ocorreu um erro no servidor ao buscar os detalhes do cliente.. Por favor, tente novamente, se o erro persistir contate o suporte.',
          dispatch,
        );
      }
      if (error.response.status === 401) {
        Actions.formLogin();
      }
    }
  };
};

const validaDetalhesCliente = (msg, dispatch) => {
  dispatch({
    type: VALIDA_DETALHES_CLIENTE,
    payload: msg,
  });
};

export const enviaCodigoCliente = codigo => {
  return {
    type: ENVIA_CODIGO_CLIENTE,
    payload: codigo,
  };
};

export const filtraListaClientes = (token, search, skip, top) => {
  return async dispatch => {
    try {
      const config = {
        headers: {
          Authorization: token,
        },
      };
      await api
        .get(
          `/clientes?$orderby=Codigo&$filter=contains(toUpper(Nome),toUpper('${search}'))&$skip=${skip}&$top=${top}`,
          config,
        )
        .then(function(response) {
          dispatch({
            type: BUSCA_LISTA_CLIENTES,
            payload: response.data,
          });
        });
    } catch (error) {
      if (error.response.status === 400) {
        validaListaClientes(
          'Ops! Ocorreu um erro ao buscar os clientes. Reabra o aplicativo e, se o erro persistir, contate o suporte.',
          dispatch,
        );
      }
      if (error.response.status === 500) {
        validaListaClientes(
          'Ops! Ocorreu um erro no servidor ao buscar os clientes.. Por favor, tente novamente, se o erro persistir contate o suporte.',
          dispatch,
        );
      }
      if (error.response.status === 401) {
        Actions.formLogin();
      }
    }
  };
};

export const alteraSkip = value => {
  return {
    type: ALTERA_SKIP,
    payload: value,
  };
};

export const alteraDataLoad = data => {
  return {
    type: ALTERA_DATA_LOAD,
    payload: data,
  };
};

export const mostraPesquisarClientes = value => {
  return {
    type: MOSTRA_PESQUISAR_CLIENTES,
    payload: value,
  };
};

export const modificaSearchCliente = text => {
  return {
    type: MODIFICA_SEARCH_CLIENTE,
    payload: text,
  };
};

export const isLoadingClientes = text => {
  return {
    type: IS_LOADING_CLIENTES,
    payload: text,
  };
};

export const mostrarIconeFiltroClientes = payload => {
  return {
    type: MOSTRAR_ICONE_FILTRO_CLIENTES,
    payload: payload,
  };
};
