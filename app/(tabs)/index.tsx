// App.js
import React, { useState } from 'react';
import { Alert } from 'react-native';
import styled from 'styled-components/native';

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      return Alert.alert('Erro', 'Por favor, preencha todos os campos.');
    }
    Alert.alert('Login realizado!', `Email: ${email}`);
  };

  return (
    <Container>
      <Title>Login</Title>

      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Input
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button onPress={handleLogin}>
        <ButtonText>Entrar</ButtonText>
      </Button>
    </Container>
  );
}

// Estilos simplificados
const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #f0f2f5;
`;

const Title = styled.Text`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 30px;
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

const Button = styled.TouchableOpacity`
  width: 100%;
  height: 50px;
  background: #4a90e2;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
`;
