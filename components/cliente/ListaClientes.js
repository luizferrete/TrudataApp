import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  BackHandler,
  Image,
  ActivityIndicator,
} from 'react-native';
import Header from '../header/Header';
import {connect} from 'react-redux';
import {TouchableHighlight} from 'react-native-gesture-handler';
import {Actions} from 'react-native-router-flux';
import {SearchBar} from 'react-native-elements';
import {stringDataSemAno, stringDataSemDia} from '../utils/Utils';
import {
  filtraListaClientes,
  enviaCodigoCliente,
  alteraSkip,
  alteraDataLoad,
  modificaSearchCliente,
  mostraPesquisarClientes,
  isLoadingClientes,
  mostrarIconeFiltroClientes,
} from '../../actions/ClientesActions';
import styles from './styles/ListaClientes.style';

const top = 10;

class ListaClientes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maxReached: false,
    };
  }

  componentDidMount = async () => {
    await this.firstLoad();
    await this.loadClientes();
    await this.props.mostrarIconeFiltroClientes(true);
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.backAction,
    );
  };

  componentWillUnmount() {
    //this.backHandler.remove();
    this.props.alteraSkip(0);
    this.props.alteraDataLoad([]);
    this.props.isLoadingClientes('N');
    this.props.filtraListaClientes(this.props.token, '', this.props.skip, top);
  }

  backAction = async () => {
    Actions.principal();
    await this.props.alteraSkip(0);
    await this.props.alteraDataLoad([]);
    await this.props.isLoadingClientes('N');
    this.setState({
      maxReached: false,
    });
    await this.props.modificaSearchCliente('');
    await this.props.mostraPesquisarClientes(false);
    return true;
  };

  firstLoad = async () => {
    await this.props.alteraSkip(0);
    await this.props.alteraDataLoad([]);
    await this.props.isLoadingClientes('N');
    this.setState({maxReached: false});
  };

  loadClientes = async () => {
    if (this.props.loading === 'S') {
      return;
    }

    if (!this.state.maxReached) {
      await this.props.isLoadingClientes('S');

      await this.props.filtraListaClientes(
        this.props.token,
        this.props.textoSearch,
        this.props.skip,
        top,
      );
    }

    const response = this.props.listaClientes;

    if (response.length === 0) {
      await this.props.isLoadingClientes('MAX');
      this.setState({maxReached: true});
    }

    if (!this.state.maxReached) {
      await this.props.alteraSkip(this.props.skip + top);
      await this.props.alteraDataLoad([...this.props.data, ...response]);
    }
    return;
  };

  searchClientes = async () => {
    await this.props.alteraSkip(0);
    await this.props.alteraDataLoad([]);
    await this.props.isLoadingClientes('S');
    this.setState({
      maxReached: false,
    });
    await this.props.filtraListaClientes(
      this.props.token,
      this.props.textoSearch,
      this.props.skip,
      top,
    );
    const response = this.props.listaClientes;

    if (response.length === 0) {
      await this.props.isLoadingClientes('MAX');
      this.setState({maxReached: true});
    }

    if (!this.state.maxReached) {
      await this.props.alteraSkip(this.props.skip + top);
      await this.props.alteraDataLoad([...this.props.data, ...response]);
    }
  };

  cancelSearch = async () => {
    await this.props.alteraSkip(0);
    await this.props.alteraDataLoad([]);
    await this.props.filtraListaClientes(
      this.props.token,
      '',
      this.props.skip,
      top,
    );
  };

  acessaDetalhes = async cliente => {
    this.props.enviaCodigoCliente(cliente.Codigo);
    Actions.detalhesCliente();
    await this.props.alteraSkip(0);
    await this.props.alteraDataLoad([]);
    await this.props.isLoadingClientes('N');
    this.setState({
      maxReached: false,
    });
    await this.props.modificaSearchCliente('');
  };

  renderRow(cliente) {
    return (
      <TouchableHighlight
        onPress={() => {
          this.acessaDetalhes(cliente);
        }}
        underlayColor="transparent">
        <View style={styles.viewCliente}>
          <Text style={styles.txtTitle}>{cliente.Nome}</Text>
          <Text style={styles.txtAniver}>
            Aniversário:{' '}
            {cliente.Aniversario != null
              ? stringDataSemAno(cliente.Aniversario)
              : 'Não informado'}
          </Text>
          <Text style={styles.txtCadastro}>
            Cliente desde:{' '}
            {cliente.DataCadastro != null
              ? stringDataSemDia(cliente.DataCadastro)
              : 'Indisponível'}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }

  renderHeader = mostra => {
    if (mostra) {
      return (
        <View style={styles.viewPesquisar}>
          <SearchBar
            placeholder="Pesquise um nome aqui..."
            round
            editable={true}
            value={this.props.textoSearch}
            onChangeText={text => this.props.modificaSearchCliente(text)}
            containerStyle={styles.searchBar}
            searchIcon={false}
            onCancel={() => this.cancelSearch()}
          />
          <TouchableHighlight
            onPress={() => this.searchClientes()}
            style={styles.touchSearch}
            underlayColor="transparent">
            <Image
              source={require('../../imgs/btn_search.png')}
              style={[styles.menuIcon, styles.searchBarIcon]}
            />
          </TouchableHighlight>
        </View>
      );
    }
  };

  renderFooter = () => {
    if (this.props.loading === 'N') {
      return <View style={styles.loading} />;
    } else if (this.props.loading === 'S') {
      return (
        <View style={styles.loading}>
          <ActivityIndicator />
        </View>
      );
    } else if (this.props.loading === 'MAX') {
      if (this.props.data.length > 0) {
        return <View style={styles.viewSemRegistro} />;
      } else {
        return (
          <View style={styles.viewNenhumItem}>
            <Text style={styles.txtNenhumItem}>Nenhum resultado!</Text>
          </View>
        );
      }
    }
  };

  _renderErroServer(item) {
    if (item !== '') {
      return <Text style={styles.txtValidacaoServer}>{item}</Text>;
    }
  }

  render() {
    return (
      <View style={styles.viewPrincipal}>
        <Header titulo="Clientes" />
        {this._renderErroServer(this.props.validacaoListaClientes)}
        <FlatList
          ListHeaderComponent={this.renderHeader(this.props.mostraPesquisarCli)}
          data={this.props.data}
          renderItem={({item}) => this.renderRow(item)}
          keyExtractor={item => item.Codigo.toString()}
          onEndReached={this.loadClientes}
          onEndReachedThreshold={0.1}
          ListFooterComponent={this.renderFooter}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  token: state.LoginReducer.token,
  listaClientes: state.ClientesReducer.listaClientes,
  cdCliente: state.ClientesReducer.cdCliente,
  skip: state.ClientesReducer.skip,
  data: state.ClientesReducer.data,
  mostraPesquisarCli: state.ClientesReducer.mostraPesquisar,
  textoSearch: state.ClientesReducer.textoSearch,
  validacaoListaClientes: state.ClientesReducer.validacaoListaClientes,
  loading: state.ClientesReducer.loading,
});

export default connect(
  mapStateToProps,
  {
    filtraListaClientes,
    enviaCodigoCliente,
    alteraSkip,
    alteraDataLoad,
    modificaSearchCliente,
    mostraPesquisarClientes,
    isLoadingClientes,
    mostrarIconeFiltroClientes,
  },
)(ListaClientes);
