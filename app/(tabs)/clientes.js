// ClientesScreen.js
import { useState } from 'react';
import { Alert, FlatList, Modal } from 'react-native';
import styled from 'styled-components/native';

export default function ClientesScreen() {
  const [clientes, setClientes] = useState([
    { id: '1', nome: 'João Silva', cpf: '123.456.789-00', email: 'joao@email.com', telefone: '(11) 99999-0000' },
    { id: '2', nome: 'Maria Santos', cpf: '987.654.321-00', email: 'maria@email.com', telefone: '(21) 98888-1111' },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [form, setForm] = useState({ nome: '', cpf: '', email: '', telefone: '' });
  const [editandoId, setEditandoId] = useState(null);

  const abrirModal = (cliente = null) => {
    setEditandoId(cliente?.id || null);
    setForm(cliente || { nome: '', cpf: '', email: '', telefone: '' });
    setModalVisible(true);
  };

  const salvarCliente = () => {
    const camposVazios = Object.values(form).some((v) => !v);
    if (camposVazios) return Alert.alert('Erro', 'Preencha todos os campos.');

    if (editandoId) {
      setClientes((old) => old.map((c) => (c.id === editandoId ? form : c)));
    } else {
      setClientes((old) => [...old, { ...form, id: String(Date.now()) }]);
    }

    setModalVisible(false);
  };

  const excluirCliente = (id) => {
    Alert.alert('Confirmar', 'Deseja excluir este cliente?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: () => setClientes((old) => old.filter((c) => c.id !== id)) },
    ]);
  };

  return (
    <Container>
      <Title>Clientes</Title>

      <Button onPress={() => abrirModal()}>
        <ButtonText>+ Adicionar Cliente</ButtonText>
      </Button>

      <FlatList
        data={clientes}
        style={{ width: '100%' }}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <ClienteItem>
            <ClienteInfo>
              <Nome>{item.nome}</Nome>
              <InfoText>CPF: {item.cpf}</InfoText>
              <InfoText>Email: {item.email}</InfoText>
              <InfoText>Telefone: {item.telefone}</InfoText>
            </ClienteInfo>

            <Acoes>
              <SmallButton blue onPress={() => abrirModal(item)}>
                <SmallButtonText>Editar</SmallButtonText>
              </SmallButton>

              <SmallButton red onPress={() => excluirCliente(item.id)}>
                <SmallButtonText>Excluir</SmallButtonText>
              </SmallButton>
            </Acoes>
          </ClienteItem>
        )}
      />

      {/* MODAL */}
      <Modal animationType="slide" transparent visible={modalVisible}>
        <ModalContainer>
          <ModalBox>
            <ModalTitulo>{editandoId ? 'Editar Cliente' : 'Novo Cliente'}</ModalTitulo>

            {Object.keys(form).map((key) => (
              <Input
                key={key}
                placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                value={form[key]}
                onChangeText={(t) => setForm({ ...form, [key]: t })}
              />
            ))}

            <ModalButtons>
              <Button green onPress={salvarCliente}>
                <ButtonText>Salvar</ButtonText>
              </Button>

              <Button gray onPress={() => setModalVisible(false)}>
                <ButtonText>Cancelar</ButtonText>
              </Button>
            </ModalButtons>
          </ModalBox>
        </ModalContainer>
      </Modal>
    </Container>
  );
}

/* ------------------------- STYLED ------------------------- */

const Container = styled.View`
  flex: 1;
  margin-top: 30px;
  padding: 20px;
  background: #f0f0f0;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Button = styled.TouchableOpacity`
  width: 100%;
  padding: 14px;
  border-radius: 8px;
  background: ${(p) => (p.green ? '#4caf50' : p.gray ? '#9e9e9e' : '#4caf50')};
  align-items: center;
  margin-bottom: 15px;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
`;

const ClienteItem = styled.View`
  background: #fff;
  border-radius: 8px;
  padding: 15px;
  border: 1px solid #ddd;
  margin-bottom: 12px;
  flex-direction: row;
  justify-content: space-between;
`;

const ClienteInfo = styled.View`
  flex: 1;
`;

const Nome = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

const InfoText = styled.Text`
  color: #555;
`;

const Acoes = styled.View`
  justify-content: center;
  gap: 8px;
`;

const SmallButton = styled.TouchableOpacity`
  padding: 8px 12px;
  border-radius: 6px;
  background: ${(p) => (p.blue ? '#2196f3' : '#e53935')};
`;

const SmallButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
`;

const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
`;

const ModalBox = styled.View`
  width: 90%;
  background: #fff;
  padding: 20px;
  border-radius: 12px;
`;

const ModalTitulo = styled.Text`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Input = styled.TextInput`
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 12px;
`;

const ModalButtons = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
