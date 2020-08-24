import React, {Component} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  TouchableHighlight,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {
  alteraSkipProdutos,
  alteraDataLoadProdutos,
  modificaSearchProduto,
  mostraPesquisarProdutos,
  isLoadingProdutos,
  alteraFiltroProdutoSelecionado,
} from '../../actions/ProdutosAction';
import {
  alteraSkipContato,
  alteraDataLoadContato,
  isMaxReachedContatos,
  alteraTipoContatoSelecionadoFiltro,
} from '../../actions/ContatosActions';
import {
  alteraSkip,
  alteraDataLoad,
  modificaSearchCliente,
  mostraPesquisarClientes,
} from '../../actions/ClientesActions';
import {highlightMenu} from '../../actions/PrincipalActions';

class Menu extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.viewPrincipal}>
        <ImageBackground
          source={require('../../imgs/bg_menu.png')}
          style={styles.imgBg}>
          <View style={styles.profileImgView}>
            <Image
              source={require('../../imgs/profile_image.png')}
              style={styles.profileImg}
            />
          </View>
          <View style={styles.usuarioLogadoView}>
            <Text style={styles.usuarioLogadoNomeText}>
              {this.props.usuarioLogadoNome}
            </Text>
            <Text style={styles.usuarioLogadoEmailText}>
              {this.props.usuarioLogadoEmail}
            </Text>
          </View>
        </ImageBackground>
        <View style={styles.viewItens}>
          <TouchableHighlight
            onPress={() => {
              //Actions.principal();
              this.props.highlightMenu('home');
              Actions.reset('drawer');
            }}
            style={styles.menuTouch}
            underlayColor="#c9cbcd">
            <View
              style={
                this.props.menuItem === 'home'
                  ? [styles.viewMenu, styles.selectedMenu]
                  : styles.viewMenu
              }>
              <Image
                source={require('../../imgs/baseline_home.png')}
                style={styles.iconsMenu}
              />
              <Text style={styles.textMenu}>Home</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={async () => {
              var tudoObj = {value: 0, label: 'Todos os assuntos'};
              await this.props.alteraSkipContato(0);
              await this.props.alteraDataLoadContato([]);
              await this.props.isMaxReachedContatos(false);
              await this.props.alteraTipoContatoSelecionadoFiltro(tudoObj);
              await this.props.highlightMenu('contatos');
              Actions.listaContatos();
            }}
            style={styles.menuTouch}
            underlayColor="#c9cbcd">
            <View
              style={
                this.props.menuItem === 'contatos'
                  ? [styles.viewMenu, styles.selectedMenu]
                  : styles.viewMenu
              }>
              <Image
                source={require('../../imgs/baseline_announcement.png')}
                style={styles.iconsMenu}
              />
              <Text style={styles.textMenu}>Fale Conosco / Contatos</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={async () => {
              await this.props.alteraSkipProdutos(0);
              await this.props.alteraDataLoadProdutos([]);
              await this.props.modificaSearchProduto('');
              await this.props.mostraPesquisarProdutos(false);
              await this.props.isLoadingProdutos('N');
              await this.props.highlightMenu('produtos');
              await this.props.alteraFiltroProdutoSelecionado({
                value: 1,
                label: 'Código',
              });
              Actions.listaProdutos();
            }}
            style={styles.menuTouch}
            underlayColor="#c9cbcd">
            <View
              style={
                this.props.menuItem === 'produtos'
                  ? [styles.viewMenu, styles.selectedMenu]
                  : styles.viewMenu
              }>
              <Image
                source={require('../../imgs/baseline_assignment.png')}
                style={styles.iconsMenu}
              />
              <Text style={styles.textMenu}>Produtos</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={async () => {
              await this.props.alteraSkip(0);
              await this.props.alteraDataLoad([]);
              await this.props.modificaSearchCliente('');
              await this.props.mostraPesquisarClientes(false);
              await this.props.highlightMenu('clientes');
              Actions.listaClientes();
            }}
            style={styles.menuTouch}
            underlayColor="#c9cbcd">
            <View
              style={
                this.props.menuItem === 'clientes'
                  ? [styles.viewMenu, styles.selectedMenu]
                  : styles.viewMenu
              }>
              <Image
                source={require('../../imgs/baseline_people.png')}
                style={styles.iconsMenu}
              />
              <Text style={styles.textMenu}>Clientes</Text>
            </View>
          </TouchableHighlight>
          <View style={styles.viewFinalMenu} />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  usuarioLogadoNome: state.LoginReducer.usuarioLogadoNome,
  usuarioLogadoEmail: state.LoginReducer.usuarioLogadoEmail,
  menuItem: state.PrincipalReducer.menuItem,
});

export default connect(
  mapStateToProps,
  {
    alteraSkipProdutos,
    alteraDataLoadProdutos,
    modificaSearchProduto,
    mostraPesquisarProdutos,
    alteraSkipContato,
    alteraDataLoadContato,
    isMaxReachedContatos,
    alteraTipoContatoSelecionadoFiltro,
    alteraSkip,
    alteraDataLoad,
    modificaSearchCliente,
    mostraPesquisarClientes,
    isLoadingProdutos,
    highlightMenu,
    alteraFiltroProdutoSelecionado,
  },
)(Menu);

const styles = StyleSheet.create({
  viewPrincipal: {
    flex: 1,
  },
  imgBg: {
    flex: 2,
  },
  profileImgView: {
    flex: 2,
    padding: 15,
    alignSelf: 'flex-start',
    flexDirection: 'column-reverse',
  },
  profileImg: {
    resizeMode: 'contain',
    width: 100,
    height: 100,
  },
  usuarioLogadoView: {
    flex: 1,
    padding: 15,
  },
  usuarioLogadoNomeText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
  },
  usuarioLogadoEmailText: {
    fontSize: 18,
    color: '#d3d6db',
  },
  viewItens: {
    flex: 4,
  },
  menuTouch: {
    flex: 1,
  },
  viewMenu: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconsMenu: {
    resizeMode: 'contain',
    width: 35,
    height: 35,
    marginTop: 10,
    marginLeft: 10,
  },
  textMenu: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5d6065',
    marginLeft: 30,
    marginTop: 15,
  },
  viewFinalMenu: {
    flex: 4,
  },
  selectedMenu: {
    backgroundColor: '#edeff2',
  },
});
