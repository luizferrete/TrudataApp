import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Modal from 'react-native-modal';
import {connect} from 'react-redux';
import {
  buscaListaProdutos,
  enviaCodigoProduto,
  alteraSkipProdutos,
  alteraDataLoadProdutos,
  modificaSearchProduto,
  mostraPesquisarProdutos,
  isLoadingProdutos,
  alteraFiltroProdutoSelecionado,
  enviaCodigoProdutoCliente,
  setModalFiltroProdutosVisible,
  alteraMarcaSelecionada,
  buscaMarcas,
  alteraTamanhoSelecionado,
  buscaTamanhos,
  alteraCorSelecionada,
  buscaCores,
  alteraGrupoSelecionado,
  buscaGrupos,
  alteraSubgrupoSelecionado,
} from '../../actions/ProdutosAction';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import {SearchBar} from 'react-native-elements';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Icon from 'react-native-vector-icons/MaterialIcons';

const top = 10;

class FiltroProduto extends Component {
  searchProdutos = async () => {
    await this.props.setModalFiltroProdutosVisible(false);
    await this.props.alteraSkipProdutos(0);
    await this.props.alteraDataLoadProdutos([]);
    await this.props.isLoadingProdutos('S');
    this.setState({
      maxReached: false,
    });
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
  };

  _renderErroValidacao(item) {
    if (item !== '') {
      return <Text style={styles.txtValidacao}>{item}</Text>;
    }
  }

