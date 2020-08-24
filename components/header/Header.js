import React, {Component} from 'react';
import {
  View,
  TouchableHighlight,
  Image,
  StyleSheet,
  StatusBar,
  Text,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {setModalFiltroVisible} from '../../actions/ContatosActions';
import {mostraPesquisarClientes} from '../../actions/ClientesActions';
import {mostraPesquisarProdutos} from '../../actions/ProdutosAction';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  setModalVisible(visible) {
    this.props.setModalFiltroVisible(visible);
  }

  setModalProdutoVisible(visible) {
    this.props.setModalFiltroProdutoVisible(visible);
  }

  renderFilterIconClientes(mostrarIcone) {
    if (mostrarIcone) {
      return (
        <View style={styles.viewFiltro}>
          <TouchableHighlight
            onPress={() => {
              this.props.mostraPesquisar
                ? this.props.mostraPesquisarClientes(false)
                : this.props.mostraPesquisarClientes(true);
            }}
            underlayColor="transparent">
            <Image
              source={require('../../imgs/btn_search.png')}
              style={styles.filtroContato}
            />
          </TouchableHighlight>
        </View>
      );
    }
  }

  renderFilterIconProdutos(mostrarIcone) {
    if (mostrarIcone) {
      return (
        <View style={styles.viewFiltro}>
          <TouchableHighlight
            onPress={() => {
              this.props.mostraPesquisarProd
                ? this.props.mostraPesquisarProdutos(false)
                : this.props.mostraPesquisarProdutos(true);
            }}
            underlayColor="transparent">
            <Image
              source={require('../../imgs/btn_search.png')}
              style={styles.filtroContato}
            />
          </TouchableHighlight>
        </View>
      );
    }
  }

  renderFilterIconContatos(mostrarIcone) {
    if (mostrarIcone) {
      return (
        <View style={styles.viewFiltro}>
          <TouchableHighlight
            onPress={() => this.setModalVisible(true)}
            underlayColor="transparent">
            <Image
              source={require('../../imgs/filter_icon.png')}
              style={styles.filtroContato}
            />
          </TouchableHighlight>
        </View>
      );
    }
  }

  renderTitulo() {
    if (this.props.titulo === 'Principal') {
      return (
        <View style={styles.viewLogo}>
          <Image
            source={require('../../imgs/trudata_logo.png')}
            style={styles.logoIcon}
          />
        </View>
      );
    } else if (this.props.titulo === 'Contatos') {
      return (
        <>
          <View style={styles.viewHeaderTextContato}>
            <Text style={styles.txtHeader}>{this.props.titulo}</Text>
          </View>
          {this.renderFilterIconContatos(this.props.filtroIconeContatos)}
        </>
      );
    } else if (this.props.titulo === 'Clientes') {
      return (
        <>
          <View style={styles.viewHeaderTextContato}>
            <Text style={styles.txtHeader}>{this.props.titulo}</Text>
          </View>
          {this.renderFilterIconClientes(this.props.filtroIconeClientes)}
        </>
      );
    } else if (this.props.titulo === 'Produtos') {
      return (
        <>
          <View style={styles.viewHeaderTextContato}>
            <Text style={styles.txtHeader}>{this.props.titulo}</Text>
          </View>
          {this.renderFilterIconProdutos(this.props.filtroIconeProdutos)}
        </>
      );
    } else {
      return (
        <View style={styles.viewHeaderText}>
          <Text style={styles.txtHeader}>{this.props.titulo}</Text>
        </View>
      );
    }
  }

  render() {
    return (
      <View style={styles.viewPrincipal}>
        <StatusBar backgroundColor="rgb(41, 41, 41)" />
        <View style={styles.viewMenuIcon}>
          <TouchableHighlight
            onPress={() => Actions.drawerOpen()}
            underlayColor="rgb(41, 41, 41)">
            <Image
              source={require('../../imgs/menu_icon.png')}
              style={styles.menuIcon}
            />
          </TouchableHighlight>
        </View>
        {this.renderTitulo()}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  modalVisible: state.ContatosReducer.modalFiltroVisible,
  mostraPesquisar: state.ClientesReducer.mostraPesquisar,
  mostraPesquisarProd: state.ProdutosReducer.mostraPesquisar,
  filtroIconeClientes: state.ClientesReducer.filtroIconeClientes,
  filtroIconeProdutos: state.ProdutosReducer.filtroIconeProdutos,
  filtroIconeContatos: state.ContatosReducer.filtroIconeContatos,
});

export default connect(
  mapStateToProps,
  {
    setModalFiltroVisible,
    mostraPesquisarClientes,
    mostraPesquisarProdutos,
  },
)(Header);

const styles = StyleSheet.create({
  viewPrincipal: {
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
    height: 30,
    width: 30,
    resizeMode: 'contain',
    margin: 10,
    padding: 10,
  },
  logoIcon: {
    height: 58,
    width: 200,
    resizeMode: 'contain',
    padding: 10,
  },
  viewHeaderText: {
    flex: 6,
    alignItems: 'flex-start',
    alignSelf: 'center',
    marginLeft: 20,
    flexDirection: 'row',
  },
  viewHeaderTextContato: {
    flex: 6,
    alignItems: 'flex-start',
    alignSelf: 'center',
    marginLeft: 20,
    flexDirection: 'row',
  },
  txtHeader: {
    fontSize: 27,
    color: '#FFF',
  },
  filtroContato: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
    margin: 10,
    padding: 10,
  },
});
