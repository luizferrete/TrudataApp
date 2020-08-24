import React, {Component} from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  FlatList,
  BackHandler,
} from 'react-native';
import Header from '../header/Header';
import {connect} from 'react-redux';
import {
  buscaDetalhesCliente,
  mostrarIconeFiltroClientes,
} from '../../actions/ClientesActions';
import {formatarData, stringDataSemDia} from '../utils/Utils';
import {Actions} from 'react-native-router-flux';

class DetalhesCliente extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.mostrarIconeFiltroClientes(false);
    this.props.buscaDetalhesCliente(this.props.token, this.props.cdCliente);
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.backAction,
    );
  }

  backAction = async () => {
    Actions.listaClientes();
    return true;
  };

  _renderItem(titulo, desc) {
    if (desc != null && desc !== 'Null') {
      return (
        <>
          <Text style={styles.txtDesc}>{titulo}</Text>
          <Text style={styles.txtItem}>{desc}</Text>
        </>
      );
    } else {
      return (
        <>
          <Text style={styles.txtDesc}>{titulo}</Text>
          <Text style={styles.txtItem}>Não informado</Text>
        </>
      );
    }
  }

  renderTelefoneRow(item) {
    return (
      <View style={styles.viewCardItens}>
        {this._renderItem('Número', item.Numero)}
        {this._renderItem('Tipo de telefone', item.Tipo)}
      </View>
    );
  }

  renderEnderecoRow(item) {
    return (
      <View style={styles.viewCardItens}>
        {this._renderItem('Endereço', item.Endereco)}
        {this._renderItem('Número', item.Numero)}
        {this._renderItem('Complemento', item.Complemento)}
        {this._renderItem('CEP', item.CEP)}
        {this._renderItem('Bairro', item.Bairro)}
        {this._renderItem('Tipo de endereço', item.Tipo)}
      </View>
    );
  }

  renderEmailRow(item) {
    return (
      <View style={styles.viewCardItens}>
        {this._renderItem('E-mail', item.Email)}
        {this._renderItem('Tipo de e-mail', item.Tipo)}
      </View>
    );
  }

  _renderErroServer(item) {
    console.log(item);
    if (item !== '') {
      return <Text style={styles.txtValidacaoServer}>{item}</Text>;
    }
  }

  render() {
    return (
      <ScrollView style={styles.viewPrincipal}>
        <Header titulo="Clientes" />
        <View style={styles.viewTituloPrincipal}>
          <Text style={styles.tituloPrincipal}>Detalhes do cliente</Text>
        </View>
        <View style={styles.viewCard}>
          {this._renderErroServer(this.props.validacaoDetalhesCliente)}
          <Text style={styles.txtDesc}>Nome</Text>
          <Text style={styles.txtDescNome}>
            {this.props.detalhesCliente.Nome}
          </Text>
          {this._renderItem(
            'Data de nascimento',
            formatarData(this.props.detalhesCliente.DataNascimento),
          )}
          <Text style={styles.txtDesc}>Cpf/Cnpj</Text>
          <Text style={styles.txtItem}>
            {this.props.detalhesCliente.CpfCnpj}
          </Text>
          {this._renderItem('Gênero', this.props.detalhesCliente.Genero)}
          {this._renderItem('Profissão', this.props.detalhesCliente.Profissao)}
          <Text style={styles.txtDesc}>Cliente desde</Text>
          <Text style={styles.txtItem}>
            {stringDataSemDia(this.props.detalhesCliente.DataCadastro)}
          </Text>
        </View>
        <View style={styles.viewTituloPrincipal}>
          <Text style={styles.tituloPrincipal}>Telefones do cliente</Text>
        </View>
        <View>
          <FlatList
            data={this.props.detalhesCliente.Telefones}
            renderItem={({item}) => this.renderTelefoneRow(item)}
            horizontal={true}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <View style={styles.viewTituloPrincipal}>
          <Text style={styles.tituloPrincipal}>Endereços do cliente</Text>
        </View>
        <View>
          <FlatList
            data={this.props.detalhesCliente.Enderecos}
            renderItem={({item}) => this.renderEnderecoRow(item)}
            horizontal={true}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
        <View style={styles.viewTituloPrincipal}>
          <Text style={styles.tituloPrincipal}>E-mails do cliente</Text>
        </View>
        <View>
          <FlatList
            data={this.props.detalhesCliente.Emails}
            renderItem={({item}) => this.renderEmailRow(item)}
            horizontal={true}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  token: state.LoginReducer.token,
  detalhesCliente: state.ClientesReducer.detalhesDoCliente,
  cdCliente: state.ClientesReducer.cdCliente,
  validacaoDetalhesCliente: state.ClientesReducer.validacaoDetalhesCliente,
});

export default connect(
  mapStateToProps,
  {buscaDetalhesCliente, mostrarIconeFiltroClientes},
)(DetalhesCliente);

const styles = StyleSheet.create({
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
  tituloPrincipal: {
    color: '#474a4f',
    fontSize: 21,
    alignSelf: 'center',
  },
  viewCard: {
    backgroundColor: '#FFF',
    padding: 20,
    margin: 10,
    flex: 15,
    elevation: 3,
  },
  txtDescNome: {
    color: '#474a4f',
    fontSize: 17,
    marginBottom: 12,
    fontWeight: 'bold',
  },
  txtDesc: {
    color: '#474a4f',
    fontSize: 17,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  txtItem: {
    fontSize: 14,
    marginBottom: 12,
  },
  viewCardItens: {
    backgroundColor: '#FFF',
    padding: 20,
    margin: 10,
    flex: 15,
    elevation: 3,
  },
  txtValidacaoServer: {
    backgroundColor: '#FF4444',
    color: '#FFFFFF',
    padding: 15,
    fontWeight: 'bold',
    borderRadius: 10,
    marginBottom: 10,
  },
});
