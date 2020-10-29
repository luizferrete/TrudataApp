import {StyleSheet} from 'react-native';
export default StyleSheet.create({
  /* =========== Views =========== */
  viewCabecalho: {
    backgroundColor: '#edeff2',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#7e848c',
  },
  viewPesquisar: {
    borderBottomWidth: 1,
    borderColor: '#7e848c',
  },
  viewPrincipalModal: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  viewRadioButtons: {
    flex: 7,
    padding: 5,
  },
  viewTxtAplicar: {
    backgroundColor: '#1f91f3',
    borderRadius: 10,
    margin: 5,
  },
  viewTxtFechar: {
    flex: 2,
  },
  viewTxtCancelarFiltro: {
    backgroundColor: '#3f51b5',
    borderRadius: 10,
    margin: 5,
  },
  viewTxtFiltros: {
    flex: 4,
    padding: 5,
  },
  /* =========== Texts =========== */
  txtAplicarCancelar: {
    color: '#fff',
  },
  txtCabecalho: {
    padding: 15,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  txtDesc: {
    padding: 5,
    paddingLeft: 15,
    paddingTop: 10,
    fontWeight: 'bold',
  },
  txtFechar: {
    borderRadius: 10,
    margin: 5,
    color: '#fff',
    backgroundColor: '#c60905',
  },
  txtFiltrarPorAssunto: {
    color: '#474a4f',
  },
  txtFiltros: {
    color: '#7e848c',
  },
  txtSemResultado: {
    textAlign: 'center',
    fontSize: 16,
    color: '#474a4f',
  },
  txtValidacao: {
    color: '#c60905',
    fontSize: 12,
    paddingLeft: 15,
  },
  /* =========== Geral =========== */
  buttonWrapStyle: {
    marginLeft: 10,
    marginTop: 11,
  },
  modal: {
    margin: 35,
  },
  radioButton: {
    paddingBottom: 10,
    marginTop: 6,
  },
  radioButtonLabel: {
    fontSize: 12,
    color: '#474a4f',
    marginTop: 8,
  },
});
