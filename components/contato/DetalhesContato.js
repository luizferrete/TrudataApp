import React, {Component} from 'react';
import {View, ScrollView, Text, BackHandler} from 'react-native';
import Header from '../header/Header';
import {connect} from 'react-redux';
import {
  buscaDetalhesContato,
  mostrarIconeFiltroContatos,
} from '../../actions/ContatosActions';
import {formatarData} from '../utils/Utils';
import {Actions} from 'react-native-router-flux';
import styles from './styles/DetalhesContato.style';

class DetalhesContato extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.mostrarIconeFiltroContatos(false);
    this.props.buscaDetalhesContato(this.props.token, this.props.cdContato);
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.backAction,
    );
  }

  backAction = async () => {
    Actions.listaContatos();
    return true;
  };

  _renderNome() {
    if (this.props.detalhesContato.NomeCliente != null) {
      return (
        <>
          <Text style={styles.txtDesc}>Nome do cliente</Text>
          <Text style={styles.txtItem}>
            {this.props.detalhesContato.NomeCliente}
          </Text>
        </>
      );
    } else {
      return (
        <>
          <Text style={styles.txtDesc}>Nome do contatante</Text>
          <Text style={styles.txtItem}>
            {this.props.detalhesContato.NomeContatante}
          </Text>
        </>
      );
    }
  }

  _renderItem(titulo, desc) {
    if (desc != null && desc !== '') {
      return (
        <>
          <Text style={styles.txtDesc}>{titulo}</Text>
          <Text style={styles.txtItem}>{desc}</Text>
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

  render() {
    return (
      <ScrollView style={styles.viewPrincipal}>
        <Header titulo="Contatos" />
        <View style={styles.viewTituloPrincipal}>
          <Text style={styles.tituloPrincipal}>
            Detalhes do registro do contato
          </Text>
        </View>
        <View style={styles.viewCard}>
          {this._renderErroServer(this.props.validacaoDetalhesContato)}
          <Text style={styles.txtDesc}>Assunto</Text>
          <Text style={styles.txtDescAssunto}>
            {this.props.detalhesContato.Assunto}
          </Text>
          <Text style={styles.txtDesc}>Protocolo</Text>
          <Text style={styles.txtItem}>
            {this.props.detalhesContato.Protocolo}
          </Text>
          <Text style={styles.txtDesc}>Status</Text>
          <Text style={styles.txtItem}>
            {this.props.detalhesContato.Status}
          </Text>
          <Text style={styles.txtDesc}>Data da solicitação</Text>
          <Text style={styles.txtItem}>
            {formatarData(this.props.detalhesContato.DataContato)}
          </Text>
          {this._renderItem('Empresa', this.props.detalhesContato.Empresa)}
          {this._renderNome()}
          {this._renderItem('Cidade', this.props.detalhesContato.Cidade)}
          {this._renderItem('Telefone', this.props.detalhesContato.Telefone)}
          {this._renderItem('E-mail', this.props.detalhesContato.Email)}
          {this._renderItem('Descrição', this.props.detalhesContato.Descricao)}
          {this._renderItem('Origem', this.props.detalhesContato.Origem)}
          {this._renderItem(
            'Prazo de atendimento',
            formatarData(this.props.detalhesContato.PrazoAtendimento),
          )}
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  token: state.LoginReducer.token,
  detalhesContato: state.ContatosReducer.detalhesDoContato,
  cdContato: state.ContatosReducer.cdContato,
  validacaoDetalhesContato: state.ContatosReducer.validacaoDetalhesContato,
});

export default connect(
  mapStateToProps,
  {buscaDetalhesContato, mostrarIconeFiltroContatos},
)(DetalhesContato);
