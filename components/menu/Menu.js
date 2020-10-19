import React, {Component} from 'react';
import {
  View,
  Text,
  ImageBackground,
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
import styles from './styles/Menu.styles';

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
          <View style={styles.viewProfileImg}>
            <Image
              source={require('../../imgs/profile_image.png')}
              style={styles.profileImg}
            />
          </View>
          <View style={styles.viewUsuarioLogado}>
            <Text style={styles.txtUsuarioLogadoNome}>
              {this.props.usuarioLogadoNome}
            </Text>
            <Text style={styles.txtUsuarioLogadoEmail}>
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
              <Text style={styles.txtMenu}>Home</Text>
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
              <Text style={styles.txtMenu}>Fale Conosco / Contatos</Text>
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
              <Text style={styles.txtMenu}>Produtos</Text>
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
              <Text style={styles.txtMenu}>Clientes</Text>
            </View>
          </TouchableHighlight>
          <View style={styles.viewFinalMenu} />
        </View>
        <View style={styles.viewFooter}>
          <Text style={styles.txtVersao}>Versão 1.00.00</Text>
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
