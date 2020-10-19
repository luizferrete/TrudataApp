import {StyleSheet} from 'react-native';
export default StyleSheet.create({
  /* =========== Views =========== */
  viewFooter: {
    margin: 10,
  },
  viewFinalMenu: {
    flex: 4,
  },
  viewItens: {
    flex: 4,
  },
  viewMenu: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  viewPrincipal: {
    flex: 1,
  },
  viewProfileImg: {
    flex: 2,
    padding: 15,
    alignSelf: 'flex-start',
    flexDirection: 'column-reverse',
  },
  viewUsuarioLogado: {
    flex: 1,
    padding: 15,
  },
  /* =========== Texts =========== */
  txtVersao: {
    alignSelf: 'flex-end',
    fontSize: 13,
    color: '#474a4f',
  },
  txtMenu: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5d6065',
    marginLeft: 30,
    marginTop: 15,
  },
  txtUsuarioLogadoEmail: {
    fontSize: 18,
    color: '#d3d6db',
  },
  txtUsuarioLogadoNome: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
  },
  /* =========== Geral =========== */
  iconsMenu: {
    resizeMode: 'contain',
    width: 35,
    height: 35,
    marginTop: 10,
    marginLeft: 10,
  },
  imgBg: {
    flex: 2,
  },
  menuTouch: {
    flex: 1,
  },
  profileImg: {
    resizeMode: 'contain',
    width: 100,
    height: 100,
  },
  selectedMenu: {
    backgroundColor: '#edeff2',
  },
});
