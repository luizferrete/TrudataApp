import {StyleSheet, Dimensions} from 'react-native';
export default StyleSheet.create({
  /* =========== Views =========== */
  viewBtnAvancar: {
    position: 'absolute',
    left: Dimensions.get('window').width - 100,
    bottom: 0,
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  viewPrincipal: {
    flex: 1,
    backgroundColor: '#edeff2',
    position: 'relative',
  },
  viewRadioButtons: {
    padding: 20,
  },
  viewTitulo: {
    padding: 10,
  },
  /* =========== Texts =========== */
  txtTitulo: {
    color: '#7e848c',
    fontSize: 13,
    fontWeight: 'bold',
  },
  txtValidacao: {
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
  btnAvancar: {
    width: 85,
    height: 85,
    flexDirection: 'column',
    resizeMode: 'contain',
  },
  buttonWrapStyle: {
    marginLeft: 10,
    marginTop: 11,
  },
  radioButtonLabel: {
    fontSize: 15,
    color: '#474a4f',
    marginTop: 10,
  },
  touchAvancar: {
    borderRadius: 50,
  },
});
