import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import Modal from 'react-native-modal';
import {connect} from 'react-redux';
import {
  setModalFiltroVisible,
  buscaTiposContato,
  alteraTipoContatoSelecionadoFiltro,
  isLoadingContatos,
  isMaxReachedContatos,
  alteraSkipContato,
  alteraDataLoadContato,
  buscaListaContatos,
} from '../../actions/ContatosActions';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';

const todosAssuntos = {value: 0, label: 'Todos os assuntos'};
const top = 6;

class FiltroContato extends Component {
  componentDidMount() {
    this.props.buscaTiposContato(this.props.token);
  }

  filtrarContatos = async () => {
    this.props.setModalFiltroVisible(false);
    await this.props.alteraSkipContato(0);
    await this.props.alteraDataLoadContato([]);
    await this.props.isMaxReachedContatos(false);
    if (this.props.loading === 'S') {
      return;
    }

    if (!this.props.maxReached) {
      await this.props.isLoadingContatos('S');

      await this.props.buscaListaContatos(
        this.props.token,
        this.props.tipoContatoSelecionadoFiltro,
        this.props.skip,
        top,
      );
    }
    const response = this.props.listaContatos;
    if (response.length === 0) {
      await this.props.isLoadingContatos('MAX');
      await this.props.isMaxReachedContatos(true);
    }

    if (!this.props.maxReached) {
      await this.props.alteraSkipContato(this.props.skip + top);
      await this.props.alteraDataLoadContato([...this.props.data, ...response]);
      await this.props.isLoadingContatos('N');
    }
    return;
  };

  render() {
    return (
      <Modal
        style={styles.modal}
        isVisible={this.props.modalVisible}
        backdropOpacity={0.2}
        animationIn="bounceInUp"
        onBackdropPress={() => this.props.setModalFiltroVisible(false)}>
        <View style={styles.viewPrincipalModal}>
          <View style={styles.viewCabecalho}>
            <View style={styles.viewTxtFiltros}>
              <Text style={[styles.txtFiltros, styles.txtCabecalho]}>
                FILTROS
              </Text>
            </View>
            <TouchableHighlight
              onPress={() => this.filtrarContatos()}
              underlayColor="transparent">
              <View style={styles.viewTxtAplicar}>
                <Text style={[styles.txtAplicar, styles.txtCabecalho]}>
                  APLICAR
                </Text>
              </View>
            </TouchableHighlight>
          </View>
          <View style={styles.viewTitulo}>
            <Text style={[styles.txtCabecalho, styles.txtFiltrarPorAssunto]}>
              Filtrar por assunto
            </Text>
          </View>
          <View style={styles.viewRadioButtons}>
            <RadioForm>
              <RadioButton
                labelHorizontal={true}
                key={0}
                selectedButtonColor={'#009688'}
                style={styles.radioButton}>
                <RadioButtonInput
                  obj={todosAssuntos}
                  index={0}
                  isSelected={this.props.tipoContatoSelecionadoFiltro === 0}
                  onPress={() =>
                    this.props.alteraTipoContatoSelecionadoFiltro(todosAssuntos)
                  }
                  borderWidth={1}
                  buttonColor={'#009688'}
                  buttonSize={8}
                  buttonOuterSize={16}
                  buttonWrapStyle={styles.buttonWrapStyle}
                />
                <RadioButtonLabel
                  obj={todosAssuntos}
                  index={0}
                  labelHorizontal={true}
                  onPress={() =>
                    this.props.alteraTipoContatoSelecionadoFiltro(todosAssuntos)
                  }
                  labelStyle={styles.radioButtonLabel}
                />
              </RadioButton>
              {this.props.tiposContatos.map((obj, i) => (
                <RadioButton
                  labelHorizontal={true}
                  key={i}
                  selectedButtonColor={'#009688'}
                  style={styles.radioButton}>
                  <RadioButtonInput
                    obj={obj}
                    index={i}
                    isSelected={
                      this.props.tipoContatoSelecionadoFiltro === obj.value
                    }
                    onPress={() =>
                      this.props.alteraTipoContatoSelecionadoFiltro(obj)
                    }
                    borderWidth={1}
                    buttonColor={'#009688'}
                    buttonSize={8}
                    buttonOuterSize={16}
                    buttonWrapStyle={styles.buttonWrapStyle}
                  />
                  <RadioButtonLabel
                    obj={obj}
                    index={i}
                    labelHorizontal={true}
                    onPress={() =>
                      this.props.alteraTipoContatoSelecionadoFiltro(obj)
                    }
                    labelStyle={styles.radioButtonLabel}
                  />
                </RadioButton>
              ))}
            </RadioForm>
          </View>
        </View>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  token: state.LoginReducer.token,
  modalVisible: state.ContatosReducer.modalFiltroVisible,
  tiposContatos: state.ContatosReducer.tiposContatos,
  tipoContatoSelecionadoFiltro:
    state.ContatosReducer.idTipoContatoSelecionadoFiltro,
  loading: state.ContatosReducer.loading,
  maxReached: state.ContatosReducer.maxReached,
  skip: state.ContatosReducer.skip,
  listaContatos: state.ContatosReducer.listaContatos,
  data: state.ContatosReducer.data,
});

export default connect(
  mapStateToProps,
  {
    setModalFiltroVisible,
    buscaTiposContato,
    alteraTipoContatoSelecionadoFiltro,
    isLoadingContatos,
    isMaxReachedContatos,
    alteraSkipContato,
    alteraDataLoadContato,
    buscaListaContatos,
  },
)(FiltroContato);

const styles = StyleSheet.create({
  modal: {
    margin: 35,
  },
  viewPrincipalModal: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  viewCabecalho: {
    flex: 1,
    backgroundColor: '#edeff2',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#7e848c',
  },
  viewTxtFiltros: {
    flex: 4,
  },
  viewTxtAplicar: {
    flex: 2,
  },
  txtCabecalho: {
    padding: 20,
    fontWeight: 'bold',
  },
  txtFiltros: {
    color: '#7e848c',
  },
  txtAplicar: {
    color: '#1f91f3',
  },
  txtFiltrarPorAssunto: {
    color: '#474a4f',
  },
  viewTitulo: {
    flex: 1,
    backgroundColor: '#edeff2',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#7e848c',
  },
  radioButton: {
    paddingBottom: 10,
    borderColor: '#b3b3b3',
    borderBottomWidth: 1,
  },
  viewRadioButtons: {
    flex: 7,
    padding: 5,
  },
  buttonWrapStyle: {
    marginLeft: 10,
    marginTop: 11,
  },
  radioButtonLabel: {
    fontSize: 12,
    color: '#474a4f',
    marginTop: 8,
  },
});
