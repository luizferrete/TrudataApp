import {
  BUSCA_LISTA_CONTATOS,
  BUSCA_DETALHES_CONTATO,
  ENVIA_CODIGO_CONTATO,
  SET_MODAL_FILTRO_VISIBLE,
  BUSCA_TIPOS_CONTATOS,
  ALTERA_TIPO_CONTATO_SELECIONADO,
  MODIFICA_DESCRICAO_CONTATO,
  BUSCA_EMPRESAS,
  ALTERA_EMPRESA_SELECIONADA,
  BUSCA_LOCAIS,
  ALTERA_LOCAL_SELECIONADO,
  SELECIONA_CLIENTE,
  SELECIONA_DATA_CONTATO,
  MOSTRAR_CALENDARIO,
  SELECIONA_PRAZO_ATENDIMENTO,
  MOSTRAR_CALENDARIO_PRAZO,
  MODIFICA_RESPONSAVEL,
  BUSCA_ORIGEM,
  ALTERA_ORIGEM_SELECIONADA,
  BUSCA_STATUS,
  ALTERA_STATUS_SELECIONADO,
  MODIFICA_NOME_CONTATO,
  MODIFICA_FONE_CONTATO,
  MODIFICA_EMAIL_CONTATO,
  MOSTRA_BARRA_PESQUISAR,
  MODIFICA_SEARCH_SELECIONA_CLIENTE,
  ALTERA_TIPO_CONTATO_SELECIONADO_FILTRO,
  ALTERA_SKIP_CONTATO,
  ALTERA_DATA_LOAD_CONTATO,
  IS_LOADING_CONTATOS,
  IS_MAX_REACHED_CONTATOS,
  BUSCA_ESTADOS,
  ALTERA_ESTADO_SELECIONADO,
  BUSCA_LISTA_CIDADES,
  ALTERA_SKIP_CIDADE,
  ALTERA_DATA_LOAD_CIDADE,
  MODIFICA_SEARCH_SELECIONA_CIDADE,
  SELECIONA_CIDADE,
  MOSTRA_BARRA_PESQUISAR_CIDADE,
  VALIDACAO_DESCRICAO,
  VALIDACAO_PRAZO_ATENDIMENTO,
  MSG_VALIDACAO_POST_CONTATOS,
  VALIDA_CD_CLIENTE,
  VALIDA_CD_CIDADE,
  VALIDA_NOME_CONTATO,
  CONTATO_SALVO,
  VALIDA_LISTA_CIDADES,
  VALIDA_LISTA_ESTADOS,
  VALIDA_LISTA_STATUS,
  VALIDA_LISTA_ORIGEM,
  VALIDA_LISTA_EMPRESA,
  VALIDA_TIPOS_CONTATO,
  VALIDA_DETALHES_CONTATO,
  VALIDA_LISTA_CONTATO,
  MOSTRAR_ICONE_FILTRO_CONTATOS,
} from './types';
import api from '../services/api';
import {Actions} from 'react-native-router-flux';

export const buscaListaContatos = (token, cdAssunto, skip, top) => {
  return async dispatch => {
    try {
      const config = {
        headers: {
          Authorization: token,
        },
      };
      console.log(cdAssunto);
      if (cdAssunto > 0) {
        var req = `/contatos/list?$orderby=Codigo&$filter=CdTipoContato eq ${cdAssunto}&$skip=${skip}&$top=${top}`;
        await api.get(req, config).then(function(response) {
          console.log('response.data');
          console.log(response.data);
          dispatch({
            type: BUSCA_LISTA_CONTATOS,
            payload: response.data,
          });
        });
      } else {
        var req = `/contatos/list?$orderby=Codigo&$skip=${skip}&$top=${top}`;
        await api.get(req, config).then(function(response) {
          dispatch({
            type: BUSCA_LISTA_CONTATOS,
            payload: response.data,
          });
        });
      }
    } catch (error) {
      if (error.response.status === 400) {
        validaListaContato(
          'Ops! Ocorreu um erro ao buscar os contatos. Reabra o aplicativo e, se o erro persistir, contate o suporte.',
          dispatch,
        );
      }
      if (error.response.status === 500) {
        validaListaContato(
          'Ops! Ocorreu um erro no servidor ao buscar os contatos.. Por favor, tente novamente, se o erro persistir contate o suporte.',
          dispatch,
        );
      }
      if (error.response.status === 401) {
        Actions.formLogin();
      }
    }
  };
};

const validaListaContato = (msg, dispatch) => {
  dispatch({
    type: VALIDA_LISTA_CONTATO,
    payload: msg,
  });
};

