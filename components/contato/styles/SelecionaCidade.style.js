import {StyleSheet} from 'react-native';
export default StyleSheet.create({
  /* =========== Views =========== */
  viewCidade: {
    paddingTop: 18,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderColor: '#dbdcde',
  },
  viewHeader: {
    backgroundColor: 'rgb(41, 41, 41)',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  viewHeaderText: {
    flex: 6,
    alignItems: 'flex-start',
    alignSelf: 'center',
    marginLeft: 20,
    flexDirection: 'row',
  },
  viewLogo: {
    flex: 6,
    alignItems: 'center',
  },
  viewMenuIcon: {
    flex: 1,
    alignItems: 'center',
  },
  viewPesquisar: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#393e42',
  },
  viewPrincipal: {
    flex: 1,
  },
  /* =========== Texts =========== */
  txtCidade: {
    color: '#474a4f',
    fontSize: 17,
  },
  txtHeader: {
    fontSize: 20,
    color: '#FFF',
  },
  txtValidacao: {
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
    margin: 10,
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
