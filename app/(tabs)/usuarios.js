// UsuariosScreen.js
import { useState } from 'react';
import { Alert, FlatList, Modal } from "react-native";
import styled from "styled-components/native";

export default function UsuariosScreen() {
  const [usuarios, setUsuarios] = useState([
    { id: "1", nome: "Carlos Alberto", email: "carlos@email.com", tipo: "Administrador" },
    { id: "2", nome: "Fernanda Lima", email: "fernanda@email.com", tipo: "Usuário Padrão" },
  ]);

  const [modalVisible, setModalVisible] = useState(false);

  const [form, setForm] = useState({
    nome: "",
    email: "",
    tipo: "Usuário Padrão",
  });

  const [editandoId, setEditandoId] = useState(null);

  const abrirModalAdicionar = () => {
    setForm({ nome: "", email: "", tipo: "Usuário Padrão" });
    setEditandoId(null);
    setModalVisible(true);
  };

  const abrirModalEditar = (usuario) => {
    setForm(usuario);
    setEditandoId(usuario.id);
    setModalVisible(true);
  };

  const salvarUsuario = () => {
    const { nome, email, tipo } = form;

    if (!nome || !email) {
      return Alert.alert("Erro", "Preencha todos os campos.");
    }

    if (editandoId) {
      setUsuarios((old) =>
        old.map((u) => (u.id === editandoId ? { ...form, id: editandoId } : u))
      );
    } else {
      setUsuarios((old) => [
        ...old,
        { ...form, id: String(Date.now()) },
      ]);
    }

    setModalVisible(false);
  };

  const excluirUsuario = (id) => {
    Alert.alert("Confirmar", "Deseja excluir este usuário?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: () => {
          setUsuarios((old) => old.filter((u) => u.id !== id));
        },
      },
    ]);
  };

  return (
    <Container>
      <Titulo>Usuários do Sistema</Titulo>

      <BotaoNovoUsuario onPress={abrirModalAdicionar}>
        <BotaoTexto>+ Novo Usuário</BotaoTexto>
      </BotaoNovoUsuario>

      <FlatList
        style={{ width: "100%" }}
        data={usuarios}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <UsuarioItem>
            <UsuarioInfo>
              <TextoNome>{item.nome}</TextoNome>
              <TextoEmail>Email: {item.email}</TextoEmail>
              <TextoTipo>Tipo: {item.tipo}</TextoTipo>
            </UsuarioInfo>

            <Acoes>
              <BotaoEditar onPress={() => abrirModalEditar(item)}>
                <TextoBotao>Editar</TextoBotao>
              </BotaoEditar>

              <BotaoExcluir onPress={() => excluirUsuario(item.id)}>
                <TextoBotao>Excluir</TextoBotao>
              </BotaoExcluir>
            </Acoes>
          </UsuarioItem>
        )}
        ListEmptyComponent={<ListaVazia>Nenhum usuário registrado.</ListaVazia>}
      />

      {/* MODAL - FORM */}
      <Modal animationType="slide" transparent visible={modalVisible}>
        <ModalContainer>
          <ModalBox>
            <ModalTitulo>{editandoId ? "Editar Usuário" : "Novo Usuário"}</ModalTitulo>

            <Input
              placeholder="Nome"
              value={form.nome}
              onChangeText={(t) => setForm({ ...form, nome: t })}
            />

            <Input
              placeholder="Email"
              value={form.email}
              keyboardType="email-address"
              onChangeText={(t) => setForm({ ...form, email: t })}
            />

            <Label>Tipo de Usuário</Label>

            {/* SELETOR DE TIPO */}
            <TipoWrapper>
              <OpcaoTipo
                selecionado={form.tipo === "Administrador"}
                onPress={() => setForm({ ...form, tipo: "Administrador" })}
              >
                <TextoTipoBotao>
                  Administrador do Sistema
                </TextoTipoBotao>
              </OpcaoTipo>

              <OpcaoTipo
                selecionado={form.tipo === "Usuário Padrão"}
                onPress={() => setForm({ ...form, tipo: "Usuário Padrão" })}
              >
                <TextoTipoBotao>
                  Usuário Padrão
                </TextoTipoBotao>
              </OpcaoTipo>
            </TipoWrapper>

            <ModalButtons>
              <ModalButtonSalvar onPress={salvarUsuario}>
                <BotaoTexto>Salvar</BotaoTexto>
              </ModalButtonSalvar>

              <ModalButtonCancelar onPress={() => setModalVisible(false)}>
                <BotaoTexto>Cancelar</BotaoTexto>
              </ModalButtonCancelar>
            </ModalButtons>
          </ModalBox>
        </ModalContainer>
      </Modal>
    </Container>
  );
}


/* ------------------------- STYLED COMPONENTS ------------------------- */

const Container = styled.View`
  flex: 1;
  margin-top: 30px;
  padding: 20px;
  background-color: #f4f4f4;
  align-items: center;
`;

const Titulo = styled.Text`
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const BotaoNovoUsuario = styled.TouchableOpacity`
  width: 100%;
  padding: 15px;
  background-color: #4caf50;
  border-radius: 8px;
  align-items: center;
  margin-bottom: 20px;
`;

const BotaoTexto = styled.Text`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;

const UsuarioItem = styled.View`
  width: 100%;
  background-color: white;
  padding: 15px;
  margin-bottom: 12px;
  border-radius: 10px;
  border: 1px solid #ddd;
  flex-direction: row;
  justify-content: space-between;
`;

const UsuarioInfo = styled.View`
  flex: 1;
`;

const TextoNome = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

const TextoEmail = styled.Text`
  color: #555;
`;

const TextoTipo = styled.Text`
  font-weight: bold;
  margin-top: 5px;
  color: #222;
`;

const Acoes = styled.View`
  justify-content: center;
  gap: 10px;
`;

const BotaoEditar = styled.TouchableOpacity`
  background-color: #2196f3;
  padding: 8px 12px;
  border-radius: 6px;
`;

const BotaoExcluir = styled.TouchableOpacity`
  background-color: #e53935;
  padding: 8px 12px;
  border-radius: 6px;
`;

const TextoBotao = styled.Text`
  color: white;
  font-weight: bold;
`;

/* Modal */
const ModalContainer = styled.View`
  flex: 1;
  background-color: rgba(0,0,0,0.5);
  justify-content: center;
  align-items: center;
`;

const ModalBox = styled.View`
  width: 90%;
  background-color: white;
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
  height: 50px;
  background: #fff;
  padding: 10px 15px;
  border-radius: 8px;
  border: 1px solid #ddd;
  margin-bottom: 15px;
`;

const Label = styled.Text`
  margin-bottom: 8px;
  font-weight: bold;
`;

const TipoWrapper = styled.View`
  margin-bottom: 20px;
`;

const OpcaoTipo = styled.TouchableOpacity`
  padding: 12px;
  margin-bottom: 10px;
  border-radius: 8px;
  background-color: ${(p) => (p.selecionado ? "#4caf50" : "#ddd")};
`;

const TextoTipoBotao = styled.Text`
  font-size: 16px;
  color: ${(p) => (p.selecionado ? "white" : "#333")};
`;

const ModalButtons = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const ModalButtonSalvar = styled.TouchableOpacity`
  background-color: #4caf50;
  padding: 12px 20px;
  border-radius: 8px;
`;

const ModalButtonCancelar = styled.TouchableOpacity`
  background-color: #777;
  padding: 12px 20px;
  border-radius: 8px;
`;

const ListaVazia = styled.Text`
  text-align: center;
  margin-top: 20px;
  color: #777;
  font-size: 16px;
`;
