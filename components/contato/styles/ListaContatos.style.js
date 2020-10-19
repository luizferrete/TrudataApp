import {StyleSheet, Dimensions} from 'react-native';
export default StyleSheet.create({
  /* =========== Views =========== */
  viewBotaoFechar: {
    marginLeft: 50,
  },
  viewBtnAdicionar: {
    position: 'absolute',
    left: Dimensions.get('window').width - 100,
    bottom: 0,
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  viewContato: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 20,
    margin: 10,
    elevation: 4,
  },
  viewNenhumItem: {
    backgroundColor: '#FFF',
    padding: 10,
    margin: 10,
    elevation: 4,
  },
  viewPrincipal: {
    flex: 1,
    backgroundColor: '#edeff2',
    position: 'relative',
  },
  viewPrincipalModal: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  /* =========== Texts =========== */
  txtNenhumItem: {
    alignSelf: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    color: '#474a4f',
  },
  txtNome: {
    color: '#7e848c',
  },
  txtStatus: {
    color: '#ff5252',
    fontSize: 17,
    fontWeight: 'bold',
  },
  txtTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#474a4f',
  },
  txtValidacaoServer: {
    backgroundColor: '#FF4444',
    color: '#FFFFFF',
    padding: 15,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    fontWeight: 'bold',
    borderRadius: 10,
  },
  /* =========== Geral =========== */
  btnAdicionar: {
    width: 85,
    height: 85,
    flexDirection: 'column',
    //alignSelf: 'center',
    resizeMode: 'contain',
    //position: 'absolute',
  },
  touchAdicionar: {
    borderRadius: 50,
  },
  touchAdicionarModal: {
    borderRadius: 50,
  },
});
