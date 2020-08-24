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
} from '../actions/types';

const INITIAL_STATE = {
  listaClientes: [],
  detalhesDoCliente: [],
  cdCliente: null,
  mostraPesquisar: false,
  textoSearch: '',
  filtroIconeClientes: false,

  skip: 0,
  data: [],
  loading: 'N',

  //validacoes
  validacaoListaClientes: '',
  validacaoDetalhesCliente: '',
};

export default (state = INITIAL_STATE, action) => {
  console.log(action);
  switch (action.type) {
    case BUSCA_LISTA_CLIENTES:
      return {
        ...state,
        listaClientes: action.payload,
        validacaoListaClientes: '',
        loading: 'N',
      };
    case BUSCA_DETALHES_CLIENTE:
      return {
        ...state,
        detalhesDoCliente: action.payload,
        validacaoDetalhesCliente: '',
      };
    case ENVIA_CODIGO_CLIENTE:
      return {...state, cdCliente: action.payload};
    case ALTERA_SKIP:
      return {...state, skip: action.payload};
    case ALTERA_DATA_LOAD:
      return {...state, data: action.payload};
    case MOSTRA_PESQUISAR_CLIENTES:
      return {...state, mostraPesquisar: action.payload};
    case MODIFICA_SEARCH_CLIENTE:
      return {...state, textoSearch: action.payload};
    case VALIDA_LISTA_CLIENTES:
      return {...state, validacaoListaClientes: action.payload};
    case VALIDA_DETALHES_CLIENTE:
      return {...state, validacaoDetalhesCliente: action.payload};
    case IS_LOADING_CLIENTES:
      return {...state, loading: action.payload};
    case MOSTRAR_ICONE_FILTRO_CLIENTES:
      return {...state, filtroIconeClientes: action.payload};
    default:
      return state;
  }
};
