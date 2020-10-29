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
  SET_MODAL_FILTRO_PRODUTOS_VISIBLE,
  BUSCA_MARCAS,
  VALIDA_MARCAS,
  ALTERA_MARCA_SELECIONADA,
  BUSCA_TAMANHOS,
  ALTERA_TAMANHO_SELECIONADO,
  VALIDA_TAMANHOS,
  BUSCA_CORES,
  ALTERA_COR_SELECIONADA,
  VALIDA_CORES,
  BUSCA_GRUPOS,
  ALTERA_GRUPO_SELECIONADO,
  VALIDA_GRUPOS,
  BUSCA_SUBGRUPOS,
  ALTERA_SUBGRUPO_SELECIONADO,
  ALTERA_PESQUISA_ATIVA,
  IS_FILTRO_ATIVO,
} from './types';
import api from '../services/api';
import {Actions} from 'react-native-router-flux';

export const buscaListaProdutos = (
  token,
  search,
  skip,
  top,
  filtroProduto,
  cdMarca,
  cdTamanho,
  cdCor,
  cdSubgrupo,
) => {
  return async dispatch => {
    var link =
      search === ''
        ? `/produtos/filtro?$orderby=Codigo&$filter=contains(toUpper(Descricao),toUpper('${search}'))&$skip=${skip}&$top=${top}`
        : filtroProduto === 0
        ? `/produtos/filtro?$orderby=Codigo&$filter=contains(toUpper(Descricao),toUpper('${search}'))&$skip=${skip}&$top=${top}`
        : `/produtos/filtro?$orderby=Codigo&$filter=CodigoCliente eq '${search}'&$skip=${skip}&$top=${top}`;
    try {
      const filtros = {
        CdMarca: cdMarca,
        CdSubGrupo: cdSubgrupo,
        CdTamanho: cdTamanho,
        CdCor: cdCor,
      };
      const config = {
        headers: {
          Authorization: token,
        },
      };
      //Gambi temporária - utilizando POST onde deveria ser GET devido a não poder utilizar JSON no corpo de um GET.
      await api.post(link, filtros, config).then(function(response) {
        dispatch({
          type: BUSCA_LISTA_PRODUTOS,
          payload: response.data,
        });
      });
    } catch (error) {
      console.log(error);
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

export const setModalFiltroProdutosVisible = status => {
  return {
    type: SET_MODAL_FILTRO_PRODUTOS_VISIBLE,
    payload: status,
  };
};

export const buscaMarcas = token => {
  return async dispatch => {
    try {
      const config = {
        headers: {
          Authorization: token,
        },
      };
      await api.get('marcas', config).then(function(response) {
        dispatch({
          type: BUSCA_MARCAS,
          payload: response.data.listaMarcas,
        });
      });
    } catch (error) {
      if (error.response.status === 400) {
        validaMarcas(
          'Ops! Ocorreu um erro ao buscar as marcas. Reabra o aplicativo e, se o erro persistir, contate o suporte.',
          dispatch,
        );
      }
      if (error.response.status === 500) {
        validaMarcas(
          'Ops! Ocorreu um erro no servidor ao buscar as marcas.. Por favor, tente novamente, se o erro persistir contate o suporte.',
          dispatch,
        );
      }
      if (error.response.status === 401) {
        Actions.formLogin();
      }
    }
  };
};

const validaMarcas = (msg, dispatch) => {
  dispatch({
    type: VALIDA_MARCAS,
    payload: msg,
  });
};

export const alteraMarcaSelecionada = (cdMarca, listaMarcas) => {
  var label = 'Selecione uma marca...';
  if (listaMarcas != null) {
    listaMarcas.map((obj, i) => {
      if (obj.value === cdMarca) {
        label = obj.label;
      }
    });
  }
  return {
    type: ALTERA_MARCA_SELECIONADA,
    payload: {codigo: cdMarca, label: label},
  };
};

export const buscaTamanhos = token => {
  return async dispatch => {
    try {
      const config = {
        headers: {
          Authorization: token,
        },
      };
      await api.get('tamanhos', config).then(function(response) {
        dispatch({
          type: BUSCA_TAMANHOS,
          payload: response.data.listaTamanhos,
        });
      });
    } catch (error) {
      if (error.response.status === 400) {
        validaTamanhos(
          'Ops! Ocorreu um erro ao buscar os tamanhos. Reabra o aplicativo e, se o erro persistir, contate o suporte.',
          dispatch,
        );
      }
      if (error.response.status === 500) {
        validaTamanhos(
          'Ops! Ocorreu um erro no servidor ao buscar os tamanhos.. Por favor, tente novamente, se o erro persistir contate o suporte.',
          dispatch,
        );
      }
      if (error.response.status === 401) {
        Actions.formLogin();
      }
    }
  };
};

const validaTamanhos = (msg, dispatch) => {
  dispatch({
    type: VALIDA_TAMANHOS,
    payload: msg,
  });
};

export const alteraTamanhoSelecionado = (cdTamanho, listaTamanhos) => {
  var label = 'Selecione um tamanho...';
  if (listaTamanhos != null) {
    listaTamanhos.map((obj, i) => {
      if (obj.value === cdTamanho) {
        label = obj.label;
      }
    });
  }
  return {
    type: ALTERA_TAMANHO_SELECIONADO,
    payload: {codigo: cdTamanho, label: label},
  };
};

export const buscaCores = token => {
  return async dispatch => {
    try {
      const config = {
        headers: {
          Authorization: token,
        },
      };
      await api.get('cores', config).then(function(response) {
        dispatch({
          type: BUSCA_CORES,
          payload: response.data.listaCores,
        });
      });
    } catch (error) {
      if (error.response.status === 400) {
        validaCores(
          'Ops! Ocorreu um erro ao buscar as cores. Reabra o aplicativo e, se o erro persistir, contate o suporte.',
          dispatch,
        );
      }
      if (error.response.status === 500) {
        validaCores(
          'Ops! Ocorreu um erro no servidor ao buscar as cores.. Por favor, tente novamente, se o erro persistir contate o suporte.',
          dispatch,
        );
      }
      if (error.response.status === 401) {
        Actions.formLogin();
      }
    }
  };
};

const validaCores = (msg, dispatch) => {
  dispatch({
    type: VALIDA_CORES,
    payload: msg,
  });
};

export const alteraCorSelecionada = (cdCor, listaCores) => {
  var label = 'Selecione um tamanho...';
  if (listaCores != null) {
    listaCores.map((obj, i) => {
      if (obj.value === cdCor) {
        label = obj.label;
      }
    });
  }
  return {
    type: ALTERA_COR_SELECIONADA,
    payload: {codigo: cdCor, label: label},
  };
};

export const buscaGrupos = token => {
  return async dispatch => {
    try {
      const config = {
        headers: {
          Authorization: token,
        },
      };
      await api.get('grupos', config).then(function(response) {
        dispatch({
          type: BUSCA_GRUPOS,
          payload: response.data.listaGrupos,
        });
      });
    } catch (error) {
      if (error.response.status === 400) {
        validaGrupos(
          'Ops! Ocorreu um erro ao buscar os grupos. Reabra o aplicativo e, se o erro persistir, contate o suporte.',
          dispatch,
        );
      }
      if (error.response.status === 500) {
        validaGrupos(
          'Ops! Ocorreu um erro no servidor ao buscar os grupos.. Por favor, tente novamente, se o erro persistir contate o suporte.',
          dispatch,
        );
      }
      if (error.response.status === 401) {
        Actions.formLogin();
      }
    }
  };
};

const validaGrupos = (msg, dispatch) => {
  dispatch({
    type: VALIDA_GRUPOS,
    payload: msg,
  });
};

export const alteraGrupoSelecionado = grupo => {
  return {
    type: ALTERA_GRUPO_SELECIONADO,
    payload: grupo,
  };
};

export const buscaSubgrupos = (idGrupo, arrayGrupos) => {
  return dispatch => {
    try {
      arrayGrupos.map((item, i) => {
        if (item.value === idGrupo) {
          dispatch({
            type: BUSCA_SUBGRUPOS,
            payload: item.SubGrupos,
          });
        }
      });
    } catch (error) {
      dispatch({
        type: BUSCA_SUBGRUPOS,
        payload: null,
      });
    }
  };
};

export const alteraSubgrupoSelecionado = (cdSub, listaGrupos) => {
  var label = 'Selecione um subgrupo...';
  if (listaGrupos != null) {
    listaGrupos.map((obj, i) => {
      obj.SubGrupos.map((item, j) => {
        if (item.value === cdSub) {
          label = `${obj.label} - ${item.label}`;
        }
      });
    });
  }
  return {
    type: ALTERA_SUBGRUPO_SELECIONADO,
    payload: {codigo: cdSub, label: label},
  };
};

export const alteraPesquisaAtiva = ativo => {
  return {
    type: ALTERA_PESQUISA_ATIVA,
    payload: ativo,
  };
};

export const isFiltroAtivo = ativo => {
  return {
    type: IS_FILTRO_ATIVO,
    payload: ativo,
  };
};
