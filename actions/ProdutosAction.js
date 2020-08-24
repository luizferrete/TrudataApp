import {
  BUSCA_LISTA_PRODUTOS,
  BUSCA_DETALHES_PRODUTOS,
  ENVIA_CODIGO_PRODUTO,
  ALTERA_SKIP_PRODUTOS,
  ALTERA_DATA_LOAD_PRODUTOS,
  MOSTRA_PESQUISAR_PRODUTOS,
  MODIFICA_SEARCH_PRODUTO,
  VALIDA_LISTA_PRODUTO,
  VALIDA_DETALHES_PRODUTO,
  IS_LOADING_PRODUTOS,
  MOSTRAR_ICONE_FILTRO_PRODUTOS,
  ALTERA_FILTRO_PRODUTO_SELECIONADO,
  ENVIA_CODIGO_PRODUTO_CLIENTE,
} from './types';
import api from '../services/api';
import {Actions} from 'react-native-router-flux';

export const buscaListaProdutos = (token, search, skip, top, filtroProduto) => {
  return async dispatch => {
    var link =
      search === ''
        ? `/produtos?$orderby=Codigo&$filter=contains(toUpper(Descricao),toUpper('${search}'))&$skip=${skip}&$top=${top}`
        : filtroProduto === 0
        ? `/produtos?$orderby=Codigo&$filter=contains(toUpper(Descricao),toUpper('${search}'))&$skip=${skip}&$top=${top}`
        : `/produtos?$orderby=Codigo&$filter=CodigoCliente eq '${search}'&$skip=${skip}&$top=${top}`;
    try {
      const config = {
        headers: {
          Authorization: token,
        },
      };
      await api.get(link, config).then(function(response) {
        dispatch({
          type: BUSCA_LISTA_PRODUTOS,
          payload: response.data,
        });
      });
    } catch (error) {
      if (error.response.status === 400) {
        validaListaProduto(
          'Ops! Ocorreu um erro ao buscar os produtos. Reabra o aplicativo e, se o erro persistir, contate o suporte.',
          dispatch,
        );
      }
      if (error.response.status === 500) {
        validaListaProduto(
          'Ops! Ocorreu um erro no servidor ao buscar os produtos.. Por favor, tente novamente, se o erro persistir contate o suporte.',
          dispatch,
        );
      }
      if (error.response.status === 401) {
        Actions.formLogin();
      }
    }
  };
};

const validaListaProduto = (msg, dispatch) => {
  dispatch({
    type: VALIDA_LISTA_PRODUTO,
    payload: msg,
  });
};

export const buscaDetalhesProduto = (token, cdProduto) => {
  return async dispatch => {
    try {
      const config = {
        headers: {
          Authorization: token,
        },
      };
      await api
        .get(`produtos/detail/${cdProduto}`, config)
        .then(function(response) {
          dispatch({
            type: BUSCA_DETALHES_PRODUTOS,
            payload: response.data,
          });
        });
    } catch (error) {
      if (error.response.status === 400) {
        validaDetalhesProduto(
          'Ops! Ocorreu um erro ao buscar os detalhes do produto. Reabra o aplicativo e, se o erro persistir, contate o suporte.',
          dispatch,
        );
      }
      if (error.response.status === 500) {
        validaDetalhesProduto(
          'Ops! Ocorreu um erro no servidor ao buscar os detalhes do produto.. Por favor, tente novamente, se o erro persistir contate o suporte.',
          dispatch,
        );
      }
      if (error.response.status === 401) {
        Actions.formLogin();
      }
    }
  };
};

const validaDetalhesProduto = (msg, dispatch) => {
  dispatch({
    type: VALIDA_DETALHES_PRODUTO,
    payload: msg,
  });
};

export const enviaCodigoProduto = codigo => {
  return {
    type: ENVIA_CODIGO_PRODUTO,
    payload: codigo,
  };
};

export const enviaCodigoProdutoCliente = codigoCli => {
  return {
    type: ENVIA_CODIGO_PRODUTO_CLIENTE,
    payload: codigoCli,
  };
};

export const alteraSkipProdutos = value => {
  return {
    type: ALTERA_SKIP_PRODUTOS,
    payload: value,
  };
};

export const alteraDataLoadProdutos = data => {
  return {
    type: ALTERA_DATA_LOAD_PRODUTOS,
    payload: data,
  };
};

export const mostraPesquisarProdutos = value => {
  return {
    type: MOSTRA_PESQUISAR_PRODUTOS,
    payload: value,
  };
};

export const modificaSearchProduto = text => {
  return {
    type: MODIFICA_SEARCH_PRODUTO,
    payload: text,
  };
};

export const isLoadingProdutos = text => {
  return {
    type: IS_LOADING_PRODUTOS,
    payload: text,
  };
};

export const mostrarIconeFiltroProdutos = payload => {
  return {
    type: MOSTRAR_ICONE_FILTRO_PRODUTOS,
    payload: payload,
  };
};

export const alteraFiltroProdutoSelecionado = ctt => {
  return {
    type: ALTERA_FILTRO_PRODUTO_SELECIONADO,
    payload: ctt,
  };
};
