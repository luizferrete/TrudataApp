import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableHighlight,
  BackHandler,
} from 'react-native';
import NovoContatoHeader from './NovoContatoHeader';
import {connect} from 'react-redux';
import {
  buscaTiposContato,
  alteraTipoContatoSelecionado,
} from '../../actions/ContatosActions';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import {Actions} from 'react-native-router-flux';

class NovoContatoAssunto extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.buscaTiposContato(this.props.token);
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.backAction,
    );
  }

  backAction = async () => {
    var obj = {
      value: null,
    };
    this.props.alteraTipoContatoSelecionado(obj);
    Actions.listaContatos();
    return true;
  };

  _renderBtnAvancar() {
    if (this.props.tipoContatoSelecionado !== null) {
      return (
        <View style={styles.viewBtnAvancar}>
          <TouchableHighlight
            underlayColor="transparent"
            onPress={() => Actions.novoContato()}
            style={styles.touchAvancar}>
            <Image
              source={require('../../imgs/btn_avancar.png')}
              style={styles.btnAvancar}
            />
          </TouchableHighlight>
        </View>
      );
    }
  }

  _renderErroValidacao(item) {
    if (item !== '') {
      return <Text style={styles.txtValidacao}>{item}</Text>;
    }
  }

  render() {
    return (
      <View style={styles.viewPrincipal}>
        <NovoContatoHeader />
        {this._renderErroValidacao(this.props.validacaoTiposContato)}
        <View style={styles.viewTitulo}>
          <Text style={styles.txtTitulo}>
            Selecione um assunto para o contato
          </Text>
        </View>
        <View style={styles.viewRadioButtons}>
          <RadioForm>
            {this.props.tiposContatos.map((obj, i) => (
              <RadioButton
                labelHorizontal={true}
                key={i}
                selectedButtonColor={'#009688'}>
                <RadioButtonInput
                  obj={obj}
                  index={i}
                  isSelected={this.props.tipoContatoSelecionado === obj.value}
                  onPress={() => this.props.alteraTipoContatoSelecionado(obj)}
                  borderWidth={1}
                  buttonColor={'#009688'}
                  buttonSize={12}
                  buttonOuterSize={24}
                  buttonWrapStyle={styles.buttonWrapStyle}
                />
                <RadioButtonLabel
                  obj={obj}
                  index={i}
                  labelHorizontal={true}
                  onPress={() => this.props.alteraTipoContatoSelecionado(obj)}
                  labelStyle={styles.radioButtonLabel}
                />
              </RadioButton>
            ))}
          </RadioForm>
        </View>
        {this._renderBtnAvancar()}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  token: state.LoginReducer.token,
  tiposContatos: state.ContatosReducer.tiposContatos,
  tipoContatoSelecionado: state.ContatosReducer.idTipoContatoSelecionado,
  validacaoTiposContato: state.ContatosReducer.validacaoTiposContato,
});

export default connect(
  mapStateToProps,
  {buscaTiposContato, alteraTipoContatoSelecionado},
)(NovoContatoAssunto);

const styles = StyleSheet.create({
  viewPrincipal: {
    flex: 1,
    backgroundColor: '#edeff2',
    position: 'relative',
  },
  viewTitulo: {
    padding: 10,
  },
  txtTitulo: {
    color: '#7e848c',
    fontSize: 13,
    fontWeight: 'bold',
  },
  viewRadioButtons: {
    padding: 20,
  },
  buttonWrapStyle: {
    marginLeft: 10,
    marginTop: 11,
  },
  radioButtonLabel: {
    fontSize: 15,
    color: '#474a4f',
    marginTop: 10,
  },
  btnAvancar: {
    width: 85,
    height: 85,
    flexDirection: 'column',
    //alignSelf: 'center',
    resizeMode: 'contain',
    //position: 'absolute',
  },
  viewBtnAvancar: {
    position: 'absolute',
    left: Dimensions.get('window').width - 100,
    bottom: 0,
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  touchAvancar: {
    borderRadius: 50,
  },
  txtValidacao: {
    backgroundColor: '#FF4444',
    color: '#FFFFFF',
    padding: 5,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    fontWeight: 'bold',
    borderRadius: 10,
  },
});
