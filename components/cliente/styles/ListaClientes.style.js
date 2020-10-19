import {StyleSheet} from 'react-native';
export default StyleSheet.create({
  /* =========== Views =========== */
  viewCliente: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 10,
    margin: 10,
    elevation: 4,
  },
  viewNenhumItem: {
    backgroundColor: '#FFF',
    padding: 10,
    margin: 10,
    elevation: 4,
  },
  viewPesquisar: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#393e42',
  },
  viewPrincipal: {
    flex: 1,
    backgroundColor: '#edeff2',
  },
  /* =========== Texts =========== */
  txtAniver: {
    color: '#7e848c',
  },
  txtCadastro: {
    color: '#3f51b5',
    fontWeight: 'bold',
  },
  txtNenhumItem: {
    alignSelf: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    color: '#474a4f',
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
  loading: {
    marginTop: 20,
    marginBottom: 80,
  },
  menuIcon: {
    height: 5,
    width: 5,
    resizeMode: 'contain',
    margin: 22,
    padding: 10,
  },
  searchBar: {
    flex: 1,
    alignItems: 'flex-end',
  },
  searchBarIcon: {
    flex: 1,
  },
  touchSearch: {
    borderColor: '#000',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
});
