import {StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';
const screenWidth = Math.round(Dimensions.get('window').width);

export default StyleSheet.create({
  /* =========== Views =========== */
  viewCarousel: {
    flex: 1,
    padding: 10,
    margin: 10,
    alignSelf: 'center',
    elevation: 4,
  },
  viewCell: {
    padding: 10,
    margin: 1,
    borderWidth: 1,
    flex: 6,
    alignItems: 'center',
  },
  viewDetalhes: {
    backgroundColor: '#FFF',
    padding: 20,
    margin: 10,
    flex: 15,
    elevation: 3,
  },
  viewGrade: {
    flexDirection: 'row',
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
  /* =========== Text =========== */
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
    fontSize: 15,
    marginBottom: 12,
  },
  txtGrade: {
    color: '#474a4f',
    fontSize: 15,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  txtGradeEan: {
    color: '#474a4f',
    fontSize: 12,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  txtHeader: {
    color: '#474a4f',
    fontSize: 15,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  txtSemInfo: {
    alignSelf: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    color: '#474a4f',
  },
  txtValidacaoServer: {
    backgroundColor: '#FF4444',
    color: '#FFFFFF',
    padding: 15,
    fontWeight: 'bold',
    borderRadius: 10,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  /* =========== Geral =========== */
  imgProduto: {
    resizeMode: 'contain',
    width: screenWidth,
    height: screenWidth,
    alignSelf: 'center',
  },
  tituloPrincipal: {
    color: '#474a4f',
    fontSize: 21,
    alignSelf: 'center',
  },
});
