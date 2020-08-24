import React, {Component} from 'react';
import {
  View,
  TouchableHighlight,
  Image,
  StyleSheet,
  StatusBar,
  Text,
  FlatList,
  ActivityIndicator,
  BackHandler,
} from 'react-native';
import {connect} from 'react-redux';
import {
  selecionaCliente,
  mostraBarraPesquisar,
  modificaSearchSelecionaCliente,
} from '../../actions/ContatosActions';
import {
  buscaListaClientes,
  filtraListaClientes,
  alteraSkip,
  alteraDataLoad,
} from '../../actions/ClientesActions';
import {Actions} from 'react-native-router-flux';
import {SearchBar} from 'react-native-elements';

const top = 15;

class SelecionarCliente extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: 'N',
      maxReached: false,
    };
  }

  componentDidMount() {
    this.firstLoad();
    this.loadClientes();

    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.backAction,
    );
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  firstLoad = async () => {
    await this.props.alteraSkip(0);
    await this.props.alteraDataLoad([]);
    this.setState({maxReached: false});
  };

  loadClientes = async () => {
    if (this.state.loading === 'S') {
      return;
    }

    if (!this.state.maxReached) {
      this.setState({loading: 'S'});

      await this.props.filtraListaClientes(
        this.props.token,
        this.props.textoSearch,
        this.props.skip,
        top,
      );
    }

    const response = this.props.listaClientes;

    if (response.length === 0) {
      this.setState({maxReached: true, loading: 'MAX'});
    }

    if (!this.state.maxReached) {
      await this.props.alteraSkip(this.props.skip + top);
      await this.props.alteraDataLoad([...this.props.data, ...response]);
      this.setState({
        loading: 'N',
      });
    }
    return;
  };

  searchClientes = async () => {
    await this.props.alteraSkip(0);
    await this.props.alteraDataLoad([]);
    this.setState({
      loading: 'S',
      maxReached: false,
    });
    console.log(this.props.data);
    await this.props.filtraListaClientes(
      this.props.token,
      this.props.textoSearch,
      this.props.skip,
      top,
    );
    const response = this.props.listaClientes;

    if (response.length === 0) {
      this.setState({maxReached: true, loading: 'MAX'});
    }

    if (!this.state.maxReached) {
      await this.props.alteraSkip(this.props.skip + top);
      await this.props.alteraDataLoad([...this.props.data, ...response]);
      this.setState({
        loading: 'N',
      });
    }
  };

  backAction = async () => {
    Actions.novoContato();
    await this.props.alteraSkip(0);
    await this.props.alteraDataLoad([]);
    this.setState({
      loading: 'N',
      maxReached: false,
    });
    this.props.modificaSearchSelecionaCliente('');
    this.props.mostraBarraPesquisar(false);
    return true;
  };

  renderHeader = mostraBarra => {
    if (mostraBarra) {
      return (
        <View style={styles.viewPesquisar}>
          <SearchBar
            placeholder="Pesquise aqui..."
            round
            editable={true}
            value={this.props.textoSearch}
            onChangeText={text =>
              this.props.modificaSearchSelecionaCliente(text)
            }
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
    } else {
      return;
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

  renderFooter = () => {
    if (this.state.loading === 'N') {
      return <View style={styles.loading} />;
    } else if (this.state.loading === 'S') {
      return (
        <View style={styles.loading}>
          <ActivityIndicator />
        </View>
      );
    } else if (this.state.loading === 'MAX') {
      return (
        <View style={styles.loading}>
          <Text>Sem mais registros.</Text>
        </View>
      );
    }
  };

  selectCliente = async cliente => {
    this.props.selecionaCliente(cliente.Codigo, cliente.Nome);
    Actions.novoContato();
    this.props.modificaSearchSelecionaCliente('');
    await this.props.alteraSkip(0);
    await this.props.alteraDataLoad([]);
    this.props.mostraBarraPesquisar(false);
  };

  renderRow(cliente) {
    return (
      <TouchableHighlight
        onPress={() => this.selectCliente(cliente)}
        underlayColor="#dbdcde">
        <View
          style={
            cliente.Codigo === this.props.idClienteSelecionado
              ? [styles.viewCliente, {backgroundColor: '#dbdcde'}]
              : styles.viewCliente
          }>
          <Text style={styles.txtCliente}>{cliente.Nome}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  _renderValidacaoLista(item) {
    if (item !== '') {
      return <Text style={styles.txtValidacao}>{item}</Text>;
    }
  }

  render() {
    return (
      <View style={styles.viewPrincipal}>
        <View style={styles.viewHeader}>
          <StatusBar backgroundColor="rgb(41, 41, 41)" />
          <View style={styles.viewMenuIcon}>
            <TouchableHighlight
              onPress={() => this.backAction()}
              underlayColor="rgb(41, 41, 41)">
              <Image
                source={require('../../imgs/btn_voltar.png')}
                style={styles.menuIcon}
              />
            </TouchableHighlight>
          </View>
          <View style={styles.viewHeaderText}>
            <Text style={styles.txtHeader}>Selecionar Cliente</Text>
          </View>
          <View>
            <TouchableHighlight
              onPress={() =>
                this.props.barraPesquisarVisivel
                  ? this.props.mostraBarraPesquisar(false)
                  : this.props.mostraBarraPesquisar(true)
              }
              underlayColor="rgb(41, 41, 41)">
              <Image
                source={require('../../imgs/btn_search.png')}
                style={styles.menuIcon}
              />
            </TouchableHighlight>
          </View>
        </View>

        <View style={styles.viewClientes}>
          {this._renderValidacaoLista(this.props.validacaoListaClientes)}
          <FlatList
            ListHeaderComponent={this.renderHeader(
              this.props.barraPesquisarVisivel,
            )}
            data={this.props.data}
            renderItem={({item}) => this.renderRow(item)}
            keyExtractor={item => item.Codigo.toString()}
            onEndReached={this.loadClientes}
            onEndReachedThreshold={0.1}
            ListFooterComponent={this.renderFooter}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  token: state.LoginReducer.token,
  listaClientes: state.ClientesReducer.listaClientes,
  idClienteSelecionado: state.ContatosReducer.idClienteSelecionado,
  barraPesquisarVisivel: state.ContatosReducer.barraPesquisarVisivel,
  textoSearch: state.ContatosReducer.textoSearch,
  skip: state.ClientesReducer.skip,
  data: state.ClientesReducer.data,
  validacaoListaClientes: state.ClientesReducer.validacaoListaClientes,
});

export default connect(
  mapStateToProps,
  {
    buscaListaClientes,
    selecionaCliente,
    mostraBarraPesquisar,
    filtraListaClientes,
    modificaSearchSelecionaCliente,
    alteraSkip,
    alteraDataLoad,
  },
)(SelecionarCliente);

const styles = StyleSheet.create({
  viewPrincipal: {
    flex: 1,
  },
  viewHeader: {
    backgroundColor: 'rgb(41, 41, 41)',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  viewMenuIcon: {
    flex: 1,
    alignItems: 'center',
  },
  viewLogo: {
    flex: 6,
    alignItems: 'center',
  },
  menuIcon: {
    height: 5,
    width: 5,
    resizeMode: 'contain',
    margin: 10,
    padding: 10,
  },
  viewHeaderText: {
    flex: 6,
    alignItems: 'flex-start',
    alignSelf: 'center',
    marginLeft: 20,
    flexDirection: 'row',
  },
  txtHeader: {
    fontSize: 20,
    color: '#FFF',
  },
  txtCliente: {
    color: '#474a4f',
    fontSize: 17,
  },
  viewCliente: {
    paddingTop: 18,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderColor: '#dbdcde',
  },
  viewPesquisar: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#393e42',
  },
  searchBar: {
    flex: 1,
    alignItems: 'flex-end',
  },
  searchBarIcon: {
    flex: 1,
  },
  touchSearch: {
    borderColor: '#000',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  loading: {
    marginTop: 20,
    marginBottom: 80,
  },
  txtValidacao: {
    backgroundColor: '#FF4444',
    color: '#FFFFFF',
    padding: 15,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    fontWeight: 'bold',
    borderRadius: 10,
  },
});