export const buscaDetalhesContato = (token, cdContato) => {
  return async dispatch => {
    try {
      const config = {
        headers: {
          Authorization: token,
        },
      };
      await api
        .get(`contatos/detail/${cdContato}`, config)
        .then(function(response) {
          dispatch({
            type: BUSCA_DETALHES_CONTATO,
            payload: response.data,
          });
        });
    } catch (error) {
      if (error.response.status === 400) {
        validaDetalhesContato(
          'Ops! Ocorreu um erro ao buscar os detalhes do contato. Reabra o aplicativo e, se o erro persistir, contate o suporte.',
          dispatch,
        );
      }
      if (error.response.status === 500) {
        validaDetalhesContato(
          'Ops! Ocorreu um erro no servidor ao buscar os detalhes do contato.. Por favor, tente novamente, se o erro persistir contate o suporte.',
          dispatch,
        );
      }
      if (error.response.status === 401) {
        Actions.formLogin();
      }
    }
  };
};

const validaDetalhesContato = (msg, dispatch) => {
  dispatch({
    type: VALIDA_DETALHES_CONTATO,
    payload: msg,
  });
};

export const enviaCodigoContato = codigo => {
  return {
    type: ENVIA_CODIGO_CONTATO,
    payload: codigo,
  };
};

export const setModalFiltroVisible = status => {
  return {
    type: SET_MODAL_FILTRO_VISIBLE,
    payload: status,
  };
};

export const buscaTiposContato = token => {
  return async dispatch => {
    try {
      const config = {
        headers: {
          Authorization: token,
        },
      };
      await api.get('/contatos/tipos', config).then(function(response) {
        dispatch({
          type: BUSCA_TIPOS_CONTATOS,
          payload: response.data.listaTipos,
        });
      });
    } catch (error) {
      if (error.response.status === 400) {
        validaTiposContato(
          'Ops! Ocorreu um erro ao buscar os tipos de contato. Reabra o aplicativo e, se o erro persistir, contate o suporte.',
          dispatch,
        );
      }
      if (error.response.status === 500) {
        validaTiposContato(
          'Ops! Ocorreu um erro no servidor ao buscar os tipos de contato.. Por favor, tente novamente, se o erro persistir contate o suporte.',
          dispatch,
        );
      }
      if (error.response.status === 401) {
        Actions.formLogin();
      }
    }
  };
};

const validaTiposContato = (msg, dispatch) => {
  dispatch({
    type: VALIDA_TIPOS_CONTATO,
    payload: msg,
  });
};

export const alteraTipoContatoSelecionado = ctt => {
  return {
    type: ALTERA_TIPO_CONTATO_SELECIONADO,
    payload: ctt,
  };
};

export const modificaDescricao = text => {
  return {
    type: MODIFICA_DESCRICAO_CONTATO,
    payload: text,
  };
};

export const buscaEmpresas = token => {
  return async dispatch => {
    try {
      const config = {
        headers: {
          Authorization: token,
        },
      };
      await api.get('/empresas', config).then(function(response) {
        dispatch({
          type: BUSCA_EMPRESAS,
          payload: response.data.listaEmpresas,
        });
      });
    } catch (error) {
      if (error.response.status === 400) {
        validaListaEmpresas(
          'Ops! Ocorreu um erro ao buscar a lista de empresas. Reabra o aplicativo e, se o erro persistir, contate o suporte.',
          dispatch,
        );
      }
      if (error.response.status === 500) {
        validaListaEmpresas(
          'Ops! Ocorreu um erro no servidor ao buscar a lista de empresas.. Por favor, tente novamente, se o erro persistir contate o suporte.',
          dispatch,
        );
      }
      if (error.response.status === 401) {
        Actions.formLogin();
      }
    }
  };
};

const validaListaEmpresas = (msg, dispatch) => {
  dispatch({
    type: VALIDA_LISTA_EMPRESA,
    payload: msg,
  });
};

export const alteraEmpresaSelecionada = emp => {
  return {
    type: ALTERA_EMPRESA_SELECIONADA,
    payload: emp,
  };
};

export const buscaLocais = (idEmpresa, arrayEmpresas) => {
  return dispatch => {
    try {
      arrayEmpresas.map((item, i) => {
        if (item.value === idEmpresa) {
          dispatch({
            type: BUSCA_LOCAIS,
            payload: item.Locais,
          });
        }
      });
    } catch (error) {
      dispatch({
        type: BUSCA_LOCAIS,
        payload: null,
      });
    }
  };
};

