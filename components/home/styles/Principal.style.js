import {StyleSheet} from 'react-native';
export default StyleSheet.create({
  /* =========== Views =========== */
  viewAdicionarContato: {
    flex: 2,
    alignItems: 'center',
    flexDirection: 'row',
  },
  viewBotaoFechar: {
    flex: 2,
  },
  viewCards: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  viewPlaceholder: {
    flex: 9,
  },
  viewPrincipal: {
    backgroundColor: 'rgb(237, 239, 242)',
    flex: 1,
  },
  viewPrincipalModal: {
    flex: 1,
    alignItems: 'flex-end',
    flexDirection: 'column-reverse',
  },
  /* =========== Texts =========== */
  txtAdicionarContato: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  txtContatosCardName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    paddingTop: 20,
    paddingLeft: 10,
  },
  txtContatosHoje: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFF',
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
  txtContatosMes: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    paddingTop: 17,
  },
  /* =========== Geral =========== */
  btnAdicionar: {
    width: 85,
    height: 85,
    alignSelf: 'flex-start',
    resizeMode: 'contain',
  },
  btnAdicionarContato: {
    width: 75,
    height: 75,
    resizeMode: 'contain',
    marginRight: 15,
  },
  btnAdicionarModal: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  cardContato: {
    backgroundColor: '#3f51b5',
    flexDirection: 'column',
    alignItems: 'stretch',
    flex: 1,
    height: 109,
    marginTop: 1,
  },
  contatosCardName: {
    flex: 1,
  },
  contatosInfo: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10,
  },
  imgContato: {
    height: 110,
    width: 110,
    resizeMode: 'contain',
  },
  touchAdicionar: {
    borderRadius: 50,
    alignSelf: 'flex-end',
    margin: 23,
  },
  touchAdicionarModal: {
    borderRadius: 50,
  },
});
