import {StyleSheet} from 'react-native';
export default StyleSheet.create({
  /* =========== Views =========== */
  viewItem: {
    paddingTop: 15,
    paddingLeft: 15,
    paddingRight: 15,
  },
  viewPrincipal: {
    flex: 1,
    backgroundColor: '#edeff2',
  },
  /* =========== Texts =========== */
  txtDesc: {
    color: '#7e848c',
  },
  txtInput: {
    fontSize: 16,
    color: '#474a4f',
    marginTop: 5,
  },
  txtInputCliente: {
    flex: 1,
    alignContent: 'flex-start',
  },
  txtValidacao: {
    color: '#FF4444',
    marginTop: 3,
    fontStyle: 'italic',
  },
  txtValidacaoServer: {
    backgroundColor: '#FF4444',
    color: '#FFFFFF',
    padding: 5,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    fontWeight: 'bold',
    borderRadius: 10,
  },
  /* =========== Geral =========== */
  borda: {
    borderColor: '#dbdcde',
    borderBottomWidth: 1,
  },
  bordaTxt: {
    borderColor: '#dbdcde',
    borderBottomWidth: 1,
    paddingBottom: 10,
    paddingTop: 10,
  },
  btnAdicionarCliente: {
    width: 55,
    height: 55,
  },
  flexDirectionRow: {
    flexDirection: 'row',
  },
  touchAddCliente: {
    borderRadius: 50,
  },
});
