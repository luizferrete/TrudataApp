import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  BackHandler,
} from 'react-native';
import Header from '../header/Header';
import {connect} from 'react-redux';
import {
  buscaListaContatos,
  enviaCodigoContato,
  setModalFiltroVisible,
  alteraSkipContato,
  alteraDataLoadContato,
  isLoadingContatos,
  isMaxReachedContatos,
  alteraTipoContatoSelecionadoFiltro,
  mostrarIconeFiltroContatos,
} from '../../actions/ContatosActions';
import {TouchableHighlight} from 'react-native-gesture-handler';
import {Actions} from 'react-native-router-flux';
import {formatarData} from '../utils/Utils';
import FiltroContato from './FiltroContato';
import styles from './styles/ListaContatos.style';

const top = 6;

class ListaContatos extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = async () => {
    await this.firstLoad();
    await this.loadContatos();
    await this.props.mostrarIconeFiltroContatos(true);
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.backAction,
    );
  };

  componentWillUnmount() {
    //this.backHandler.remove();
    this.props.alteraSkipContato(0);
    this.props.alteraDataLoadContato([]);
    this.props.buscaListaContatos(this.props.token, 0, this.props.skip, top);
  }

  backAction = async () => {
    var todosAssuntos = {value: 0, label: 'Todos os assuntos'};
    await this.props.alteraSkipContato(0);
    await this.props.alteraDataLoadContato([]);
    await this.props.isLoadingContatos('N');
    await this.props.isMaxReachedContatos(false);
    await this.props.alteraTipoContatoSelecionadoFiltro(todosAssuntos);
    Actions.principal();

    return true;
  };

  firstLoad = async () => {
    await this.props.alteraSkipContato(0);
    await this.props.alteraDataLoadContato([]);
    await this.props.isMaxReachedContatos(false);
  };

  loadContatos = async () => {
    if (this.props.loading === 'S') {
      return;
    }

    if (!this.props.maxReached) {
      await this.props.isLoadingContatos('S');

      await this.props.buscaListaContatos(
        this.props.token,
        this.props.idTipoContatoSelecionadoFiltro,
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

  acessaDetalhes = async contato => {
    this.props.enviaCodigoContato(contato.Codigo);
    Actions.detalhesContato();
    var tudoObj = {value: 0, label: 'Todos os assuntos'};
    await this.props.alteraSkipContato(0);
    await this.props.alteraDataLoadContato([]);
    await this.props.isLoadingContatos('N');
    await this.props.isMaxReachedContatos(false);
    await this.props.alteraTipoContatoSelecionadoFiltro(tudoObj);
  };

  renderRow(contato) {
    if (contato.NomeCliente != null) {
      return (
        <TouchableHighlight
          onPress={() => {
            this.acessaDetalhes(contato);
          }}
          underlayColor="transparent">
          <View style={styles.viewContato}>
            <Text style={styles.txtTitle}>
              {formatarData(contato.DataContato)} - {contato.Descricao}
            </Text>
            <Text style={styles.txtNome}>Cliente: {contato.NomeCliente}</Text>
            <Text style={styles.txtStatus}>{contato.Status}</Text>
          </View>
        </TouchableHighlight>
      );
    } else {
      return (
        <TouchableHighlight
          onPress={() => {
            this.acessaDetalhes(contato);
          }}
          underlayColor="transparent">
          <View style={styles.viewContato}>
            <Text style={styles.txtTitle}>
              {formatarData(contato.DataContato)} - {contato.Descricao}
            </Text>
            <Text style={styles.txtNome}>
              Contato: {contato.NomeContatante}
            </Text>
            <Text style={styles.txtStatus}>{contato.Status}</Text>
          </View>
        </TouchableHighlight>
      );
    }
  }

  acessaNovoContato = async () => {
    Actions.novoContatoAssunto();
    await this.props.alteraSkipContato(0);
    await this.props.alteraDataLoadContato([]);
    await this.props.isLoadingContatos('N');
    await this.props.isMaxReachedContatos(false);
  };

  _renderErroServer(item) {
    if (item !== '') {
      return <Text style={styles.txtValidacaoServer}>{item}</Text>;
    }
  }

  render() {
    return (
      <View style={styles.viewPrincipal}>
        <Header titulo="Contatos" />
        {this._renderErroServer(this.props.validacaoListaContato)}
        <FlatList
          data={this.props.data}
          renderItem={({item}) => this.renderRow(item)}
          keyExtractor={item => item.Codigo.toString()}
          onEndReached={this.loadContatos}
          onEndReachedThreshold={0.1}
          ListFooterComponent={this.renderFooter}
        />
        <View style={styles.viewBtnAdicionar}>
          <TouchableHighlight
            underlayColor="transparent"
            onPress={() => this.acessaNovoContato()}
            style={styles.touchAdicionar}>
            <Image
              source={require('../../imgs/btn_adicionar.png')}
              style={styles.btnAdicionar}
            />
          </TouchableHighlight>
        </View>
        <FiltroContato />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  token: state.LoginReducer.token,
  listaContatos: state.ContatosReducer.listaContatos,
  cdContato: state.ContatosReducer.cdContato,
  modalVisible: state.ContatosReducer.modalFiltroVisible,
  skip: state.ContatosReducer.skip,
  data: state.ContatosReducer.data,
  loading: state.ContatosReducer.loading,
  maxReached: state.ContatosReducer.maxReached,
  idTipoContatoSelecionadoFiltro:
    state.ContatosReducer.idTipoContatoSelecionadoFiltro,
  validacaoListaContato: state.ContatosReducer.validacaoListaContato,
});

export default connect(
  mapStateToProps,
  {
    buscaListaContatos,
    enviaCodigoContato,
    setModalFiltroVisible,
    alteraSkipContato,
    alteraDataLoadContato,
    isLoadingContatos,
    isMaxReachedContatos,
    alteraTipoContatoSelecionadoFiltro,
    mostrarIconeFiltroContatos,
  },
)(ListaContatos);
