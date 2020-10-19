import {StyleSheet} from 'react-native';
export default StyleSheet.create({
  /* =========== Views =========== */
  viewCard: {
    backgroundColor: '#FFF',
    padding: 20,
    margin: 10,
    flex: 15,
    elevation: 3,
  },
  viewPrincipal: {
    backgroundColor: '#edeff2',
    flex: 1,
  },
  viewTituloPrincipal: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 10,
    margin: 10,
    marginBottom: 0,
    elevation: 4,
  },
  /* =========== Texts =========== */
  txtDesc: {
    color: '#474a4f',
    fontSize: 17,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  txtDescAssunto: {
    color: '#474a4f',
    fontSize: 17,
    marginBottom: 12,
    fontWeight: 'bold',
  },
  txtItem: {
    fontSize: 14,
    marginBottom: 12,
  },
  txtValidacaoServer: {
    backgroundColor: '#FF4444',
    color: '#FFFFFF',
    padding: 15,
    fontWeight: 'bold',
    borderRadius: 10,
  },
  /* =========== Geral =========== */
  tituloPrincipal: {
    color: '#474a4f',
    fontSize: 21,
    alignSelf: 'center',
  },
});
