import {StyleSheet} from 'react-native';
export default StyleSheet.create({
  /* =========== Views =========== */
  viewCabecalho: {
    flex: 1,
    backgroundColor: '#edeff2',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  viewTitulo: {
    flex: 1,
    backgroundColor: '#edeff2',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#7e848c',
  },
  viewTxtAplicar: {
    flex: 2,
  },
  viewTxtFiltros: {
    flex: 4,
  },
  /* =========== Texts =========== */
  txtAplicar: {
    color: '#1f91f3',
  },
  txtCabecalho: {
    padding: 20,
    fontWeight: 'bold',
  },
  txtFiltrarPorAssunto: {
    color: '#474a4f',
  },
  txtFiltros: {
    color: '#7e848c',
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
    borderColor: '#b3b3b3',
    borderBottomWidth: 1,
  },
  radioButtonLabel: {
    fontSize: 12,
    color: '#474a4f',
    marginTop: 8,
  },
});
