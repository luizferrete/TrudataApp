import React, {Component} from 'react';
import {
  View,
  TouchableHighlight,
  Image,
  StatusBar,
  Text,
  FlatList,
  ActivityIndicator,
  BackHandler,
} from 'react-native';
import {connect} from 'react-redux';
import {
  buscaListaCidades,
  alteraSkipCidade,
  alteraDataLoadCidade,
  modificaSearchSelecionaCidade,
  selecionaCidade,
  mostraBarraPesquisarCidade,
} from '../../actions/ContatosActions';
import {Actions} from 'react-native-router-flux';
import {SearchBar} from 'react-native-elements';
import styles from './styles/SelecionaCidade.style';

const top = 10;

class SelecionarCidade extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: 'N',
      maxReached: false,
    };
  }

  componentDidMount() {
    this.firstLoad();
    this.loadCidades();

    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.backAction,
    );
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  backAction = async () => {
    Actions.novoContato();
    await this.props.alteraSkipCidade(0);
    await this.props.alteraDataLoadCidade([]);
    this.setState({
      loading: 'N',
      maxReached: false,
    });
    this.props.modificaSearchSelecionaCidade('');
    this.props.mostraBarraPesquisarCidade(false);
    return true;
  };

  firstLoad = async () => {
    await this.props.alteraSkipCidade(0);
    await this.props.alteraDataLoadCidade([]);
    this.setState({maxReached: false});
  };

  loadCidades = async () => {
    if (this.state.loading === 'S') {
      return;
    }

    if (!this.state.maxReached) {
      this.setState({loading: 'S'});

      await this.props.buscaListaCidades(
        this.props.token,
        this.props.idEstadoSelecionado,
        this.props.textoSearch,
        this.props.skip,
        top,
      );
    }

    const response = this.props.listaCidades;

    if (response.length === 0) {
      this.setState({maxReached: true, loading: 'MAX'});
    }

    if (!this.state.maxReached) {
      await this.props.alteraSkipCidade(this.props.skip + top);
      await this.props.alteraDataLoadCidade([...this.props.data, ...response]);
      this.setState({
        loading: 'N',
      });
    }
    return;
  };

  searchCidades = async () => {
    await this.props.alteraSkipCidade(0);
    await this.props.alteraDataLoadCidade([]);
    this.setState({
      loading: 'S',
      maxReached: false,
    });

    await this.props.buscaListaCidades(
      this.props.token,
      this.props.idEstadoSelecionado,
      this.props.textoSearch,
      this.props.skip,
      top,
    );
    const response = this.props.listaCidades;

    if (response.length === 0) {
      this.setState({maxReached: true, loading: 'MAX'});
    }

    if (!this.state.maxReached) {
      await this.props.alteraSkipCidade(this.props.skip + top);
      await this.props.alteraDataLoadCidade([...this.props.data, ...response]);
      this.setState({
        loading: 'N',
      });
    }
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
      if (this.props.data.length === 0) {
        return (
          <View style={styles.loading}>
            <Text>Sem registros para exibir.</Text>
          </View>
        );
      } else {
        return (
          <View style={styles.loading}>
            <Text>Sem mais registros.</Text>
          </View>
        );
      }
    }
  };

  selectCidade = async cidade => {
    this.props.selecionaCidade(cidade.Codigo, cidade.Nome);
    Actions.novoContato();
    this.props.modificaSearchSelecionaCidade('');
    await this.props.alteraSkipCidade(0);
    await this.props.alteraDataLoadCidade([]);
    this.props.mostraBarraPesquisarCidade(false);
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
              this.props.modificaSearchSelecionaCidade(text)
            }
            containerStyle={styles.searchBar}
            searchIcon={false}
            onCancel={() => this.cancelSearch()}
          />
          <TouchableHighlight
            onPress={() => this.searchCidades()}
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
    await this.props.alteraSkipCidade(0);
    await this.props.alteraDataLoadCidade([]);
    await this.props.buscaListaCidades(
      this.props.token,
      this.props.idEstadoSelecionado,
      '',
      this.props.skip,
      top,
    );
  };

  renderRow(cidade) {
    return (
      <TouchableHighlight
        onPress={() => this.selectCidade(cidade)}
        underlayColor="#dbdcde">
        <View
          style={
            cidade.Codigo === this.props.idCidadeSelecionada
              ? [styles.viewCidade, {backgroundColor: '#dbdcde'}]
              : styles.viewCidade
          }>
          <Text style={styles.txtCidade}>{cidade.Nome}</Text>
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
            <Text style={styles.txtHeader}>Selecionar Cidade</Text>
          </View>
          <View>
            <TouchableHighlight
              onPress={() =>
                this.props.barraPesquisarVisivel
                  ? this.props.mostraBarraPesquisarCidade(false)
                  : this.props.mostraBarraPesquisarCidade(true)
              }
              underlayColor="rgb(41, 41, 41)">
              <Image
                source={require('../../imgs/btn_search.png')}
                style={styles.menuIcon}
              />
            </TouchableHighlight>
          </View>
        </View>

        <View style={styles.viewCidade}>
          {this._renderValidacaoLista(this.props.validacaoListaCidades)}
          <FlatList
            ListHeaderComponent={this.renderHeader(
              this.props.barraPesquisarVisivel,
            )}
            data={this.props.data}
            renderItem={({item}) => this.renderRow(item)}
            keyExtractor={item => item.Codigo.toString()}
            onEndReached={this.loadCidades}
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
  cidades: state.ContatosReducer.cidades,
  idCidadeSelecionada: state.ContatosReducer.idCidadeSelecionada,
  idEstadoSelecionado: state.ContatosReducer.idEstadoSelecionado,
  skip: state.ContatosReducer.skipCidade,
  data: state.ContatosReducer.dataCidade,
  textoSearch: state.ContatosReducer.textoSearchCidade,
  listaCidades: state.ContatosReducer.listaCidades,
  barraPesquisarVisivel: state.ContatosReducer.barraPesquisarCidadeVisivel,
  validacaoListaCidades: state.ContatosReducer.validacaoListaCidades,
});

export default connect(
  mapStateToProps,
  {
    buscaListaCidades,
    alteraSkipCidade,
    alteraDataLoadCidade,
    modificaSearchSelecionaCidade,
    selecionaCidade,
    mostraBarraPesquisarCidade,
  },
)(SelecionarCidade);
