import {StyleSheet} from 'react-native';
export default StyleSheet.create({
  /* =========== Views =========== */
  viewFormulario: {
    flex: 2,
    marginLeft: 30,
    marginRight: 30,
  },
  viewInputs: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 10,
  },
  viewPrincipal: {
    flex: 1,
    padding: 10,
  },
  viewWelcome: {
    flex: 2,
    alignItems: 'center',
    flexDirection: 'column-reverse',
  },
  /* =========== Texts =========== */
  txtBemVindo: {
    fontSize: 30,
    color: '#FFF',
    alignContent: 'center',
    marginBottom: 20,
  },
  txtEntrar: {
    color: '#FFF',
    fontSize: 20,
    textAlign: 'center',
  },
  txtErro: {
    marginTop: 5,
    color: '#ff0000',
    fontSize: 18,
  },
  txtInput: {
    color: '#FFF',
    padding: 1,
    flexDirection: 'column',
    flex: 5,
    marginLeft: 20,
    fontSize: 16,
  },
  txtInputPassword: {
    color: '#FFF',
    padding: 1,
    flexDirection: 'column',
    flex: 5,
    marginLeft: 20,
    fontSize: 18,
    letterSpacing: 4,
  },
  /* =========== Geral =========== */
  btnEntrar: {
    marginTop: 50,
    backgroundColor: 'rgb(233, 30, 99)',
    padding: 15,
    alignContent: 'center',
  },
  imgBg: {
    flex: 1,
  },
  linhaForm: {
    borderWidth: 0.5,
    borderColor: '#FFF',
    opacity: 0.3,
  },
  loadingIcon: {
    alignContent: 'center',
    marginTop: 50,
  },
  profileImage: {
    width: 120,
    height: 120,
    marginBottom: 15,
  },
  pwdIcon: {
    flexDirection: 'column',
    width: 25,
    height: 30,
  },
  userIcon: {
    flexDirection: 'column',
    width: 25,
    height: 25,
  },
});
