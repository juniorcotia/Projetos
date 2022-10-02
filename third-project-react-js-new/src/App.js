import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import api from './services/api';


import backgroundImage from './assets/background.png';
import { Form } from './styles';

export default function App(){
  const [ users, setUsers ] = useState([]);
  const [newID, setNewID] = useState('');
  const [newName, setNewName] = useState('');
  const [newCPF, setNewCPF] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newFone, setNewFone] = useState('');
  const [newLogra, setNewLogra] = useState('');
  const [newNum, setNewNum] = useState('');
  const [newComp, setNewComp] = useState('');
  const [newBairro, setNewBairro] = useState('');
  const [newCidade, setNewCidade] = useState('');
  const [newEstado, setNewEstado] = useState('');
  const [newCEP, setNewCEP] = useState('');
  
  // useState retorna um array com 2 posicoes
  // 
  // 1. variavel com seu valor inicial 
  // 2. função para atualizacao deste valor 

  useEffect(() => {
    api.get('users').then(response => {
      setUsers(response.data);
    });
  }, []);

  function handleInputChangeNewID(e) {
    setNewID(e.target.value);
  }

  function handleInputChangeNewName(e) {
    setNewName(e.target.value);
  }

  function handleInputChangeNewCPF(e) {
    setNewCPF(e.target.value);
  }

  function handleInputChangeNewEmail(e) {
    setNewEmail(e.target.value);
  }

  function handleInputChangeNewFone(e) {
    setNewFone(e.target.value);
  }

  function handleInputChangeNewLogra(e) {
    setNewLogra(e.target.value);
  }

  function handleInputChangeNewNum(e) {
    setNewNum(e.target.value);
  }

  function handleInputChangeNewComp(e) {
    setNewComp(e.target.value);
  }

  function handleInputChangeNewBairro(e) {
    setNewBairro(e.target.value);
  }

  function handleInputChangeNewCidade(e) {
    setNewCidade(e.target.value);
  }

  function handleInputChangeNewEstado(e) {
    setNewEstado(e.target.value);
  }

  function handleInputChangeNewCEP(e) {
    setNewCEP(e.target.value);
  }

  async function addNewUser(e) {
    e.preventDefault(); /* Evita o refresh na página */
    setNewID(newID);
    setNewName(newName);
    setNewCPF(newCPF);
    setNewEmail(newEmail);
    setNewFone(newFone);
    setNewLogra(newLogra);
    setNewNum(newNum);
    setNewComp(newComp);
    setNewBairro(newBairro);
    setNewCidade(newCidade);
    setNewEstado(newEstado);
    setNewCEP(newCEP);
    const response = await api.post('users', {
      id: `${newID}`,
      name: `${newName}`,
      cpf: `${newCPF}`,
      email: `${newEmail}`,
      fone: `${newFone}`,
      logra: `${newLogra}`,
      num: `${newNum}`,
      comp: `${newComp}`,
      bairro: `${newBairro}`,
      cidade: `${newCidade}`,
      estado: `${newEstado}`,
      cep: `${newCEP}`
    });

    const user = response.data;

    console.log(user);

    setUsers([...users, user]); // spread operator
    setNewID('');
    setNewName('');
    setNewCPF('');
    setNewEmail('');
    setNewFone('');
    setNewLogra('');
    setNewNum('');
    setNewComp('');
    setNewBairro('');
    setNewCidade('');
    setNewEstado('');
    setNewCEP('');
  }

  return (
    <Form>
      <img width={200} src={backgroundImage} />
      <h3>Dados do usuário</h3>
      <br/>
      <input
            type="text"
            placeholder="ID do usuário"
            value={newID}
            onChange={handleInputChangeNewID}
            /> 
      <br/>
      <br/>
      <input
            type="text"
            placeholder="Nome do usuário"
            value={newName}
            onChange={handleInputChangeNewName}
            /> 
      <br/>
      <br/>
      <input
            type="text"
            placeholder="CPF do usuário"
            value={newCPF}
            onChange={handleInputChangeNewCPF}
            /> 
      <br/>
      <br/>
      <input
            type="text"
            placeholder="E-mail do usuário"
            value={newEmail}
            onChange={handleInputChangeNewEmail}
            />     
      <br/>
      <br/>
      <input
            type="text"
            placeholder="Telefone do usuário"
            value={newFone}
            onChange={handleInputChangeNewFone}
            /> 
      <br/>
      <h3>Endereço</h3>
      <br/>
      <input
            type="text"
            placeholder="Logradouro do endereço"
            value={newLogra}
            onChange={handleInputChangeNewLogra}
            /> 
      <br/>
      <br/>
      <input
            type="text"
            placeholder="Numero do endereço"
            value={newNum}
            onChange={handleInputChangeNewNum}
            /> 
      <br/>
      <br/>
      <input
            type="text"
            placeholder="Complemento do endereço"
            value={newComp}
            onChange={handleInputChangeNewComp}
            /> 
      <br/>
      <br/>
      <input
            type="text"
            placeholder="Bairro do endereço"
            value={newBairro}
            onChange={handleInputChangeNewBairro}
            /> 
      <br/>
      <br/>
      <input
            type="text"
            placeholder="Cidade do endereço"
            value={newCidade}
            onChange={handleInputChangeNewCidade}
            /> 
      <br/>
      <br/>
      <input
            type="text"
            placeholder="Estado do endereço"
            value={newEstado}
            onChange={handleInputChangeNewEstado}
            /> 
      <br/>
      <br/>
      <input
            type="text"
            placeholder="CEP do endereço"
            value={newCEP}
            onChange={handleInputChangeNewCEP}
            /> 
      <br/>
      <Header title="Users">
        <ul>
          {users.map(user => 
          <li key={user.id}>
            <span>{`Usuário: `+user.name}</span>
            <br/>
            <span>{` - ID: `+user.id}</span>
            <br/>
            <span>{` - CPF: `+user.cpf}</span>
            <br/>
            <span>{` - E-Mail: `+user.email}</span>
            <br/>
            <span>{` - Telefone: `+user.fone}</span>
            <br/>
            <span>{` - Logradouro: `+user.logra}</span>
            <span>{` - Numero: `+user.num}</span>
            <span>{` - Complemento: `+user.comp}</span>
            <span>{` - Bairro: `+user.bairro}</span>
            <span>{` - Cidade: `+user.cidade}</span>
            <span>{` - Estado: `+user.estado}</span>
            <span>{` - CEP: `+user.cep}</span>
            
          </li>)}
        </ul>
      </Header>
      <br/>
      <button type="button" 
              onClick={addNewUser}>Adicionar Usuário</button>
    </Form>
  );
}