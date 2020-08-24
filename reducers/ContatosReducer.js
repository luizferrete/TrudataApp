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
} from '../actions/types';

const INITIAL_STATE = {
  listaContatos: [],
  detalhesDoContato: [],
  cdContato: null,
  modalFiltroVisible: false,
  tiposContatos: [],
  idTipoContatoSelecionado: null,
  tipoContatoSelecionado: null,
  informarCliente: false,
  informarStatus: false,
  empresas: [],
  locais: [],
  showCalendar: false,
  showCalendarPrazo: false,
  origens: [],
  status: [],
  barraPesquisarVisivel: false,
  barraPesquisarCidadeVisivel: false,
  textoSearch: '',
  textoSearchCidade: '',
  estados: [],
  listaCidades: [],
  filtroIconeContatos: false,

  //filtro
  idTipoContatoSelecionadoFiltro: 0,
  tipoContatoSelecionadoFiltro: null,

  //adicionar
  assunto: '',
  idEmpresaSelecionada: null,
  idLocalSelecionado: null,
  idClienteSelecionado: null,
  clienteSelecionado: '',
  descricao: '',
  dataContato: new Date(),
  prazoAtendimento: null,
  responsavel: '',
  idOrigemSelecionada: null,
  idStatusSelecionado: null,
  nomeContato: '',
  telefoneContato: '',
  emailcontato: '',
  idEstadoSelecionado: 1,
  idCidadeSelecionada: null,
  cidadeSelecionada: '',

  //lista
  skip: 0,
  data: [],
  loading: 'N',
  maxReached: false,
  skipCidade: 0,
  dataCidade: [],

  //validações
  validacaoDescricao: '',
  validacaoPrazoAtendimento: '',
  validacaoPost: '',
  validacaoCliente: '',
  validacaoCidade: '',
  validacaoNomeContato: '',
  validacaoListaCidades: '',
  validacaoListaEstados: '',
  validacaoListaStatus: '',
  validacaoListaOrigem: '',
  validacaoListaEmpresa: '',
  validacaoTiposContato: '',
  validacaoDetalhesContato: '',
  validacaoListaContato: '',
};

