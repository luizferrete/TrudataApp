import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableHighlight, Picker} from 'react-native';
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
  mostrarIconeFiltroProdutos,
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
  buscaSubgrupos,
} from '../../actions/ProdutosAction';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import {SearchBar} from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';

const top = 10;

class FiltroProduto extends Component {
  componentDidMount() {
    this.props.buscaMarcas(this.props.token);
    this.props.buscaTamanhos(this.props.token);
    this.props.buscaCores(this.props.token);
    this.props.buscaGrupos(this.props.token);
  }

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
          <View style={styles.viewRadioButtons}>
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
                <Text style={styles.txtDesc}>Marcas:</Text>
                <DropDownPicker
                  placeholder="Selecione..."
                  items={this.props.marcas}
                  containerStyle={styles.containerStyle}
                  style={styles.dropdownStyle}
                  itemStyle={styles.dropdownItemStyle}
                  dropDownStyle={styles.dropdownStyle}
                  onChangeItem={item =>
                    this.props.alteraMarcaSelecionada(item.value)
                  }
                  searchable={true}
                  searchablePlaceholder="Pesquise por uma marca"
                  searchablePlaceholderTextColor="gray"
                  seachableStyle={{}}
                  searchableError={() => <Text>Nada encontrado</Text>}
                />
                {/* <Picker
                  mode="dropdown"
                  selectedValue={this.props.idMarcaSelecionada}
                  onValueChange={(itemValue, itemIndex) => {
                    this.props.alteraMarcaSelecionada(itemValue);
                  }}
                  style={styles.txtInput}>
                  <Picker.Item label={'--'} value={null} key={-1} />
                  {this.props.marcas.map((obj, i) => (
                    <Picker.Item label={obj.label} value={obj.value} key={i} />
                  ))}
                </Picker> */}
              </View>
              <View style={styles.viewItem}>
                <Text style={styles.txtDesc}>Tamanhos:</Text>
                <DropDownPicker
                  placeholder="Selecione..."
                  items={this.props.tamanhos}
                  containerStyle={styles.containerStyle}
                  style={styles.dropdownStyle}
                  itemStyle={styles.dropdownItemStyle}
                  dropDownStyle={styles.dropdownStyle}
                  onChangeItem={item =>
                    this.props.alteraTamanhoSelecionado(item.value)
                  }
                  searchable={true}
                  searchablePlaceholder="Pesquise por um tamanho"
                  searchablePlaceholderTextColor="gray"
                  seachableStyle={{}}
                  searchableError={() => <Text>Nada encontrado</Text>}
                />
              </View>
              <View style={styles.viewItem}>
                <Text style={styles.txtDesc}>Cores:</Text>
                <DropDownPicker
                  placeholder="Selecione..."
                  items={this.props.cores}
                  containerStyle={styles.containerStyle}
                  style={styles.dropdownStyle}
                  itemStyle={styles.dropdownItemStyle}
                  dropDownStyle={styles.dropdownStyle}
                  onChangeItem={item =>
                    this.props.alteraCorSelecionada(item.value)
                  }
                  searchable={true}
                  searchablePlaceholder="Pesquise por uma cor"
                  searchablePlaceholderTextColor="gray"
                  seachableStyle={{}}
                  searchableError={() => <Text>Nada encontrado</Text>}
                />
              </View>
              <View style={styles.viewItem}>
                <Text style={styles.txtDesc}>Grupo:</Text>
                <DropDownPicker
                  placeholder="Selecione..."
                  items={this.props.grupos}
                  containerStyle={styles.containerStyle}
                  style={styles.dropdownStyle}
                  itemStyle={styles.dropdownItemStyle}
                  dropDownStyle={styles.dropdownStyle}
                  onChangeItem={item => {
                    this.props.alteraGrupoSelecionado(item.value);
                    this.props.buscaSubgrupos(item.value, this.props.grupos);
                  }}
                  searchable={true}
                  searchablePlaceholder="Pesquise por um grupo"
                  searchablePlaceholderTextColor="gray"
                  seachableStyle={{}}
                  searchableError={() => <Text>Nada encontrado</Text>}
                />
              </View>
              <View style={styles.viewItem}>
                <Text style={styles.txtDesc}>Subgrupo:</Text>
                <DropDownPicker
                  placeholder="Selecione..."
                  items={this.props.subgrupos}
                  containerStyle={styles.containerStyle}
                  style={styles.dropdownStyle}
                  itemStyle={styles.dropdownItemStyle}
                  dropDownStyle={styles.dropdownStyle}
                  onChangeItem={item =>
                    this.props.alteraSubgrupoSelecionado(item.value)
                  }
                  searchable={true}
                  searchablePlaceholder="Pesquise por um subgrupo"
                  searchablePlaceholderTextColor="gray"
                  seachableStyle={{}}
                  searchableError={() => <Text>Nada encontrado</Text>}
                />
              </View>
            </View>
          </View>
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
  validacaoMarcas: state.ProdutosReducer.validacaoMarcas,
  tamanhos: state.ProdutosReducer.tamanhos,
  idTamanhoSelecionado: state.ProdutosReducer.idTamanhoSelecionado,
  validacaoTamanhos: state.ProdutosReducer.validacaoTamanhos,
  cores: state.ProdutosReducer.cores,
  idCorSelecionada: state.ProdutosReducer.idCorSelecionada,
  validacaoCores: state.ProdutosReducer.validacaoCores,
  grupos: state.ProdutosReducer.grupos,
  idGrupoSelecionado: state.ProdutosReducer.idGrupoSelecionado,
  validacaoGrupos: state.ProdutosReducer.validacaoGrupos,
  subgrupos: state.ProdutosReducer.subgrupos,
  idSubgrupoSelecionado: state.ProdutosReducer.idSubgrupoSelecionado,
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
    mostrarIconeFiltroProdutos,
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
    buscaSubgrupos,
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
    //flex: 1,
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
    //borderColor: '#b3b3b3',
    marginTop: 6,
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
  containerStyle: {
    height: 40,
  },
  dropdownStyle: {
    backgroundColor: '#fafafa',
  },
  dropdownItemStyle: {
    justifyContent: 'flex-start',
  },
});
