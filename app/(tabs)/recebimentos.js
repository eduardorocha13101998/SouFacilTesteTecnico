// RecebimentosScreen.js
import { useEffect, useState } from 'react';
import { Alert, FlatList } from 'react-native';
import styled from 'styled-components/native';

export default function RecebimentosScreen() {
  const [vendas, setVendas] = useState([
    { id: '1', clienteNome: 'João Silva', valor: '120', data: '10/01/2025', recebida: false },
    { id: '2', clienteNome: 'Maria Santos', valor: '250', data: '11/01/2025', recebida: true },
    { id: '3', clienteNome: 'João Silva', valor: '80', data: '12/01/2025', recebida: false },
  ]);

  const [filtro, setFiltro] = useState({ cliente: "", data: "" });
  const [lista, setLista] = useState([]);

  useEffect(() => {
    let filtrada = vendas.filter(
      (v) =>
        (!filtro.cliente || v.clienteNome.toLowerCase().includes(filtro.cliente.toLowerCase())) &&
        (!filtro.data || v.data === filtro.data)
    );
    setLista(filtrada);
  }, [filtro, vendas]);

  const marcarComoRecebida = (id) => {
    setVendas((old) => old.map((v) => (v.id === id ? { ...v, recebida: true } : v)));
    Alert.alert("Sucesso", "Recebimento marcado!");
  };

  return (
    <Container>
      <Titulo>Recebimentos</Titulo>

      {/* FILTROS */}
      <FiltroBox>
        <Input
          placeholder="Filtrar por cliente..."
          value={filtro.cliente}
          onChangeText={(t) => setFiltro({ ...filtro, cliente: t })}
        />
        <Input
          placeholder="Filtrar por data (dd/mm/aaaa)"
          value={filtro.data}
          onChangeText={(t) => setFiltro({ ...filtro, data: t })}
        />
      </FiltroBox>

      {/* LISTA */}
      <FlatList
        style={{ width: "100%" }}
        data={lista}
        keyExtractor={(i) => i.id}
        ListEmptyComponent={<EmptyText>Nenhuma venda encontrada.</EmptyText>}
        renderItem={({ item }) => (
          <Card>
            <Info>
              <Text>Cliente: {item.clienteNome}</Text>
              <Text>Valor: R$ {item.valor}</Text>
              <Text>Data: {item.data}</Text>
              <Status recebida={item.recebida}>
                {item.recebida ? "Recebida" : "Pendente"}
              </Status>
            </Info>

            {!item.recebida && (
              <Botao onPress={() => marcarComoRecebida(item.id)}>
                <BotaoTexto>Receber</BotaoTexto>
              </Botao>
            )}
          </Card>
        )}
      />
    </Container>
  );
}

/* ------------------- STYLED COMPONENTS ------------------- */

const Container = styled.View`
  flex: 1;
  margin-top: 30px;
  padding: 20px;
  background: #f5f5f5;
  align-items: center;
`;

const Titulo = styled.Text`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const FiltroBox = styled.View`
  width: 100%;
  margin-bottom: 20px;
`;

const Input = styled.TextInput`
  width: 100%;
  height: 50px;
  background: #fff;
  padding: 10px 15px;
  border-radius: 8px;
  border: 1px solid #ddd;
  margin-bottom: 15px;
`;

const Card = styled.View`
  width: 100%;
  background: #fff;
  padding: 15px;
  border-radius: 10px;
  border: 1px solid #ddd;
  margin-bottom: 12px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Info = styled.View`
  flex: 1;
`;

const Text = styled.Text`
  font-size: 16px;
  color: #333;
`;

const Status = styled.Text`
  margin-top: 6px;
  font-size: 14px;
  font-weight: bold;
  color: ${({ recebida }) => (recebida ? "green" : "red")};
`;

const Botao = styled.TouchableOpacity`
  background: #4caf50;
  padding: 10px 15px;
  border-radius: 8px;
`;

const BotaoTexto = styled.Text`
  color: white;
  font-weight: bold;
`;

const EmptyText = styled.Text`
  text-align: center;
  margin-top: 20px;
  color: #777;
  font-size: 16px;
`;
