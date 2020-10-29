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
  marcas: [],
  filtroCodDescAtivo: '',
  idMarcaSelecionada: null,
  labelMarcaSelecionada: 'Selecione uma marca...',
  filtroMarcaAtivo: '',
  tamanhos: [],
  idTamanhoSelecionado: null,
  labelTamanhoSelecionado: 'Selecione um tamanho...',
  filtroTamanhoAtivo: '',
  cores: [],
  idCorSelecionada: null,
  labelCorSelecionada: 'Selecione uma cor...',
  filtroCorAtivo: '',
  grupos: [],
  idGrupoSelecionado: null,
  subgrupos: [],
  idSubgrupoSelecionado: null,
  labelSubgrupoSelecionado: 'Selecione um subgrupo...',
  filtroSubgrupoAtivo: '',
  pesquisaAtiva: false,

  //filtro
  modalFiltroProdutoVisible: false,
  valueFiltroProdutoSelecionado: 1,
  labelFiltroProdutoSelecionado: null,

  skip: 0,
  data: [],
  loading: 'N',

  //validacoes
  validacaoListaProduto: '',
  validacaoDetalhesProduto: '',
  validacaoMarcas: '',
  validacaoTamanhos: '',
  validacaoCores: '',
  validacaoGrupos: '',
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
    case SET_MODAL_FILTRO_PRODUTOS_VISIBLE:
      return {...state, modalFiltroProdutoVisible: action.payload};
    case BUSCA_MARCAS:
      return {...state, marcas: action.payload, validacaoMarcas: ''};
    case ALTERA_MARCA_SELECIONADA:
      return {
        ...state,
        idMarcaSelecionada: action.payload.codigo,
        labelMarcaSelecionada: action.payload.label,
      };
    case VALIDA_MARCAS:
      return {...state, validacaoMarcas: action.payload};
    case BUSCA_TAMANHOS:
      return {...state, tamanhos: action.payload, validacaoTamanhos: ''};
    case ALTERA_TAMANHO_SELECIONADO:
      return {
        ...state,
        idTamanhoSelecionado: action.payload.codigo,
        labelTamanhoSelecionado: action.payload.label,
      };
    case VALIDA_TAMANHOS:
      return {...state, validacaoTamanhos: action.payload};
    case BUSCA_CORES:
      return {...state, cores: action.payload, validacaoCores: ''};
    case ALTERA_COR_SELECIONADA:
      return {
        ...state,
        idCorSelecionada: action.payload.codigo,
        labelCorSelecionada: action.payload.label,
      };
    case VALIDA_CORES:
      return {...state, validacaoCores: action.payload};
    case BUSCA_GRUPOS:
      return {...state, grupos: action.payload, validacaoGrupos: ''};
    case ALTERA_GRUPO_SELECIONADO:
      return {...state, idGrupoSelecionado: action.payload};
    case VALIDA_GRUPOS:
      return {...state, validacaoGrupos: action.payload};
    case BUSCA_SUBGRUPOS:
      return {...state, subgrupos: action.payload};
    case ALTERA_SUBGRUPO_SELECIONADO:
      return {
        ...state,
        idSubgrupoSelecionado: action.payload.codigo,
        labelSubgrupoSelecionado: action.payload.label,
      };
    case ALTERA_PESQUISA_ATIVA:
      return {
        ...state,
        pesquisaAtiva: action.payload,
      };
    case IS_FILTRO_ATIVO:
      return {
        ...state,
        filtroCodDescAtivo: action.payload.codDesc,
        filtroMarcaAtivo: action.payload.marca,
        filtroCorAtivo: action.payload.cor,
        filtroTamanhoAtivo: action.payload.tamanho,
        filtroSubgrupoAtivo: action.payload.subgrupo,
      };
    default:
      return state;
  }
};
