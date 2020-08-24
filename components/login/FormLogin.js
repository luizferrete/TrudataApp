import React, {Component} from 'react';
import {
  View,
  TextInput,
  ImageBackground,
  StyleSheet,
  Text,
  Image,
  TouchableHighlight,
  ActivityIndicator,
  BackHandler,
} from 'react-native';
import {connect} from 'react-redux';
import {
  modificaEmail,
  modificaSenha,
  autenticarUsuario,
  inicializaLogin,
} from '../../actions/LoginActions';
import AsyncStorage from '@react-native-community/async-storage';
import b64 from 'base-64';

class FormLogin extends Component {
  componentDidMount = async () => {
    let usuarioEmail = (await AsyncStorage.getItem('usuarioEmail')) || '';
    let usuarioSenha = (await AsyncStorage.getItem('usuarioSenha')) || '';
    this.props.inicializaLogin(
      b64.decode(usuarioEmail),
      b64.decode(usuarioSenha),
    );
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.backAction,
    );
  };

  backAction = async () => {
    BackHandler.exitApp();
    return true;
  };

  _realizaLogin = async () => {
    const {email, senha} = this.props;
    await this.props.autenticarUsuario({email, senha});
  };

  renderBtnAcessar() {
    if (this.props.loadingLogin) {
      return <ActivityIndicator size="large" style={styles.loadingIcon} />;
    }
    return (
      <TouchableHighlight
        onPress={() => this._realizaLogin()}
        style={styles.btnEntrar}
        underlayColor="rgb(233, 30, 99)">
        <Text style={styles.txtEntrar}>ENTRAR</Text>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <ImageBackground
        style={styles.imgBg}
        source={require('../../imgs/background.jpg')}>
        <View style={styles.viewPrincipal}>
          <View style={styles.viewWelcome}>
            <Text style={styles.txtBemVindo}>Bem-vindo</Text>
            <Image
              source={require('../../imgs/profile_image.png')}
              style={styles.profileImage}
            />
          </View>
          <View style={styles.viewFormulario}>
            <View style={styles.viewInputs}>
              <Image
                source={require('../../imgs/user_icon.png')}
                style={styles.userIcon}
              />
              <TextInput
                style={styles.txtInput}
                value={this.props.email}
                onChangeText={texto => this.props.modificaEmail(texto)}
              />
            </View>
            <View style={styles.linhaForm} />
            <View style={styles.viewInputs}>
              <Image
                source={require('../../imgs/password_icon.png')}
                style={styles.pwdIcon}
              />
              <TextInput
                style={styles.txtInputPassword}
                secureTextEntry={true}
                value={this.props.senha}
                onChangeText={texto => this.props.modificaSenha(texto)}
              />
            </View>
            <View style={styles.linhaForm} />
            <Text style={styles.txtErro}>{this.props.erroLogin}</Text>
            {this.renderBtnAcessar()}
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => ({
  email: state.LoginReducer.email,
  senha: state.LoginReducer.senha,
  erroLogin: state.LoginReducer.erroLogin,
  loadingLogin: state.LoginReducer.loadingLogin,
});

export default connect(
  mapStateToProps,
  {modificaEmail, modificaSenha, autenticarUsuario, inicializaLogin},
)(FormLogin);

const styles = StyleSheet.create({
  imgBg: {
    flex: 1,
  },
  //Views
  viewPrincipal: {
    flex: 1,
    padding: 10,
  },
  viewFormulario: {
    flex: 2,
    marginLeft: 30,
    marginRight: 30,
  },
  viewWelcome: {
    flex: 2,
    alignItems: 'center',
    flexDirection: 'column-reverse',
  },
  viewInputs: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 10,
  },
  //BemVindo
  profileImage: {
    width: 120,
    height: 120,
    marginBottom: 15,
  },
  txtBemVindo: {
    fontSize: 30,
    color: '#FFF',
    alignContent: 'center',
    marginBottom: 20,
  },
  //TextInputs
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
  //Icones formulario
  userIcon: {
    flexDirection: 'column',
    width: 25,
    height: 25,
  },
  pwdIcon: {
    flexDirection: 'column',
    width: 25,
    height: 30,
  },
  //Linha form
  linhaForm: {
    borderWidth: 0.5,
    borderColor: '#FFF',
    opacity: 0.3,
  },
  //Botão entrar
  txtEntrar: {
    color: '#FFF',
    fontSize: 20,
    textAlign: 'center',
  },
  btnEntrar: {
    marginTop: 50,
    backgroundColor: 'rgb(233, 30, 99)',
    padding: 15,
    alignContent: 'center',
  },
  loadingIcon: {
    alignContent: 'center',
    marginTop: 50,
  },
  txtErro: {
    marginTop: 5,
    color: '#ff0000',
    fontSize: 18,
  },
});