export const alteraLocalSelecionado = loc => {
  return {
    type: ALTERA_LOCAL_SELECIONADO,
    payload: loc,
  };
};

export const selecionaCliente = (cod, nome) => {
  return {
    type: SELECIONA_CLIENTE,
    payload: {cod, nome},
  };
};

export const selecionaDataContato = date => {
  return {
    type: SELECIONA_DATA_CONTATO,
    payload: date,
  };
};

export const mostrarCalendario = show => {
  return {
    type: MOSTRAR_CALENDARIO,
    payload: show,
  };
};

export const selecionaPrazoAtendimento = date => {
  return {
    type: SELECIONA_PRAZO_ATENDIMENTO,
    payload: date,
  };
};

export const mostrarCalendarioPrazo = show => {
  return {
    type: MOSTRAR_CALENDARIO_PRAZO,
    payload: show,
  };
};

export const modificaResponsavel = txt => {
  return {
    type: MODIFICA_RESPONSAVEL,
    payload: txt,
  };
};

export const buscaOrigem = token => {
  return async dispatch => {
    try {
      const config = {
        headers: {
          Authorization: token,
        },
      };
      await api.get('/contatos/origem', config).then(function(response) {
        dispatch({
          type: BUSCA_ORIGEM,
          payload: response.data.listaOrigens,
        });
      });
    } catch (error) {
      if (error.response.status === 400) {
        validaListaOrigem(
          'Ops! Ocorreu um erro ao buscar a lista de origens. Reabra o aplicativo e, se o erro persistir, contate o suporte.',
          dispatch,
        );
      }
      if (error.response.status === 500) {
        validaListaOrigem(
          'Ops! Ocorreu um erro no servidor ao buscar a lista de origens.. Por favor, tente novamente, se o erro persistir contate o suporte.',
          dispatch,
        );
      }
      if (error.response.status === 401) {
        Actions.formLogin();
      }
    }
  };
};

const validaListaOrigem = (msg, dispatch) => {
  dispatch({
    type: VALIDA_LISTA_ORIGEM,
    payload: msg,
  });
};

export const alteraOrigemSelecionada = org => {
  return {
    type: ALTERA_ORIGEM_SELECIONADA,
    payload: org,
  };
};

export const buscaStatus = token => {
  return async dispatch => {
    try {
      const config = {
        headers: {
          Authorization: token,
        },
      };
      await api.get('/contatos/status', config).then(function(response) {
        dispatch({
          type: BUSCA_STATUS,
          payload: response.data.listaStatus,
        });
      });
    } catch (error) {
      if (error.response.status === 400) {
        validaListaStatus(
          'Ops! Ocorreu um erro ao buscar os status. Reabra o aplicativo e, se o erro persistir, contate o suporte.',
          dispatch,
        );
      }
      if (error.response.status === 500) {
        validaListaStatus(
          'Ops! Ocorreu um erro no servidor ao buscar os status.. Por favor, tente novamente, se o erro persistir contate o suporte.',
          dispatch,
        );
      }
      if (error.response.status === 401) {
        Actions.formLogin();
      }
    }
  };
};

const validaListaStatus = (msg, dispatch) => {
  dispatch({
    type: VALIDA_LISTA_STATUS,
    payload: msg,
  });
};

export const alteraStatusSelecionado = org => {
  return {
    type: ALTERA_STATUS_SELECIONADO,
    payload: org,
  };
};

export const modificaNomeContato = nome => {
  return {
    type: MODIFICA_NOME_CONTATO,
    payload: nome,
  };
};

export const modificaTelefoneContato = tel => {
  return {
    type: MODIFICA_FONE_CONTATO,
    payload: tel,
  };
};

export const modificaEmailContato = email => {
  return {
    type: MODIFICA_EMAIL_CONTATO,
    payload: email,
  };
};

export const mostraBarraPesquisar = mostra => {
  return {
    type: MOSTRA_BARRA_PESQUISAR,
    payload: mostra,
  };
};

export const modificaSearchSelecionaCliente = text => {
  return {
    type: MODIFICA_SEARCH_SELECIONA_CLIENTE,
    payload: text,
  };
};

export const alteraTipoContatoSelecionadoFiltro = ctt => {
  return {
    type: ALTERA_TIPO_CONTATO_SELECIONADO_FILTRO,
    payload: ctt,
  };
};

export const alteraSkipContato = value => {
  return {
    type: ALTERA_SKIP_CONTATO,
    payload: value,
  };
};

export const alteraDataLoadContato = data => {
  return {
    type: ALTERA_DATA_LOAD_CONTATO,
    payload: data,
  };
};

