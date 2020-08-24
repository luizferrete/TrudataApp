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
import {
  salvarContatoComCliente,
  salvarContatoSemCliente,
  alteraTipoContatoSelecionado,
  modificaDescricao,
  selecionaDataContato,
  selecionaPrazoAtendimento,
  modificaResponsavel,
  alteraOrigemSelecionada,
  alteraStatusSelecionado,
  modificaNomeContato,
  modificaTelefoneContato,
  modificaEmailContato,
  alteraEstadoSelecionado,
  selecionaCliente,
  selecionaCidade,
} from '../../actions/ContatosActions';

class NovoContatoHeader extends Component {
  _renderBtnAdd() {
    if (this.props.origem === 'NovoContato') {
      return (
        <>
          <View style={styles.viewFiltro}>
            <TouchableHighlight
              onPress={() => {
                if (this.props.informarCliente) {
                  this.props.salvarContatoComCliente(
                    this.props.token,
                    this.props.idTipoContatoSelecionado,
                    this.props.idEmpresaSelecionada,
                    this.props.idLocalSelecionado,
                    this.props.idClienteSelecionado,
                    this.props.descricao,
                    this.props.dataContato,
                    this.props.prazoAtendimento,
                    this.props.responsavel,
                    this.props.idOrigemSelecionada,
                    this.props.idStatusSelecionado,
                  );
                } else {
                  this.props.salvarContatoSemCliente(
                    this.props.token,
                    this.props.idTipoContatoSelecionado,
                    this.props.idEmpresaSelecionada,
                    this.props.idLocalSelecionado,
                    this.props.descricao,
                    this.props.dataContato,
                    this.props.prazoAtendimento,
                    this.props.responsavel,
                    this.props.idOrigemSelecionada,
                    this.props.idStatusSelecionado,
                    this.props.nomeContato,
                    this.props.idCidadeSelecionada,
                    this.props.telefoneContato,
                    this.props.emailContato,
                  );
                }
              }}
              underlayColor="transparent">
              <Image
                source={require('../../imgs/save_icon.png')}
                style={styles.filtroContato}
              />
            </TouchableHighlight>
          </View>
        </>
      );
    }
  }

  resetaProps() {
    var obj = {
      value: null,
    };
    this.props.alteraTipoContatoSelecionado(obj);
    this.props.modificaDescricao('');
    this.props.selecionaDataContato(new Date());
    this.props.selecionaPrazoAtendimento(null);
    this.props.modificaResponsavel('');
    this.props.alteraOrigemSelecionada(null);
    this.props.alteraStatusSelecionado(null);
    this.props.modificaNomeContato('');
    this.props.modificaTelefoneContato('');
    this.props.modificaEmailContato('');
    this.props.alteraEstadoSelecionado(1);
    this.props.selecionaCidade(null, '');
    this.props.selecionaCliente(null, '');
  }

  render() {
    return (
      <View style={styles.viewPrincipal}>
        <StatusBar backgroundColor="rgb(41, 41, 41)" />
        <View style={styles.viewMenuIcon}>
          <TouchableHighlight
            onPress={() => {
              this.resetaProps();
              Actions.listaContatos();
            }}
            underlayColor="rgb(41, 41, 41)">
            <Image
              source={require('../../imgs/close_icon.png')}
              style={styles.menuIcon}
            />
          </TouchableHighlight>
        </View>
        <View style={styles.viewHeaderText}>
          <Text style={styles.txtHeader}>Novo contato</Text>
        </View>
        {this._renderBtnAdd()}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  token: state.LoginReducer.token,
  idTipoContatoSelecionado: state.ContatosReducer.idTipoContatoSelecionado,
  idEmpresaSelecionada: state.ContatosReducer.idEmpresaSelecionada,
  idLocalSelecionado: state.ContatosReducer.idLocalSelecionado,
  idClienteSelecionado: state.ContatosReducer.idClienteSelecionado,
  descricao: state.ContatosReducer.descricao,
  dataContato: state.ContatosReducer.dataContato,
  prazoAtendimento: state.ContatosReducer.prazoAtendimento,
  responsavel: state.ContatosReducer.responsavel,
  idOrigemSelecionada: state.ContatosReducer.idOrigemSelecionada,
  idStatusSelecionado: state.ContatosReducer.idStatusSelecionado,
  informarCliente: state.ContatosReducer.informarCliente,
  nomeContato: state.ContatosReducer.nomeContato,
  telefoneContato: state.ContatosReducer.telefoneContato,
  emailContato: state.ContatosReducer.emailContato,
  idCidadeSelecionada: state.ContatosReducer.idCidadeSelecionada,
});

export default connect(
  mapStateToProps,
  {
    salvarContatoComCliente,
    salvarContatoSemCliente,
    alteraTipoContatoSelecionado,
    modificaDescricao,
    selecionaDataContato,
    selecionaPrazoAtendimento,
    modificaResponsavel,
    alteraOrigemSelecionada,
    alteraStatusSelecionado,
    modificaNomeContato,
    modificaTelefoneContato,
    modificaEmailContato,
    alteraEstadoSelecionado,
    selecionaCliente,
    selecionaCidade,
  },
)(NovoContatoHeader);

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
    height: 5,
    width: 5,
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
    fontSize: 20,
    color: '#FFF',
  },
  filtroContato: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    margin: 10,
    padding: 10,
  },
});
