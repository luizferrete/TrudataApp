import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableHighlight,
  Picker,
  ScrollView,
  BackHandler,
} from 'react-native';
import NovoContatoHeader from './NovoContatoHeader';
import {connect} from 'react-redux';
import {
  modificaDescricao,
  buscaEmpresas,
  alteraEmpresaSelecionada,
  buscaLocais,
  alteraLocalSelecionado,
  selecionaDataContato,
  mostrarCalendario,
  selecionaPrazoAtendimento,
  mostrarCalendarioPrazo,
  modificaResponsavel,
  buscaOrigem,
  alteraOrigemSelecionada,
  buscaStatus,
  alteraStatusSelecionado,
  modificaNomeContato,
  modificaTelefoneContato,
  modificaEmailContato,
  buscaEstados,
  alteraEstadoSelecionado,
  salvarContatoComCliente,
  selecionaCliente,
  selecionaCidade,
} from '../../actions/ContatosActions';
import {Actions} from 'react-native-router-flux';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {formatarData} from '../utils/Utils';
import styles from './styles/NovoContato.style';

class NovoContato extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.buscaEmpresas(this.props.token);
    this.props.buscaOrigem(this.props.token);
    this.props.buscaStatus(this.props.token);
    if (!this.props.informarCliente) {
      this.props.buscaEstados(this.props.token);
    }

    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.backAction,
    );
  }

  backAction = async () => {
    Actions.novoContatoAssunto();
    this.resetaProps();
    return true;
  };

  _renderErroValidacao(item) {
    if (item !== '') {
      return <Text style={styles.txtValidacao}>{item}</Text>;
    }
  }

  _renderErroServer(item) {
    if (item !== '') {
      return <Text style={styles.txtValidacaoServer}>{item}</Text>;
    }
  }

  resetaProps = () => {
    this.props.selecionaCidade(null, '');
    this.props.selecionaCliente(null, '');
    this.props.modificaDescricao('');
    this.props.modificaEmailContato('');
    this.props.modificaNomeContato('');
    this.props.modificaResponsavel('');
    this.props.modificaTelefoneContato('');
    this.props.mostrarCalendario(false);
    this.props.mostrarCalendarioPrazo(false);
    this.props.selecionaDataContato(new Date());
    this.props.selecionaPrazoAtendimento(null);
    this.props.alteraOrigemSelecionada(null);
    this.props.alteraStatusSelecionado(null);
    this.props.alteraEstadoSelecionado(1);
  };

  _renderCliente() {
    if (this.props.informarCliente) {
      return (
        <View style={styles.viewItem}>
          <Text style={styles.txtDesc}>Cliente</Text>
          <View style={styles.flexDirectionRow}>
            <Text style={[styles.txtInput, styles.txtInputCliente]}>
              {this.props.clienteSelecionado}
            </Text>
            <TouchableHighlight
              onPress={() => Actions.selecionarCliente()}
              style={styles.touchAddCliente}
              underlayColor="transparent">
              <Image
                source={require('../../imgs/btn_adicionar_cliente.png')}
                style={styles.btnAdicionarCliente}
              />
            </TouchableHighlight>
          </View>
          {this._renderErroValidacao(this.props.validacaoCliente)}
        </View>
      );
    }
  }

  _renderStatus() {
    if (this.props.informarStatus) {
      return (
        <View style={styles.viewItem}>
          <Text style={styles.txtDesc}>Status</Text>
          <Picker
            mode="dropdown"
            selectedValue={this.props.idStatusSelecionado}
            onValueChange={(itemValue, itemIndex) => {
              this.props.alteraStatusSelecionado(itemValue);
            }}
            style={styles.txtInput}>
            {this.props.status.map((obj, i) => (
              <Picker.Item label={obj.label} value={obj.value} key={i} />
            ))}
          </Picker>
          {this._renderErroValidacao(this.props.validacaoListaStatus)}
        </View>
      );
    }
  }

  _renderContato() {
    if (!this.props.informarCliente) {
      return (
        <>
          <View style={styles.viewItem}>
            <Text style={styles.txtDesc}>Nome do Contato</Text>
            <TextInput
              value={this.props.nomeContato}
              onChangeText={texto => this.props.modificaNomeContato(texto)}
              style={[styles.txtInput, styles.borda]}
            />
            {this._renderErroValidacao(this.props.validacaoNomeContato)}
          </View>
          <View style={styles.viewItem}>
            <Text style={styles.txtDesc}>Estado</Text>
            <Picker
              mode="dropdown"
              selectedValue={this.props.idEstadoSelecionado}
              onValueChange={(itemValue, itemIndex) => {
                this.props.alteraEstadoSelecionado(itemValue);
              }}
              style={styles.txtInput}>
              {this.props.estados.map((obj, i) => (
                <Picker.Item label={obj.label} value={obj.value} key={i} />
              ))}
            </Picker>
            {this._renderErroValidacao(this.props.validacaoListaEstados)}
          </View>
          <View style={styles.viewItem}>
            <Text style={styles.txtDesc}>Cidade</Text>
            <View style={styles.flexDirectionRow}>
              <Text style={[styles.txtInput, styles.txtInputCliente]}>
                {this.props.cidadeSelecionada}
              </Text>
              <TouchableHighlight
                onPress={() => Actions.selecionarCidade()}
                style={styles.touchAddCliente}
                underlayColor="transparent">
                <Image
                  source={require('../../imgs/btn_adicionar_cliente.png')}
                  style={styles.btnAdicionarCliente}
                />
              </TouchableHighlight>
            </View>
            {this._renderErroValidacao(this.props.validacaoCidade)}
          </View>
          <View style={styles.viewItem}>
            <Text style={styles.txtDesc}>Telefone</Text>
            <TextInput
              value={this.props.telefoneContato}
              onChangeText={texto => this.props.modificaTelefoneContato(texto)}
              style={[styles.txtInput, styles.borda]}
            />
          </View>
          <View style={styles.viewItem}>
            <Text style={styles.txtDesc}>E-mail</Text>
            <TextInput
              value={this.props.emailContato}
              onChangeText={texto => this.props.modificaEmailContato(texto)}
              style={[styles.txtInput, styles.borda]}
            />
          </View>
        </>
      );
    }
  }

  render() {
    return (
      <View style={styles.viewPrincipal}>
        <NovoContatoHeader origem="NovoContato" />
        <ScrollView>
          {this._renderErroServer(this.props.validacaoPost)}
          <View style={styles.viewItem}>
            <Text style={styles.txtDesc}>Assunto</Text>
            <Text style={styles.txtInput}>
              {this.props.tipoContatoSelecionado}
            </Text>
          </View>
          <View style={styles.viewItem}>
            <Text style={styles.txtDesc}>Empresa</Text>
            <Picker
              mode="dropdown"
              selectedValue={this.props.idEmpresaSelecionada}
              onValueChange={(itemValue, itemIndex) => {
                this.props.alteraEmpresaSelecionada(itemValue);
                this.props.buscaLocais(itemValue, this.props.empresas);
              }}
              style={styles.txtInput}>
              {this.props.empresas.map((obj, i) => (
                <Picker.Item label={obj.label} value={obj.value} key={i} />
              ))}
            </Picker>
            {this._renderErroValidacao(this.props.validacaoListaEmpresa)}
          </View>
          <View style={styles.viewItem}>
            <Text style={styles.txtDesc}>Local</Text>
            <Picker
              mode="dropdown"
              selectedValue={this.props.idLocalSelecionado}
              onValueChange={(itemValue, itemIndex) => {
                this.props.alteraLocalSelecionado(itemValue);
              }}
              style={styles.txtInput}>
              {this.props.locais.map((obj, i) => (
                <Picker.Item label={obj.label} value={obj.value} key={i} />
              ))}
            </Picker>
          </View>
          {this._renderCliente()}
          <View style={styles.viewItem}>
            <Text style={styles.txtDesc}>Descrição</Text>
            <TextInput
              value={this.props.descricao}
              onChangeText={texto => this.props.modificaDescricao(texto)}
              style={[styles.txtInput, styles.borda]}
              multiline={true}
            />
            {this._renderErroValidacao(this.props.validacaoDescricao)}
          </View>
          <View style={styles.viewItem}>
            <Text style={styles.txtDesc}>Data do contato</Text>
            <TouchableHighlight
              onPress={() => this.props.mostrarCalendario(true)}
              underlayColor="transparent">
              <Text style={[styles.txtInput, styles.bordaTxt]}>
                {formatarData(this.props.dataContato)}
              </Text>
            </TouchableHighlight>
            <DateTimePickerModal
              isVisible={this.props.showCalendar}
              mode="date"
              onConfirm={date => {
                this.props.selecionaDataContato(date);
                this.props.mostrarCalendario(false);
              }}
              onCancel={() => this.props.mostrarCalendario(false)}
              date={this.props.dataContato}
              cancelTextIOS="Cancelar"
              confirmTextIOS="Ok"
            />
          </View>
          <View style={styles.viewItem}>
            <Text style={styles.txtDesc}>Prazo de atendimento</Text>
            <TouchableHighlight
              onPress={() => this.props.mostrarCalendarioPrazo(true)}
              underlayColor="transparent">
              <Text style={[styles.txtInput, styles.bordaTxt]}>
                {formatarData(this.props.prazoAtendimento)}
              </Text>
            </TouchableHighlight>
            <DateTimePickerModal
              isVisible={this.props.showCalendarPrazo}
              mode="date"
              onConfirm={date => {
                this.props.selecionaPrazoAtendimento(date);
                this.props.mostrarCalendarioPrazo(false);
              }}
              onCancel={() => this.props.mostrarCalendarioPrazo(false)}
              date={
                this.props.prazoAtendimento == null
                  ? new Date()
                  : this.props.prazoAtendimento
              }
              cancelTextIOS="Cancelar"
              confirmTextIOS="Ok"
            />
            {this._renderErroValidacao(this.props.validacaoPrazoAtendimento)}
          </View>
          <View style={styles.viewItem}>
            <Text style={styles.txtDesc}>Responsável</Text>
            <TextInput
              value={this.props.responsavel}
              onChangeText={texto => this.props.modificaResponsavel(texto)}
              style={[styles.txtInput, styles.borda]}
            />
          </View>
          <View style={styles.viewItem}>
            <Text style={styles.txtDesc}>Origem</Text>
            <Picker
              mode="dropdown"
              selectedValue={this.props.idOrigemSelecionada}
              onValueChange={(itemValue, itemIndex) => {
                this.props.alteraOrigemSelecionada(itemValue);
              }}
              style={styles.txtInput}>
              {this.props.origens.map((obj, i) => (
                <Picker.Item label={obj.label} value={obj.value} key={i} />
              ))}
            </Picker>
            {this._renderErroValidacao(this.props.validacaoListaOrigem)}
          </View>
          {this._renderStatus()}
          {this._renderContato()}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  token: state.LoginReducer.token,
  idTipoContatoSelecionado: state.ContatosReducer.idTipoContatoSelecionado,
  tipoContatoSelecionado: state.ContatosReducer.tipoContatoSelecionado,
  assunto: state.ContatosReducer.assunto,
  empresas: state.ContatosReducer.empresas,
  idEmpresaSelecionada: state.ContatosReducer.idEmpresaSelecionada,
  locais: state.ContatosReducer.locais,
  idLocalSelecionado: state.ContatosReducer.idLocalSelecionado,
  idClienteSelecionado: state.ContatosReducer.idClienteSelecionado,
  clienteSelecionado: state.ContatosReducer.clienteSelecionado,
  descricao: state.ContatosReducer.descricao,
  dataContato: state.ContatosReducer.dataContato,
  showCalendar: state.ContatosReducer.showCalendar,
  prazoAtendimento: state.ContatosReducer.prazoAtendimento,
  showCalendarPrazo: state.ContatosReducer.showCalendarPrazo,
  responsavel: state.ContatosReducer.responsavel,
  origens: state.ContatosReducer.origens,
  idOrigemSelecionada: state.ContatosReducer.idOrigemSelecionada,
  status: state.ContatosReducer.status,
  idStatusSelecionado: state.ContatosReducer.idStatusSelecionado,
  informarCliente: state.ContatosReducer.informarCliente,
  informarStatus: state.ContatosReducer.informarStatus,
  nomeContato: state.ContatosReducer.nomeContato,
  telefoneContato: state.ContatosReducer.telefoneContato,
  emailContato: state.ContatosReducer.emailContato,
  estados: state.ContatosReducer.estados,
  idEstadoSelecionado: state.ContatosReducer.idEstadoSelecionado,
  idCidadeSelecionada: state.ContatosReducer.idCidadeSelecionada,
  cidadeSelecionada: state.ContatosReducer.cidadeSelecionada,
  validacaoDescricao: state.ContatosReducer.validacaoDescricao,
  validacaoPrazoAtendimento: state.ContatosReducer.validacaoPrazoAtendimento,
  validacaoPost: state.ContatosReducer.validacaoPost,
  validacaoCliente: state.ContatosReducer.validacaoCliente,
  validacaoCidade: state.ContatosReducer.validacaoCidade,
  validacaoNomeContato: state.ContatosReducer.validacaoNomeContato,
  validacaoListaEstados: state.ContatosReducer.validacaoListaEstados,
  validacaoListaStatus: state.ContatosReducer.validacaoListaStatus,
  validacaoListaOrigem: state.ContatosReducer.validacaoListaOrigem,
  validacaoListaEmpresa: state.ContatosReducer.validacaoListaEmpresa,
});

export default connect(
  mapStateToProps,
  {
    modificaDescricao,
    buscaEmpresas,
    alteraEmpresaSelecionada,
    buscaLocais,
    alteraLocalSelecionado,
    selecionaDataContato,
    mostrarCalendario,
    selecionaPrazoAtendimento,
    mostrarCalendarioPrazo,
    modificaResponsavel,
    buscaOrigem,
    alteraOrigemSelecionada,
    buscaStatus,
    alteraStatusSelecionado,
    modificaNomeContato,
    modificaTelefoneContato,
    modificaEmailContato,
    buscaEstados,
    alteraEstadoSelecionado,
    salvarContatoComCliente,
    selecionaCliente,
    selecionaCidade,
  },
)(NovoContato);
