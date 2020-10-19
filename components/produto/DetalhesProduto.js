import React, {Component} from 'react';
import {
  View,
  ScrollView,
  Text,
  BackHandler,
  FlatList,
  Dimensions,
} from 'react-native';
import Header from '../header/Header';
import {connect} from 'react-redux';
import {
  buscaDetalhesProduto,
  mostrarIconeFiltroProdutos,
} from '../../actions/ProdutosAction';
import {formatarCurrency} from '../utils/Utils';
import {Actions} from 'react-native-router-flux';
import Carousel from 'react-native-snap-carousel';
import FastImage from 'react-native-fast-image';
import styles from './styles/DetalhesProduto.style';

const screenWidth = Math.round(Dimensions.get('window').width);

class DetalhesProduto extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = async () => {
    this.props.mostrarIconeFiltroProdutos(false);
    await this.props.buscaDetalhesProduto(
      this.props.token,
      this.props.cdProduto,
    );
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.backAction,
    );
  };

  backAction = async () => {
    Actions.listaProdutos();
    return true;
  };

  _renderItem(titulo, item) {
    if (item != null) {
      return (
        <>
          <Text style={styles.txtDesc}>{titulo}</Text>
          <Text style={styles.txtItem}>{item} </Text>
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

  _renderErroServer(item) {
    if (item !== '') {
      return <Text style={styles.txtValidacaoServer}>{item}</Text>;
    }
  }

  _renderImgCarousel = ({item, index}) => {
    let imgUrl = {uri: item.ImageUrl};
    return (
      <View>
        <FastImage
          source={imgUrl}
          style={styles.imgProduto}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>
    );
  };

  renderRow(item) {
    if (item.EstoqueAtual > 0) {
      return (
        <View style={styles.viewGrade}>
          <View style={styles.viewCell}>
            <Text style={styles.txtGrade}>{item.Tamanho}</Text>
          </View>
          <View style={styles.viewCell}>
            <Text style={styles.txtGrade}>{item.Cor}</Text>
          </View>
          <View style={styles.viewCell}>
            <Text style={styles.txtGrade}>{item.EstoqueAtual}</Text>
          </View>
          <View style={styles.viewCell}>
            <Text style={styles.txtGradeEan}>{item.EAN}</Text>
          </View>
        </View>
      );
    }
  }

  renderHeader() {
    return (
      <View style={styles.viewGrade}>
        <View style={styles.viewCell}>
          <Text style={styles.txtHeader}>Tamanho</Text>
        </View>
        <View style={styles.viewCell}>
          <Text style={styles.txtHeader}>Cor</Text>
        </View>
        <View style={styles.viewCell}>
          <Text style={styles.txtHeader}>Estoque</Text>
        </View>
        <View style={styles.viewCell}>
          <Text style={styles.txtHeader}>EAN</Text>
        </View>
      </View>
    );
  }

  renderEstoque() {
    if (
      this.props.detalhesProduto.EstoqueProduto != null &&
      this.props.detalhesProduto.EstoqueProduto.length > 0
    ) {
      return (
        <FlatList
          ListHeaderComponent={this.renderHeader()}
          data={this.props.detalhesProduto.EstoqueProduto}
          renderItem={({item}) => this.renderRow(item)}
          keyExtractor={item => item.EAN}
        />
      );
    } else {
      return <Text style={styles.txtSemInfo}>Sem estoque!</Text>;
    }
  }

  renderImagens() {
    if (
      this.props.detalhesProduto.ProdutoImagens != null &&
      this.props.detalhesProduto.ProdutoImagens.length > 0
    ) {
      return (
        <View style={styles.viewCarousel}>
          <Carousel
            layout={'stack'}
            ref={c => {
              this._carousel = c;
            }}
            data={this.props.detalhesProduto.ProdutoImagens}
            renderItem={this._renderImgCarousel}
            sliderWidth={screenWidth}
            itemWidth={screenWidth}
            style={styles.carousel}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.viewDetalhes}>
          <Text style={styles.txtSemInfo}>Nenhuma imagem cadastrada!</Text>
        </View>
      );
    }
  }

  render() {
    /* var locais = [];
    console.log(this.props.detalhesProduto);
    this.props.detalhesProduto.EstoqueProduto.forEach((obj, i) => {
      locais.push(obj.CdLocal);
    });
    var uniq = [...new Set(locais)]; */
    return (
      <ScrollView style={styles.viewPrincipal}>
        <Header titulo="Produtos" />
        {this._renderErroServer(this.props.validacaoDetalhesProduto)}
        <View style={styles.viewTituloPrincipal}>
          <Text style={styles.tituloPrincipal}>
            {this.props.detalhesProduto.Descricao}
          </Text>
        </View>
        <View style={styles.viewDetalhes}>
          {this._renderItem('Código', this.props.codigoCliente)}
          <Text style={styles.txtDesc}>Preço Venda</Text>
          <Text style={styles.txtItem}>
            {formatarCurrency(this.props.detalhesProduto.PrecoVenda)}
          </Text>
          {this._renderItem('Marca', this.props.detalhesProduto.Marca)}
          {this._renderItem('Grupo', this.props.detalhesProduto.Grupo)}
          {this._renderItem('Subgrupo', this.props.detalhesProduto.SubGrupo)}
        </View>
        <View style={styles.viewTituloPrincipal}>
          <Text style={styles.tituloPrincipal}>Grade de Estoque</Text>
        </View>
        <View style={styles.viewDetalhes}>
          {/* <Picker
            mode="dropdown"
            selectedValue={this.props.idLocalSelecionado}
            onValueChange={(itemValue, itemIndex) => {
              this.props.alteraLocalProdutoSelecionado(itemValue);
            }}
            style={styles.txtInput}>
            {this.props.detalhesProduto.EstoqueProduto.map((obj, i) => (
              this.uniq.map((item, x) => (
                if (obj.CdLocal === item) {
                  <Picker.Item label={obj.Local} value={obj.CdLocal} key={i} />
                }
              ))
            ))}
          </Picker> */}
          {this.renderEstoque()}
        </View>
        <View style={styles.viewTituloPrincipal}>
          <Text style={styles.tituloPrincipal}>Galeria</Text>
        </View>
        {this.renderImagens()}
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  token: state.LoginReducer.token,
  detalhesProduto: state.ProdutosReducer.detalhesDoProduto,
  cdProduto: state.ProdutosReducer.cdProduto,
  validacaoDetalhesProduto: state.ProdutosReducer.validacaoDetalhesProduto,
  codigoCliente: state.ProdutosReducer.codigoCliente,
});

export default connect(
  mapStateToProps,
  {buscaDetalhesProduto, mostrarIconeFiltroProdutos},
)(DetalhesProduto);
