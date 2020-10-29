import {StyleSheet} from 'react-native';
export default StyleSheet.create({
  /* =========== Views =========== */
  viewFiltrosAtivos: {
    borderColor: '#000',
    borderWidth: 1,
    backgroundColor: '#FFF',
    flexDirection: 'column',
    margin: 10,
    padding: 5,
    elevation: 4,
  },
  viewInfosProduto: {
    flexDirection: 'column',
    marginLeft: 10,
    flexShrink: 1,
  },
  viewLinhaFiltroAtivo: {
    flexDirection: 'row',
  },
  viewLista: {
    flex: 10,
  },
  viewNenhumItem: {
    backgroundColor: '#FFF',
    padding: 10,
    margin: 10,
    elevation: 4,
  },
  viewPesquisar: {
    flexDirection: 'row',
    backgroundColor: '#393e42',
  },
  viewPrincipal: {
    flex: 1,
    backgroundColor: '#edeff2',
  },
  viewProduto: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 10,
    margin: 10,
    flexDirection: 'row',
    elevation: 4,
  },
  viewSelectPesquisa: {
    flexDirection: 'row',
    backgroundColor: '#393e42',
  },
  viewSemRegistro: {
    margin: 10,
    borderBottomWidth: 2,
    borderColor: '#edeff2',
  },
  viewRadioButtons: {
    flex: 7,
    padding: 5,
  },

  /* =========== Texts =========== */

  txtDesc: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  txtDescFiltro: {
    fontSize: 16,
    color: '#3b4151',
    fontWeight: 'bold',
  },
  txtFiltrosAtivos: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3b4151',
  },
  txtLabelFiltro: {
    fontSize: 16,
    color: '#7e848c',
    fontWeight: 'bold',
  },
  txtMarca: {
    color: '#7e848c',
  },
  txtNenhumItem: {
    alignSelf: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    color: '#474a4f',
  },
  txtPreco: {
    fontSize: 16,
    color: '#ff5252',
    fontWeight: 'bold',
  },
  txtPesquisa: {
    fontSize: 15,
    color: '#FFF',
    marginTop: 8,
    marginLeft: 10,
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

  buttonWrapStyle: {
    marginLeft: 10,
    marginTop: 11,
  },
  imgProduto: {
    resizeMode: 'contain',
    width: 80,
    height: 80,
  },
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
  radioButton: {
    paddingBottom: 10,
  },
  radioButtonLabel: {
    fontSize: 15,
    color: '#FFF',
    marginTop: 8,
    paddingRight: 20,
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