export const isLoadingContatos = value => {
  return {
    type: IS_LOADING_CONTATOS,
    payload: value,
  };
};

export const isMaxReachedContatos = value => {
  return {
    type: IS_MAX_REACHED_CONTATOS,
    payload: value,
  };
};

export const buscaEstados = token => {
  return async dispatch => {
    try {
      const config = {
        headers: {
          Authorization: token,
        },
      };
      await api.get('/cidades/estados', config).then(function(response) {
        dispatch({
          type: BUSCA_ESTADOS,
          payload: response.data,
        });
      });
    } catch (error) {
      if (error.response.status === 400) {
        validaListaEstados(
          'Ops! Ocorreu um erro ao buscar os estados. Reabra o aplicativo e, se o erro persistir, contate o suporte.',
          dispatch,
        );
      }
      if (error.response.status === 500) {
        validaListaEstados(
          'Ops! Ocorreu um erro ao buscar os estados. Por favor, tente novamente, se o erro persistir contate o suporte.',
          dispatch,
        );
      }
      if (error.response.status === 401) {
        Actions.formLogin();
      }
    }
  };
};

const validaListaEstados = (msg, dispatch) => {
  dispatch({
    type: VALIDA_LISTA_ESTADOS,
    payload: msg,
  });
};

export const alteraEstadoSelecionado = est => {
  return {
    type: ALTERA_ESTADO_SELECIONADO,
    payload: est,
  };
};

export const buscaListaCidades = (token, cdEstado, searchTerm, skip, top) => {
  return async dispatch => {
    try {
      const config = {
        headers: {
          Authorization: token,
        },
      };
      await api
        .get(
          `/cidades/${cdEstado}?$orderby=Codigo&$filter=contains(toUpper(NomeNormalized),toUpper('${searchTerm}'))&$skip=${skip}&$top=${top}`,
          config,
        )
        .then(function(response) {
          dispatch({
            type: BUSCA_LISTA_CIDADES,
            payload: response.data,
          });
        });
    } catch (error) {
      if (error.response.status === 400) {
        validaListaCidades(
          'Ops! Ocorreu um erro ao buscar as cidades. Tente novamente e, se o erro persistir, contate o suporte.',
          dispatch,
        );
      }
      if (error.response.status === 500) {
        validaListaCidades(
          'Ops! Ocorreu um erro no servidor ao buscar as cidades.. Por favor, tente novamente, se o erro persistir contate o suporte.',
          dispatch,
        );
      }
      if (error.response.status === 401) {
        Actions.formLogin();
      }
    }
  };
};

const validaListaCidades = (msg, dispatch) => {
  dispatch({
    type: VALIDA_LISTA_CIDADES,
    payload: msg,
  });
};

export const alteraSkipCidade = value => {
  return {
    type: ALTERA_SKIP_CIDADE,
    payload: value,
  };
};

export const alteraDataLoadCidade = data => {
  return {
    type: ALTERA_DATA_LOAD_CIDADE,
    payload: data,
  };
};

export const mostraBarraPesquisarCidade = mostra => {
  return {
    type: MOSTRA_BARRA_PESQUISAR_CIDADE,
    payload: mostra,
  };
};

export const modificaSearchSelecionaCidade = text => {
  return {
    type: MODIFICA_SEARCH_SELECIONA_CIDADE,
    payload: text,
  };
};

export const selecionaCidade = (cod, nome) => {
  return {
    type: SELECIONA_CIDADE,
    payload: {cod, nome},
  };
};

const validaDescricao = (msg, dispatch) => {
  dispatch({
    type: VALIDACAO_DESCRICAO,
    payload: msg,
  });
};

const validaPrazoAtendimento = (msg, dispatch) => {
  dispatch({
    type: VALIDACAO_PRAZO_ATENDIMENTO,
    payload: msg,
  });
};

const validaPostContatos = (msg, dispatch) => {
  dispatch({
    type: MSG_VALIDACAO_POST_CONTATOS,
    payload: msg,
  });
};

const validaCdCliente = (msg, dispatch) => {
  dispatch({
    type: VALIDA_CD_CLIENTE,
    payload: msg,
  });
};

const validaCdCidade = (msg, dispatch) => {
  dispatch({
    type: VALIDA_CD_CIDADE,
    payload: msg,
  });
};

const validaNomeContato = (msg, dispatch) => {
  dispatch({
    type: VALIDA_NOME_CONTATO,
    payload: msg,
  });
};

