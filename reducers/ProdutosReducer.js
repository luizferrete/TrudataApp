import {
  BUSCA_LISTA_PRODUTOS,
  BUSCA_DETALHES_PRODUTOS,
  ENVIA_CODIGO_PRODUTO,
  ENVIA_CODIGO_PRODUTO_CLIENTE,
  ALTERA_SKIP_PRODUTOS,
  ALTERA_DATA_LOAD_PRODUTOS,
  MOSTRA_PESQUISAR_PRODUTOS,
  MODIFICA_SEARCH_PRODUTO,
  VALIDA_LISTA_PRODUTO,
  VALIDA_DETALHES_PRODUTO,
  IS_LOADING_PRODUTOS,
  MOSTRAR_ICONE_FILTRO_PRODUTOS,
  ALTERA_FILTRO_PRODUTO_SELECIONADO,
} from '../actions/types';

const INITIAL_STATE = {
  listaProdutos: [],
  detalhesDoProduto: [],
  cdProduto: null,
  mostraPesquisar: false,
  textoSearch: '',
  filtroIconeProdutos: false,
  idLocalSelecionado: null,
  codigoCliente: null,

  //filtro
  valueFiltroProdutoSelecionado: 1,
  labelFiltroProdutoSelecionado: null,

  skip: 0,
  data: [],
  loading: 'N',

  //validacoes
  validacaoListaProduto: '',
  validacaoDetalhesProduto: '',
};

export default (state = INITIAL_STATE, action) => {
  console.log(action);
  switch (action.type) {
    case BUSCA_LISTA_PRODUTOS:
      return {
        ...state,
        listaProdutos: action.payload,
        validacaoListaProduto: '',
        loading: 'N',
      };
    case BUSCA_DETALHES_PRODUTOS:
      return {
        ...state,
        detalhesDoProduto: action.payload,
        validacaoDetalhesProduto: '',
      };
    case ENVIA_CODIGO_PRODUTO:
      return {...state, cdProduto: action.payload};
    case ENVIA_CODIGO_PRODUTO_CLIENTE:
      return {...state, codigoCliente: action.payload};
    case ALTERA_SKIP_PRODUTOS:
      return {...state, skip: action.payload};
    case ALTERA_DATA_LOAD_PRODUTOS:
      return {...state, data: action.payload};
    case MOSTRA_PESQUISAR_PRODUTOS:
      return {...state, mostraPesquisar: action.payload};
    case MODIFICA_SEARCH_PRODUTO:
      return {...state, textoSearch: action.payload};
    case VALIDA_LISTA_PRODUTO:
      return {...state, validacaoListaProduto: action.payload};
    case VALIDA_DETALHES_PRODUTO:
      return {...state, validacaoDetalhesProduto: action.payload};
    case IS_LOADING_PRODUTOS:
      return {...state, loading: action.payload};
    case MOSTRAR_ICONE_FILTRO_PRODUTOS:
      return {...state, filtroIconeProdutos: action.payload};
    case ALTERA_FILTRO_PRODUTO_SELECIONADO:
      return {
        ...state,
        labelFiltroProdutoSelecionado: action.payload.label,
        valueFiltroProdutoSelecionado: action.payload.value,
      };
    default:
      return state;
  }
};
