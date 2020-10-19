import React, {Component} from 'react';
import {View, Text, Image, TouchableHighlight, BackHandler} from 'react-native';
import {connect} from 'react-redux';
import Header from '../header/Header';
import {buscaContatos} from '../../actions/PrincipalActions';
import Modal from 'react-native-modal';
import {Actions} from 'react-native-router-flux';
import styles from './styles/Principal.style';

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