export const salvarContatoComCliente = (
  token,
  idTipoContato,
  idEmpresa,
  idLocal,
  idCliente,
  descricao,
  dataContato,
  prazoAtendimento,
  responsavel,
  idOrigem,
  idStatus,
) => {
  return async dispatch => {
    try {
      const contato = {
        CdTipoContato: idTipoContato,
        CdEmpresa: idEmpresa,
        CdLocal: idLocal,
        CdCliente: idCliente,
        Descricao: descricao,
        DataContato: dataContato,
        PrazoAtendimento: prazoAtendimento,
        Responsavel: responsavel,
        CdOrigemContato: idOrigem,
        CdStatus: idStatus,
      };
      const config = {
        headers: {
          Authorization: token,
        },
      };
      var erroEncontrado = false;
      if (contato.Descricao === '') {
        erroEncontrado = true;
        validaDescricao('Uma descrição deve ser informada.', dispatch);
      }
      var hoje = new Date();
      if (contato.PrazoAtendimento != null && contato.PrazoAtendimento < hoje) {
        erroEncontrado = true;
        validaPrazoAtendimento(
          'O prazo de atendimento deve estar no futuro.',
          dispatch,
        );
      }
      if (contato.CdCliente === null) {
        erroEncontrado = true;
        validaCdCliente('Selecione um cliente.', dispatch);
      }
      if (!erroEncontrado) {
        await api.post('/contatos', contato, config).then(function(response) {
          if (response.status === 200) {
            dispatch({
              type: CONTATO_SALVO,
              payload: true,
            });
            Actions.listaContatos();
          }
        });
      }
    } catch (error) {
      if (error.response.status === 400) {
        validaPostContatos(
          'Ops! Ocorreu um erro, verifique as informações e tente novamente. Se o erro persistir, contate o suporte.',
          dispatch,
        );
      }
      if (error.response.status === 500) {
        validaPostContatos(
          'Ops! Ocorreu um erro com o servidor. Por favor, tente novamente, se o erro persistir contate o suporte.',
          dispatch,
        );
      }
      if (error.response.status === 401) {
        Actions.formLogin();
      }
    }
  };
};

export const salvarContatoSemCliente = (
  token,
  idTipoContato,
  idEmpresa,
  idLocal,
  descricao,
  dataContato,
  prazoAtendimento,
  responsavel,
  idOrigem,
  idStatus,
  nomeContato,
  idCidade,
  telefone,
  email,
) => {
  return async dispatch => {
    try {
      const contato = {
        CdTipoContato: idTipoContato,
        CdEmpresa: idEmpresa,
        CdLocal: idLocal,
        Descricao: descricao,
        DataContato: dataContato,
        PrazoAtendimento: prazoAtendimento,
        Responsavel: responsavel,
        CdOrigemContato: idOrigem,
        CdStatus: idStatus,
        NomeContato: nomeContato,
        CdCidade: idCidade,
        Fone: telefone,
        Email: email,
      };
      const config = {
        headers: {
          Authorization: token,
        },
      };
      var erroEncontrado = false;
      if (contato.Descricao === '') {
        erroEncontrado = true;
        validaDescricao('Uma descrição deve ser informada.', dispatch);
      }
      var hoje = new Date();
      if (contato.PrazoAtendimento != null && contato.PrazoAtendimento < hoje) {
        erroEncontrado = true;
        validaPrazoAtendimento(
          'O prazo de atendimento deve estar no futuro.',
          dispatch,
        );
      }
      if (contato.CdCidade === null) {
        erroEncontrado = true;
        validaCdCidade('Selecione uma cidade.', dispatch);
      }
      if (contato.NomeContato === '') {
        erroEncontrado = true;
        validaNomeContato('O nome do contato deve ser informado.', dispatch);
      }
      if (!erroEncontrado) {
        await api
          .post('/contatos/semcliente', contato, config)
          .then(function(response) {
            if (response.status === 200) {
              dispatch({
                type: CONTATO_SALVO,
                payload: true,
              });
              Actions.listaContatos();
            }
          });
      }
    } catch (error) {
      if (error.response.status === 400) {
        validaPostContatos(
          'Ops! Ocorreu um erro, verifique as informações e tente novamente. Se o erro persistir, contate o suporte.',
          dispatch,
        );
      }
      if (error.response.status === 500) {
        validaPostContatos(
          'Ops! Ocorreu um erro com o servidor. Por favor, tente novamente, se o erro persistir contate o suporte.',
          dispatch,
        );
      }
      if (error.response.status === 401) {
        Actions.formLogin();
      }
    }
  };
};

export const mostrarIconeFiltroContatos = payload => {
  return {
    type: MOSTRAR_ICONE_FILTRO_CONTATOS,
    payload: payload,
  };
};