export default (state = INITIAL_STATE, action) => {
  console.log(action);
  switch (action.type) {
    case BUSCA_LISTA_CONTATOS:
      return {
        ...state,
        listaContatos: action.payload,
        validacaoListaContato: '',
      };
    case BUSCA_DETALHES_CONTATO:
      return {
        ...state,
        detalhesDoContato: action.payload,
        validacaoDetalhesContato: '',
      };
    case ENVIA_CODIGO_CONTATO:
      return {...state, cdContato: action.payload};
    case SET_MODAL_FILTRO_VISIBLE:
      return {...state, modalFiltroVisible: action.payload};
    case BUSCA_TIPOS_CONTATOS:
      return {
        ...state,
        tiposContatos: action.payload,
        validacaoTiposContato: '',
      };
    case ALTERA_TIPO_CONTATO_SELECIONADO:
      return {
        ...state,
        idTipoContatoSelecionado: action.payload.value,
        tipoContatoSelecionado: action.payload.label,
        informarCliente: action.payload.InformarCliente,
        informarStatus: action.payload.InformarStatus,
      };
    case BUSCA_EMPRESAS:
      return {...state, empresas: action.payload, validacaoListaEmpresa: ''};
    case ALTERA_EMPRESA_SELECIONADA:
      return {...state, idEmpresaSelecionada: action.payload};
    case BUSCA_LOCAIS:
      return {...state, locais: action.payload};
    case ALTERA_LOCAL_SELECIONADO:
      return {...state, idLocalSelecionado: action.payload};
    case SELECIONA_CLIENTE:
      return {
        ...state,
        idClienteSelecionado: action.payload.cod,
        clienteSelecionado: action.payload.nome,
        validacaoCliente: '',
      };
    case MODIFICA_DESCRICAO_CONTATO:
      return {...state, descricao: action.payload, validacaoDescricao: ''};
    case SELECIONA_DATA_CONTATO:
      return {...state, dataContato: action.payload};
    case MOSTRAR_CALENDARIO:
      return {...state, showCalendar: action.payload};
    case SELECIONA_PRAZO_ATENDIMENTO:
      return {
        ...state,
        prazoAtendimento: action.payload,
        validacaoPrazoAtendimento: '',
      };
    case MOSTRAR_CALENDARIO_PRAZO:
      return {...state, showCalendarPrazo: action.payload};
    case MODIFICA_RESPONSAVEL:
      return {...state, responsavel: action.payload};
    case BUSCA_ORIGEM:
      return {...state, origens: action.payload};
    case ALTERA_ORIGEM_SELECIONADA:
      return {...state, idOrigemSelecionada: action.payload};
    case BUSCA_STATUS:
      return {...state, status: action.payload, validacaoListaStatus: ''};
    case ALTERA_STATUS_SELECIONADO:
      return {...state, idStatusSelecionado: action.payload};
    case MODIFICA_NOME_CONTATO:
      return {...state, nomeContato: action.payload, validacaoNomeContato: ''};
    case MODIFICA_FONE_CONTATO:
      return {...state, telefoneContato: action.payload};
    case MODIFICA_EMAIL_CONTATO:
      return {...state, emailContato: action.payload};
    case MOSTRA_BARRA_PESQUISAR:
      return {...state, barraPesquisarVisivel: action.payload};
    case MODIFICA_SEARCH_SELECIONA_CLIENTE:
      return {...state, textoSearch: action.payload};
    case ALTERA_TIPO_CONTATO_SELECIONADO_FILTRO:
      return {
        ...state,
        idTipoContatoSelecionadoFiltro: action.payload.value,
        tipoContatoSelecionadoFiltro: action.payload.label,
      };
    case ALTERA_SKIP_CONTATO:
      return {...state, skip: action.payload};
    case ALTERA_DATA_LOAD_CONTATO:
      return {...state, data: action.payload};
    case IS_LOADING_CONTATOS:
      return {...state, loading: action.payload};
    case IS_MAX_REACHED_CONTATOS:
      return {...state, maxReached: action.payload};
    case BUSCA_ESTADOS:
      return {...state, estados: action.payload, validacaoListaEstados: ''};
    case ALTERA_ESTADO_SELECIONADO:
      return {...state, idEstadoSelecionado: action.payload};
    case BUSCA_LISTA_CIDADES:
      return {
        ...state,
        listaCidades: action.payload,
        validacaoListaCidades: '',
      };
    case ALTERA_SKIP_CIDADE:
      return {...state, skipCidade: action.payload};
    case ALTERA_DATA_LOAD_CIDADE:
      return {...state, dataCidade: action.payload};
    case MODIFICA_SEARCH_SELECIONA_CIDADE:
      return {...state, textoSearchCidade: action.payload};
    case SELECIONA_CIDADE:
      return {
        ...state,
        idCidadeSelecionada: action.payload.cod,
        cidadeSelecionada: action.payload.nome,
        validacaoCidade: '',
      };
    case MOSTRA_BARRA_PESQUISAR_CIDADE:
      return {...state, barraPesquisarCidadeVisivel: action.payload};
    case VALIDACAO_DESCRICAO:
      return {...state, validacaoDescricao: action.payload};
    case VALIDACAO_PRAZO_ATENDIMENTO:
      return {...state, validacaoPrazoAtendimento: action.payload};
    case MSG_VALIDACAO_POST_CONTATOS:
      return {...state, validacaoPost: action.payload};
    case VALIDA_CD_CLIENTE:
      return {...state, validacaoCliente: action.payload};
    case VALIDA_CD_CIDADE:
      return {...state, validacaoCidade: action.payload};
    case VALIDA_NOME_CONTATO:
      return {...state, validacaoNomeContato: action.payload};
    case CONTATO_SALVO:
      return {
        ...state,
        descricao: '',
        validacaoDescricao: '',
        validacaoPrazoAtendimento: '',
        validacaoPost: '',
        validacaoCliente: '',
        validacaoCidade: '',
        validacaoNomeContato: '',
        idTipoContatoSelecionado: null,
        informarCliente: false,
        assunto: '',
        idClienteSelecionado: null,
        clienteSelecionado: '',
        prazoAtendimento: null,
        responsavel: '',
        nomeContato: '',
        telefoneContato: '',
        emailcontato: '',
        idCidadeSelecionada: null,
        cidadeSelecionada: '',
      };
    case VALIDA_LISTA_CIDADES:
      return {...state, validacaoListaCidades: action.payload};
    case VALIDA_LISTA_ESTADOS:
      return {...state, validacaoListaEstados: action.payload};
    case VALIDA_LISTA_STATUS:
      return {...state, validacaoListaStatus: action.payload};
    case VALIDA_LISTA_ORIGEM:
      return {...state, validacaoListaOrigem: action.payload};
    case VALIDA_LISTA_EMPRESA:
      return {...state, validacaoListaEmpresa: action.payload};
    case VALIDA_TIPOS_CONTATO:
      return {...state, validacaoTiposContato: action.payload};
    case VALIDA_DETALHES_CONTATO:
      return {...state, validacaoDetalhesContato: action.payload};
    case VALIDA_LISTA_CONTATO:
      return {...state, validacaoListaContato: action.payload};
    case MOSTRAR_ICONE_FILTRO_CONTATOS:
      return {...state, filtroIconeContatos: action.payload};
    default:
      return state;
  }
};