  render() {
    var filtroNome = {value: 0, label: 'Nome'};
    var filtroCodigo = {value: 1, label: 'Código'};
    return (
      <Modal
        style={styles.modal}
        isVisible={this.props.modalVisible}
        backdropOpacity={0.2}
        animationIn="bounceInUp"
        onBackdropPress={() => this.props.setModalFiltroProdutosVisible(false)}>
        <View style={styles.viewPrincipalModal}>
          <View style={styles.viewCabecalho}>
            <View style={styles.viewTxtFiltros}>
              <Text style={[styles.txtFiltros, styles.txtCabecalho]}>
                FILTROS
              </Text>
            </View>
            <TouchableHighlight
              onPress={() =>
                this.props.loading === 'S' ? false : this.searchProdutos()
              }
              underlayColor="transparent">
              <View style={styles.viewTxtAplicar}>
                <Text style={[styles.txtAplicar, styles.txtCabecalho]}>
                  APLICAR
                </Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={() => this.props.setModalFiltroProdutosVisible(false)}
              underlayColor="transparent">
              <View style={styles.viewTxtAplicar}>
                <Text style={[styles.txtFechar, styles.txtCabecalho]}>X</Text>
              </View>
            </TouchableHighlight>
          </View>
          <ScrollView style={styles.viewRadioButtons}>
            <View style={styles.viewBarraPesquisar}>
              <View style={styles.viewSelectPesquisa}>
                <RadioForm formHorizontal={true}>
                  <Text
                    style={[styles.txtCabecalho, styles.txtFiltrarPorAssunto]}>
                    Pesquisar por:
                  </Text>
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
                    this.props.valueFiltroProdutoSelecionado ===
                    filtroCodigo.value
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
                  lightTheme={true}
                />
              </View>
              <View style={styles.viewItem}>
                <SafeAreaView>
                  <Text style={styles.txtDesc}>Marca:</Text>
                  {this._renderErroValidacao(this.props.validacaoMarcas)}
                  <SectionedMultiSelect
                    items={this.props.marcas}
                    IconRenderer={Icon}
                    single={true}
                    uniqueKey="value"
                    displayKey="label"
                    selectText={this.props.labelMarcaSelecionada}
                    confirmText="Cancelar"
                    searchPlaceholderText="Pesquisar marca"
                    noResultsComponent={
                      <Text style={styles.txtSemResultado}>
                        Sem resultados.
                      </Text>
                    }
                    noItemsComponent={
                      <Text style={styles.txtSemResultado}>
                        Sem itens encontrados.
                      </Text>
                    }
                    onSelectedItemsChange={item => {
                      this.props.alteraMarcaSelecionada(
                        item[0],
                        this.props.marcas,
                      );
                    }}
                    onConfirm={obj =>
                      this.props.alteraMarcaSelecionada(null, null)
                    }
                    onToggleSelector={obj => {
                      if (obj) {
                        if (this.props.marcas.length === 0) {
                          this.props.buscaMarcas(this.props.token);
                        }
                      }
                    }}
                  />
                </SafeAreaView>
              </View>
              <View style={styles.viewItem}>
                <SafeAreaView>
                  <Text style={styles.txtDesc}>Tamanho:</Text>
                  {this._renderErroValidacao(this.props.validacaoTamanhos)}
                  <SectionedMultiSelect
                    items={this.props.tamanhos}
                    IconRenderer={Icon}
                    single={true}
                    uniqueKey="value"
                    displayKey="label"
                    selectText={this.props.labelTamanhoSelecionado}
                    confirmText="Cancelar"
                    searchPlaceholderText="Pesquisar tamanho"
                    noResultsComponent={
                      <Text style={styles.txtSemResultado}>
                        Sem resultados.
                      </Text>
                    }
                    noItemsComponent={
                      <Text style={styles.txtSemResultado}>
                        Sem itens encontrados.
                      </Text>
                    }
                    onSelectedItemsChange={item => {
                      this.props.alteraTamanhoSelecionado(
                        item[0],
                        this.props.tamanhos,
                      );
                    }}
                    onConfirm={obj =>
                      this.props.alteraTamanhoSelecionado(null, null)
                    }
                    onToggleSelector={obj => {
                      if (obj) {
                        if (this.props.tamanhos.length === 0) {
                          this.props.buscaTamanhos(this.props.token);
                        }
                      }
                    }}
                  />
                </SafeAreaView>
              </View>
              <View style={styles.viewItem}>
                <SafeAreaView>
                  <Text style={styles.txtDesc}>Cor:</Text>
                  {this._renderErroValidacao(this.props.validacaoCores)}
                  <SectionedMultiSelect
                    items={this.props.cores}
                    IconRenderer={Icon}
                    single={true}
                    uniqueKey="value"
                    displayKey="label"
                    selectText={this.props.labelCorSelecionada}
                    confirmText="Cancelar"
                    searchPlaceholderText="Pesquisar cor"
                    noResultsComponent={
                      <Text style={styles.txtSemResultado}>
                        Sem resultados.
                      </Text>
                    }
                    noItemsComponent={
                      <Text style={styles.txtSemResultado}>
                        Sem itens encontrados.
                      </Text>
                    }
                    onSelectedItemsChange={item => {
                      this.props.alteraCorSelecionada(
                        item[0],
                        this.props.cores,
                      );
                    }}
                    onConfirm={obj =>
                      this.props.alteraCorSelecionada(null, null)
                    }
                    onToggleSelector={obj => {
                      if (obj) {
                        if (this.props.cores.length === 0) {
                          this.props.buscaCores(this.props.token);
                        }
                      }
                    }}
                  />
                </SafeAreaView>
              </View>
              <View style={styles.viewItem}>
                <SafeAreaView>
                  <Text style={styles.txtDesc}>Subgrupo:</Text>
                  {this._renderErroValidacao(this.props.validacaoGrupos)}
                  <SectionedMultiSelect
                    items={this.props.grupos}
                    IconRenderer={Icon}
                    single={true}
                    uniqueKey="value"
                    displayKey="label"
                    subKey="SubGrupos"
                    selectText={this.props.labelSubgrupoSelecionado}
                    confirmText="Cancelar"
                    searchPlaceholderText="Pesquisar subgrupo"
                    noResultsComponent={
                      <Text style={styles.txtSemResultado}>
                        Sem resultados.
                      </Text>
                    }
                    noItemsComponent={
                      <Text style={styles.txtSemResultado}>
                        Sem itens encontrados.
                      </Text>
                    }
                    showDropDowns={true}
                    readOnlyHeadings={true}
                    onSelectedItemsChange={item => {
                      this.props.alteraSubgrupoSelecionado(
                        item[0],
                        this.props.grupos,
                      );
                    }}
                    onConfirm={obj =>
                      this.props.alteraSubgrupoSelecionado(null, null)
                    }
                    onToggleSelector={obj => {
                      if (obj) {
                        if (this.props.grupos.length === 0) {
                          this.props.buscaGrupos(this.props.token);
                        }
                      }
                    }}
                  />
                </SafeAreaView>
              </View>
            </View>
            <TouchableHighlight
              onPress={() => {
                this.props.alteraSubgrupoSelecionado(null, null);
                this.props.alteraCorSelecionada(null, null);
                this.props.alteraMarcaSelecionada(null, null);
                this.props.alteraTamanhoSelecionado(null, null);
              }}
              underlayColor="transparent">
              <View style={styles.viewTxtCancelarFiltro}>
                <Text style={[styles.txtCancelarFiltro, styles.txtCabecalho]}>
                  Cancelar filtros
                </Text>
              </View>
            </TouchableHighlight>
          </ScrollView>
        </View>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  token: state.LoginReducer.token,
  modalVisible: state.ProdutosReducer.modalFiltroProdutoVisible,
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
  marcas: state.ProdutosReducer.marcas,
  idMarcaSelecionada: state.ProdutosReducer.idMarcaSelecionada,
  labelMarcaSelecionada: state.ProdutosReducer.labelMarcaSelecionada,
  validacaoMarcas: state.ProdutosReducer.validacaoMarcas,
  tamanhos: state.ProdutosReducer.tamanhos,
  idTamanhoSelecionado: state.ProdutosReducer.idTamanhoSelecionado,
  labelTamanhoSelecionado: state.ProdutosReducer.labelTamanhoSelecionado,
  validacaoTamanhos: state.ProdutosReducer.validacaoTamanhos,
  cores: state.ProdutosReducer.cores,
  idCorSelecionada: state.ProdutosReducer.idCorSelecionada,
  labelCorSelecionada: state.ProdutosReducer.labelCorSelecionada,
  validacaoCores: state.ProdutosReducer.validacaoCores,
  grupos: state.ProdutosReducer.grupos,
  validacaoGrupos: state.ProdutosReducer.validacaoGrupos,
  idSubgrupoSelecionado: state.ProdutosReducer.idSubgrupoSelecionado,
  labelSubgrupoSelecionado: state.ProdutosReducer.labelSubgrupoSelecionado,
});

export default connect(
  mapStateToProps,
  {
    setModalFiltroProdutosVisible,
    buscaListaProdutos,
    enviaCodigoProduto,
    enviaCodigoProdutoCliente,
    alteraSkipProdutos,
    alteraDataLoadProdutos,
    modificaSearchProduto,
    mostraPesquisarProdutos,
    isLoadingProdutos,
    alteraFiltroProdutoSelecionado,
    buscaMarcas,
    alteraMarcaSelecionada,
    alteraTamanhoSelecionado,
    buscaTamanhos,
    alteraCorSelecionada,
    buscaCores,
    alteraGrupoSelecionado,
    buscaGrupos,
    alteraSubgrupoSelecionado,
  },
)(FiltroProduto);

const styles = StyleSheet.create({
  modal: {
    margin: 35,
  },
  viewPrincipalModal: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  viewCabecalho: {
    backgroundColor: '#edeff2',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#7e848c',
  },
  viewPesquisar: {
    borderBottomWidth: 1,
    borderColor: '#7e848c',
  },
  viewTxtFiltros: {
    flex: 4,
    padding: 5,
  },
  viewTxtAplicar: {
    flex: 2,
  },
  txtCabecalho: {
    padding: 15,
    fontWeight: 'bold',
  },
  txtFiltros: {
    color: '#7e848c',
  },
  txtAplicar: {
    borderRadius: 10,
    margin: 5,
    color: '#fff',
    backgroundColor: '#1f91f3',
  },
  txtFechar: {
    borderRadius: 10,
    margin: 5,
    color: '#fff',
    backgroundColor: '#c60905',
  },
  txtFiltrarPorAssunto: {
    color: '#474a4f',
  },
  radioButton: {
    paddingBottom: 10,
    marginTop: 6,
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
  txtDesc: {
    padding: 5,
    paddingLeft: 15,
    paddingTop: 10,
    fontWeight: 'bold',
  },
  txtSemResultado: {
    textAlign: 'center',
    fontSize: 16,
    color: '#474a4f',
  },
  txtValidacao: {
    color: '#c60905',
    fontSize: 12,
    paddingLeft: 15,
  },
  viewTxtCancelarFiltro: {
    backgroundColor: '#3f51b5',
    borderRadius: 10,
    margin: 5,
  },
  txtCancelarFiltro: {
    color: '#fff',
    alignSelf: 'center',
  },
});
