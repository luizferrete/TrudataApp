import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  BackHandler,
  ActivityIndicator,
} from 'react-native';
import Header from '../header/Header';
import {connect} from 'react-redux';
import {
  buscaListaProdutos,
  enviaCodigoProduto,
  alteraSkipProdutos,
  alteraDataLoadProdutos,
  modificaSearchProduto,
  mostraPesquisarProdutos,
  isLoadingProdutos,
  mostrarIconeFiltroProdutos,
  alteraFiltroProdutoSelecionado,
  enviaCodigoProdutoCliente,
  alteraTamanhoSelecionado,
  alteraMarcaSelecionada,
  alteraCorSelecionada,
  alteraGrupoSelecionado,
  alteraSubgrupoSelecionado,
  alteraPesquisaAtiva,
} from '../../actions/ProdutosAction';
import {TouchableHighlight} from 'react-native-gesture-handler';
import {formatarCurrency} from '../utils/Utils';
import {Actions} from 'react-native-router-flux';
import FastImage from 'react-native-fast-image';
import FiltroProduto from './FiltroProduto';
import styles from './styles/ListaProdutos.style';

const top = 10;

class ListaProdutos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      maxReached: false,
    };
  }

  componentDidMount = async () => {
    await this.firstLoad();
    await this.loadProdutos();
    await this.props.mostrarIconeFiltroProdutos(true);
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.backAction,
    );
  };

  componentWillUnmount() {
    //this.backHandler.remove();
    this.props.alteraSkipProdutos(0);
    this.props.alteraDataLoadProdutos([]);
    this.props.isLoadingProdutos('N');
    this.props.alteraTamanhoSelecionado(null, null);
    this.props.alteraMarcaSelecionada(null, null);
    this.props.alteraCorSelecionada(null, null);
    this.props.alteraGrupoSelecionado(null, null);
    this.props.alteraSubgrupoSelecionado(null, null);
    this.props.alteraPesquisaAtiva(false);
    this.props.buscaListaProdutos(
      this.props.token,
      '',
      this.props.skip,
      top,
      this.props.valueFiltroProdutoSelecionado,
      this.props.idMarcaSelecionada,
      this.props.idTamanhoSelecionado,
      this.props.idCorSelecionada,
      this.props.idSubgrupoSelecionado,
    );
  }

  backAction = async () => {
    Actions.principal();
    await this.props.alteraSkipProdutos(0);
    await this.props.alteraDataLoadProdutos([]);
    await this.props.isLoadingProdutos('N');
    this.setState({
      maxReached: false,
    });
    await this.props.alteraTamanhoSelecionado(null, null);
    await this.props.alteraMarcaSelecionada(null, null);
    await this.props.alteraCorSelecionada(null, null);
    await this.props.alteraGrupoSelecionado(null, null);
    await this.props.alteraSubgrupoSelecionado(null, null);
    await this.props.modificaSearchProduto('');
    await this.props.alteraPesquisaAtiva(false);
    await this.props.mostraPesquisarProdutos(false);
    return true;
  };

  firstLoad = async () => {
    await this.props.alteraSkipProdutos(0);
    await this.props.alteraDataLoadProdutos([]);
    await this.props.isLoadingProdutos('N');
    this.setState({maxReached: false});
  };

  loadProdutos = async () => {
    if (this.props.loading === 'S') {
      return;
    }

    if (!this.state.maxReached) {
      await this.props.isLoadingProdutos('S');

      await this.props.buscaListaProdutos(
        this.props.token,
        this.props.textoSearch,
        this.props.skip,
        top,
        this.props.valueFiltroProdutoSelecionado,
        this.props.idMarcaSelecionada,
        this.props.idTamanhoSelecionado,
        this.props.idCorSelecionada,
        this.props.idSubgrupoSelecionado,
      );
    }

    const response = this.props.listaProdutos;

    if (response.length === 0) {
      await this.props.isLoadingProdutos('MAX');
      this.setState({maxReached: true});
    }

    if (!this.state.maxReached) {
      await this.props.alteraSkipProdutos(this.props.skip + top);
      await this.props.alteraDataLoadProdutos([
        ...this.props.data,
        ...response,
      ]);
    }
    return;
  };

  cancelSearch = async () => {
    await this.props.alteraSkipProdutos(0);
    await this.props.alteraDataLoadProdutos([]);
    await this.props.alteraTamanhoSelecionado(null, null);
    await this.props.alteraMarcaSelecionada(null, null);
    await this.props.alteraCorSelecionada(null, null);
    await this.props.alteraSubgrupoSelecionado(null, null);
    await this.props.alteraGrupoSelecionado(null, null);
    await this.props.alteraPesquisaAtiva(false);
    await this.props.buscaListaProdutos(
      this.props.token,
      '',
      this.props.skip,
      top,
      this.props.valueFiltroProdutoSelecionado,
      this.props.idMarcaSelecionada,
      this.props.idTamanhoSelecionado,
      this.props.idCorSelecionada,
      this.props.idSubgrupoSelecionado,
    );
  };

  acessaDetalhes = async produto => {
    this.props.enviaCodigoProduto(produto.Codigo);
    this.props.enviaCodigoProdutoCliente(produto.CodigoCliente);
    Actions.detalhesProduto();
    await this.props.alteraSkipProdutos(0);
    await this.props.alteraDataLoadProdutos([]);
    await this.props.isLoadingProdutos('N');
    this.setState({
      maxReached: false,
    });
  };

  renderRow(produto) {
    let imgUrl = {uri: produto.Imagem};
    var img =
      produto.Imagem == null
        ? require('../../imgs/photo_placeholder.png')
        : imgUrl;
    return (
      <TouchableHighlight
        onPress={() => {
          this.acessaDetalhes(produto);
        }}
        underlayColor="transparent">
        <View style={styles.viewProduto}>
          <FastImage
            source={img}
            resizeMode={FastImage.resizeMode.contain}
            style={styles.imgProduto}
          />
          <View style={styles.viewInfosProduto}>
            <Text style={styles.txtDesc}>{produto.Descricao}</Text>
            <Text style={styles.txtMarca}>{produto.Marca}</Text>
            <Text style={styles.txtPreco}>
              {formatarCurrency(produto.PrecoVenda)}
            </Text>
            <Text style={styles.txtMarca}>Cód. {produto.CodigoCliente}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

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

  _renderLinhaFiltroAtivo(desc, id) {
    if (id !== '') {
      return (
        <View style={styles.viewLinhaFiltroAtivo}>
          <Text style={styles.txtDescFiltro}>{desc}: </Text>
          <Text style={styles.txtLabelFiltro}>{id}</Text>
        </View>
      );
    }
  }

  _renderFiltrosAtivos() {
    if (this.props.pesquisaAtiva === true) {
      return (
        <View style={styles.viewFiltrosAtivos}>
          <View style={styles.viewLinhaFiltroAtivo}>
            <Text style={styles.txtFiltrosAtivos}>Filtros Ativos</Text>
          </View>
          {this._renderLinhaFiltroAtivo(
            'Codigo/Desc',
            this.props.filtroCodDescAtivo,
          )}
          {this._renderLinhaFiltroAtivo('Marca', this.props.filtroMarcaAtivo)}
          {this._renderLinhaFiltroAtivo(
            'Tamanho',
            this.props.filtroTamanhoAtivo,
          )}
          {this._renderLinhaFiltroAtivo('Cor', this.props.filtroCorAtivo)}
          {this._renderLinhaFiltroAtivo(
            'Subgrupo',
            this.props.filtroSubgrupoAtivo,
          )}
        </View>
      );
    }
  }

  render() {
    return (
      <View style={styles.viewPrincipal}>
        <Header titulo="Produtos" />
        {this._renderErroServer(this.props.validacaoListaProduto)}
        <View style={styles.viewLista}>
          {this._renderFiltrosAtivos()}
          <FlatList
            data={this.props.data}
            renderItem={({item}) => this.renderRow(item)}
            keyExtractor={item => item.Codigo.toString()}
            onEndReached={this.loadProdutos}
            onEndReachedThreshold={0.1}
            ListFooterComponent={this.renderFooter}
          />
        </View>
        <FiltroProduto />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  token: state.LoginReducer.token,
  listaProdutos: state.ProdutosReducer.listaProdutos,
  cdProduto: state.ProdutosReducer.cdProduto,
  skip: state.ProdutosReducer.skip,
  data: state.ProdutosReducer.data,
  mostraPesquisarProd: state.ProdutosReducer.mostraPesquisar,
  textoSearch: state.ProdutosReducer.textoSearch,
  validacaoListaProduto: state.ProdutosReducer.validacaoListaProduto,
  loading: state.ProdutosReducer.loading,
  valueFiltroProdutoSelecionado:
    state.ProdutosReducer.valueFiltroProdutoSelecionado,
  idMarcaSelecionada: state.ProdutosReducer.idMarcaSelecionada,
  idTamanhoSelecionado: state.ProdutosReducer.idTamanhoSelecionado,
  idCorSelecionada: state.ProdutosReducer.idCorSelecionada,
  idSubgrupoSelecionado: state.ProdutosReducer.idSubgrupoSelecionado,
  labelMarcaSelecionada: state.ProdutosReducer.labelMarcaSelecionada,
  labelTamanhoSelecionado: state.ProdutosReducer.labelTamanhoSelecionado,
  labelCorSelecionada: state.ProdutosReducer.labelCorSelecionada,
  labelSubgrupoSelecionado: state.ProdutosReducer.labelSubgrupoSelecionado,
  pesquisaAtiva: state.ProdutosReducer.pesquisaAtiva,
  filtroMarcaAtivo: state.ProdutosReducer.filtroMarcaAtivo,
  filtroTamanhoAtivo: state.ProdutosReducer.filtroTamanhoAtivo,
  filtroCorAtivo: state.ProdutosReducer.filtroCorAtivo,
  filtroSubgrupoAtivo: state.ProdutosReducer.filtroSubgrupoAtivo,
  filtroCodDescAtivo: state.ProdutosReducer.filtroCodDescAtivo,
});

export default connect(
  mapStateToProps,
  {
    buscaListaProdutos,
    enviaCodigoProduto,
    enviaCodigoProdutoCliente,
    alteraSkipProdutos,
    alteraDataLoadProdutos,
    modificaSearchProduto,
    mostraPesquisarProdutos,
    isLoadingProdutos,
    mostrarIconeFiltroProdutos,
    alteraFiltroProdutoSelecionado,
    alteraTamanhoSelecionado,
    alteraMarcaSelecionada,
    alteraCorSelecionada,
    alteraGrupoSelecionado,
    alteraSubgrupoSelecionado,
    alteraPesquisaAtiva,
  },
)(ListaProdutos);
