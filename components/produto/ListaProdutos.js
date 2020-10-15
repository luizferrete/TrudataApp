import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
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
} from '../../actions/ProdutosAction';
import {TouchableHighlight} from 'react-native-gesture-handler';
import {formatarCurrency} from '../utils/Utils';
import {Actions} from 'react-native-router-flux';
import {SearchBar} from 'react-native-elements';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import FastImage from 'react-native-fast-image';
import FiltroProduto from './FiltroProduto';

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
    await this.props.modificaSearchProduto('');
    await this.props.alteraTamanhoSelecionado(null, null);
    await this.props.alteraMarcaSelecionada(null, null);
    await this.props.alteraCorSelecionada(null, null);
    await this.props.alteraGrupoSelecionado(null, null);
    await this.props.alteraSubgrupoSelecionado(null, null);
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

  renderHeader = mostra => {
    var filtroNome = {value: 0, label: 'Nome'};
    var filtroCodigo = {value: 1, label: 'Código'};
    if (mostra) {
      return (
        <View style={styles.viewBarraPesquisar}>
          <View style={styles.viewSelectPesquisa}>
            <Text style={styles.txtPesquisa}>Pesquisar por:</Text>
            <RadioForm formHorizontal={true}>
              <RadioButton
                labelHorizontal={true}
                key={filtroCodigo.value}
                selectedButtonColor={'#009688'}
                style={styles.radioButton}>
                <RadioButtonInput
                  obj={filtroCodigo}
                  index={filtroCodigo.value}
                  isSelected={
                    this.props.valueFiltroProdutoSelecionado ===
                    filtroCodigo.value
                  }
                  onPress={() =>
                    this.props.alteraFiltroProdutoSelecionado(filtroCodigo)
                  }
                  borderWidth={1}
                  buttonColor={'#009688'}
                  buttonSize={8}
                  buttonOuterSize={16}
                  buttonWrapStyle={styles.buttonWrapStyle}
                />
                <RadioButtonLabel
                  obj={filtroCodigo}
                  index={filtroCodigo.value}
                  labelHorizontal={true}
                  onPress={() =>
                    this.props.alteraFiltroProdutoSelecionado(filtroCodigo)
                  }
                  labelStyle={styles.radioButtonLabel}
                />
              </RadioButton>
              <RadioButton
                labelHorizontal={true}
                key={filtroNome.value}
                selectedButtonColor={'#009688'}
                style={styles.radioButton}>
                <RadioButtonInput
                  obj={filtroNome}
                  index={filtroNome.value}
                  isSelected={
                    this.props.valueFiltroProdutoSelecionado ===
                    filtroNome.value
                  }
                  onPress={() =>
                    this.props.alteraFiltroProdutoSelecionado(filtroNome)
                  }
                  borderWidth={1}
                  buttonColor={'#009688'}
                  buttonSize={8}
                  buttonOuterSize={16}
                  buttonWrapStyle={styles.buttonWrapStyle}
                />
                <RadioButtonLabel
                  obj={filtroNome}
                  index={filtroNome.value}
                  labelHorizontal={true}
                  onPress={() =>
                    this.props.alteraFiltroProdutoSelecionado(filtroNome)
                  }
                  labelStyle={styles.radioButtonLabel}
                />
              </RadioButton>
            </RadioForm>
          </View>
          <View style={styles.viewPesquisar}>
            <SearchBar
              keyboardType={
                this.props.valueFiltroProdutoSelecionado === filtroCodigo.value
                  ? 'numeric'
                  : 'default'
              }
              placeholder="Pesquise aqui..."
              round
              editable={true}
              value={this.props.textoSearch}
              onChangeText={text => this.props.modificaSearchProduto(text)}
              containerStyle={styles.searchBar}
              searchIcon={false}
              onCancel={() => this.cancelSearch()}
            />
            <TouchableHighlight
              onPress={() =>
                this.props.loading === 'S' ? false : this.searchProdutos()
              }
              style={styles.touchSearch}
              underlayColor="transparent">
              <Image
                source={require('../../imgs/btn_search.png')}
                style={[styles.menuIcon, styles.searchBarIcon]}
              />
            </TouchableHighlight>
          </View>
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
      return <View style={styles.viewSemRegistro} />;
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
        <Header titulo="Produtos" />
        {this.renderHeader(this.props.mostraPesquisarProd)}
        {this._renderErroServer(this.props.validacaoListaProduto)}
        <View style={styles.viewLista}>
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
  },
)(ListaProdutos);

const styles = StyleSheet.create({
  viewPrincipal: {
    flex: 1,
    backgroundColor: '#edeff2',
  },
  viewProduto: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 10,
    margin: 10,
    flexDirection: 'row',
    elevation: 4,
  },
  imgProduto: {
    resizeMode: 'contain',
    width: 80,
    height: 80,
  },
  viewInfosProduto: {
    flexDirection: 'column',
    marginLeft: 10,
  },
  txtDesc: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  txtMarca: {
    color: '#7e848c',
  },
  txtPreco: {
    fontSize: 16,
    color: '#ff5252',
    fontWeight: 'bold',
  },
  viewLista: {
    flex: 10,
  },
  viewPesquisar: {
    flexDirection: 'row',
    backgroundColor: '#393e42',
  },
  viewSelectPesquisa: {
    flexDirection: 'row',
    backgroundColor: '#393e42',
  },
  searchBar: {
    flex: 1,
    alignItems: 'flex-end',
  },
  menuIcon: {
    height: 5,
    width: 5,
    resizeMode: 'contain',
    margin: 22,
    padding: 10,
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
  txtValidacaoServer: {
    backgroundColor: '#FF4444',
    color: '#FFFFFF',
    padding: 15,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    fontWeight: 'bold',
    borderRadius: 10,
  },
  viewSemRegistro: {
    margin: 10,
    borderBottomWidth: 2,
    borderColor: '#edeff2',
  },
  radioButton: {
    paddingBottom: 10,
    //borderColor: '#b3b3b3',
    //borderBottomWidth: 1,
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
    fontSize: 15,
    color: '#FFF',
    marginTop: 8,
    paddingRight: 20,
  },
  txtPesquisa: {
    fontSize: 15,
    color: '#FFF',
    marginTop: 8,
    marginLeft: 10,
  },
});
