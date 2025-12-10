// VendasScreen.js
import { useState } from 'react';
import { Alert, FlatList, Modal } from 'react-native';
import styled from 'styled-components/native';

export default function VendasScreen() {
  const [clientes] = useState([
    { id: '1', nome: 'João Silva' },
    { id: '2', nome: 'Maria Santos' },
    { id: '3', nome: 'Paulo Oliveira' },
  ]);

  const [vendas, setVendas] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [form, setForm] = useState({ valor: '', data: '', clienteId: '', abrirDrop: false });

  const abrirModal = () => {
    setForm({ valor: '', data: '', clienteId: '', abrirDrop: false });
    setModalVisible(true);
  };

  const salvarVenda = () => {
    const camposVazios = !form.valor || !form.data || !form.clienteId;
    if (camposVazios) return Alert.alert("Erro", "Preencha todos os campos.");

    const cliente = clientes.find((c) => c.id === form.clienteId);

    setVendas((old) => [
      ...old,
      {
        id: String(Date.now()),
        ...form,
        clienteNome: cliente.nome,
      },
    ]);

    setModalVisible(false);
  };

  return (
    <Container>
      <Header>Vendas</Header>

      <Button onPress={abrirModal}>
        <ButtonText>+ Registrar Venda</ButtonText>
      </Button>

      {/* LISTA */}
      <FlatList
        style={{ width: "100%" }}
        data={vendas}
        ListEmptyComponent={<EmptyText>Nenhuma venda registrada ainda.</EmptyText>}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <Card>
            <Text>Cliente: {item.clienteNome}</Text>
            <Text>Valor: R$ {item.valor}</Text>
            <Text>Data: {item.data}</Text>
          </Card>
        )}
      />

      {/* MODAL */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <ModalBG>
          <ModalBox>
            <ModalTitle>Registrar Venda</ModalTitle>

            {["valor", "data"].map((campo) => (
              <Input
                key={campo}
                placeholder={campo === "valor" ? "Valor da venda" : "Data (dd/mm/aaaa)"}
                value={form[campo]}
                keyboardType={campo === "valor" ? "numeric" : "default"}
                onChangeText={(t) => setForm({ ...form, [campo]: t })}
              />
            ))}

            <Label>Cliente:</Label>

            <Select onPress={() => setForm({ ...form, abrirDrop: !form.abrirDrop })}>
              <SelectText>
                {clientes.find((c) => c.id === form.clienteId)?.nome || "Selecione um cliente"}
              </SelectText>
            </Select>

            {form.abrirDrop && (
              <Dropdown>
                {clientes.map((c) => (
                  <DropItem
                    key={c.id}
                    onPress={() => setForm({ ...form, clienteId: c.id, abrirDrop: false })}
                  >
                    <Text>{c.nome}</Text>
                  </DropItem>
                ))}
              </Dropdown>
            )}

            <Row>
              <SmallButton green onPress={salvarVenda}>
                <ButtonText>Salvar</ButtonText>
              </SmallButton>
              <SmallButton gray onPress={() => setModalVisible(false)}>
                <ButtonText>Cancelar</ButtonText>
              </SmallButton>
            </Row>
          </ModalBox>
        </ModalBG>
      </Modal>
    </Container>
  );
}

/* ------------------- STYLED COMPONENTS ------------------- */

const Container = styled.View`
  flex: 1;
  padding: 20px;
  margin-top: 30px;
  background: #f4f4f4;
  align-items: center;
`;

const Header = styled.Text`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Button = styled.TouchableOpacity`
  width: 100%;
  padding: 15px;
  border-radius: 8px;
  background: #4caf50;
  margin-bottom: 20px;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
`;

const Card = styled.View`
  width: 100%;
  background: #fff;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #ddd;
  margin-bottom: 12px;
`;

const Text = styled.Text`
  font-size: 16px;
  color: #333;
`;

const EmptyText = styled.Text`
  text-align: center;
  margin-top: 20px;
  color: #777;
`;

/* MODAL */

const ModalBG = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: rgba(0,0,0,0.5);
`;

const ModalBox = styled.View`
  width: 90%;
  background: #fff;
  padding: 20px;
  border-radius: 12px;
`;

const ModalTitle = styled.Text`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Input = styled.TextInput`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 15px;
`;

const Label = styled.Text`
  margin-bottom: 5px;
  font-size: 16px;
`;

const Select = styled.TouchableOpacity`
  padding: 12px;
  border-radius: 8px;
  background: #eee;
  border: 1px solid #ccc;
  margin-bottom: 5px;
`;

const SelectText = styled.Text`
  color: #333;
`;

const Dropdown = styled.View`
  border: 1px solid #ccc;
  border-radius: 8px;
  background: #fff;
  max-height: 150px;
`;

const DropItem = styled.TouchableOpacity`
  padding: 12px;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
`;

const SmallButton = styled.TouchableOpacity`
  padding: 12px 20px;
  border-radius: 8px;
  background: ${(p) => (p.green ? "#4caf50" : p.gray ? "#777" : "#4caf50")};
`;
