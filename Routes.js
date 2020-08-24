import React from 'react';
import {Router, Scene, Drawer} from 'react-native-router-flux';
import FormLogin from './components/login/FormLogin';
import Principal from './components/home/Principal';
import Menu from './components/menu/Menu';
import ListaContatos from './components/contato/ListaContatos';
import DetalhesContato from './components/contato/DetalhesContato';
import NovoContatoAssunto from './components/contato/NovoContatoAssunto';
import NovoContato from './components/contato/NovoContato';
import ListaProdutos from './components/produto/ListaProdutos';
import DetalhesProduto from './components/produto/DetalhesProduto';
import ListaClientes from './components/cliente/ListaClientes';
import DetalhesCliente from './components/cliente/DetalhesCliente';
import SelecionarCliente from './components/contato/SelecionarCliente';
import SelecionarCidade from './components/contato/SelecionaCidade';

export default props => (
  <Router>
    <Scene key="root">
      <Scene
        key="formLogin"
        component={FormLogin}
        title="Login"
        hideNavBar={true}
        initial
      />
      <Drawer hideNavBar key="drawer" drawerWidth={350} contentComponent={Menu}>
        <Scene
          key="principal"
          component={Principal}
          title="Principal"
          hideNavBar={true}
        />
        <Scene key="contatos">
          <Scene
            key="listaContatos"
            component={ListaContatos}
            title="Contatos"
            hideNavBar={true}
          />
          <Scene
            key="detalhesContato"
            component={DetalhesContato}
            title="Contatos"
            hideNavBar={true}
            back={true}
          />
          <Scene
            key="novoContatoAssunto"
            component={NovoContatoAssunto}
            title="Contatos"
            hideNavBar={true}
            back={true}
          />
          <Scene
            key="novoContato"
            component={NovoContato}
            title="Contatos"
            hideNavBar={true}
            back={true}
          />
          <Scene
            key="selecionarCliente"
            component={SelecionarCliente}
            title="Selecionar Cliente"
            hideNavBar={true}
            back={true}
          />
          <Scene
            key="selecionarCidade"
            component={SelecionarCidade}
            title="Selecionar Cidade"
            hideNavBar={true}
            back={true}
          />
        </Scene>
        <Scene key="produtos">
          <Scene
            key="listaProdutos"
            component={ListaProdutos}
            title="Produtos"
            hideNavBar={true}
          />
          <Scene
            key="detalhesProduto"
            component={DetalhesProduto}
            title="Produtos"
            hideNavBar={true}
            back={true}
          />
        </Scene>
        <Scene key="clientes">
          <Scene
            key="listaClientes"
            component={ListaClientes}
            title="Clientes"
            hideNavBar={true}
          />
          <Scene
            key="detalhesCliente"
            component={DetalhesCliente}
            title="Clientes"
            hideNavBar={true}
            back={true}
          />
        </Scene>
      </Drawer>
    </Scene>
  </Router>
);
