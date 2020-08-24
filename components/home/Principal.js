import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
  BackHandler,
} from 'react-native';
import {connect} from 'react-redux';
import Header from '../header/Header';
import {buscaContatos} from '../../actions/PrincipalActions';
import Modal from 'react-native-modal';
import {Actions} from 'react-native-router-flux';

class Principal extends Component {
  state = {
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  componentDidMount() {
    this.props.buscaContatos(this.props.token);
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.backAction,
    );
  }

  backAction = async () => {
    Actions.formLogin();
    return true;
  };

  render() {
    return (
      <View style={styles.viewPrincipal}>
        <Header titulo="Principal" />
        <View style={styles.viewCards}>
          <Image
            source={require('../../imgs/contatos_card.png')}
            style={styles.imgContato}
          />
          <View style={styles.cardContato}>
            <View style={styles.contatosCardName}>
              <Text style={styles.txtContatosCardName}>CONTATOS HOJE</Text>
            </View>
            <View style={styles.contatosInfo}>
              <Text style={styles.txtContatosHoje}>
                {this.props.contatosDia}
              </Text>
              <Text style={styles.txtContatosMes}>
                /{this.props.contatosMes}
              </Text>
            </View>
          </View>
        </View>
        <TouchableHighlight
          onPress={() => this.setModalVisible(true)}
          style={styles.touchAdicionar}
          underlayColor="transparent">
          <Image
            source={require('../../imgs/btn_adicionar.png')}
            style={styles.btnAdicionar}
          />
        </TouchableHighlight>

        <View>
          <Modal
            isVisible={this.state.modalVisible}
            backdropOpacity={0.7}
            backdropColor="#FFF"
            onBackdropPress={() => this.setModalVisible(false)}>
            <View style={styles.viewPrincipalModal}>
              <View style={styles.viewBotaoFechar}>
                <TouchableHighlight
                  onPress={() => this.setModalVisible(false)}
                  style={styles.touchAdicionarModal}
                  underlayColor="transparent">
                  <Image
                    source={require('../../imgs/btn_adicionar_branco.png')}
                    style={styles.btnAdicionarModal}
                  />
                </TouchableHighlight>
              </View>
              <View style={styles.viewAdicionarContato}>
                <Text style={styles.txtAdicionarContato}>Novo contato</Text>
                <TouchableHighlight
                  onPress={() => {
                    this.setModalVisible(false);
                    Actions.novoContatoAssunto();
                  }}
                  style={styles.touchAdicionarContato}
                  underlayColor="transparent">
                  <Image
                    source={require('../../imgs/action_contatos.png')}
                    style={styles.btnAdicionarContato}
                  />
                </TouchableHighlight>
              </View>
              <View style={styles.viewPlaceholder} />
            </View>
          </Modal>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  token: state.LoginReducer.token,
  contatosDia: state.PrincipalReducer.contatosDia,
  contatosMes: state.PrincipalReducer.contatosMes,
});

export default connect(
  mapStateToProps,
  {buscaContatos},
)(Principal);

const styles = StyleSheet.create({
  viewPrincipal: {
    backgroundColor: 'rgb(237, 239, 242)',
    flex: 1,
  },
  viewCards: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
  imgContato: {
    height: 110,
    width: 110,
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
  txtContatosCardName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    paddingTop: 20,
    paddingLeft: 10,
  },
  contatosInfo: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10,
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
  btnAdicionar: {
    width: 85,
    height: 85,
    alignSelf: 'flex-start',
    resizeMode: 'contain',
  },
  btnAdicionarModal: {
    width: 100,
    height: 100,
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
  viewPrincipalModal: {
    flex: 1,
    alignItems: 'flex-end',
    flexDirection: 'column-reverse',
  },
  viewBotaoFechar: {
    flex: 2,
  },
  viewAdicionarContato: {
    flex: 2,
    alignItems: 'center',
    flexDirection: 'row',
  },
  viewPlaceholder: {
    flex: 9,
  },
  btnAdicionarContato: {
    width: 75,
    height: 75,
    resizeMode: 'contain',
    marginRight: 15,
  },
  txtAdicionarContato: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
