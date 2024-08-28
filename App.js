import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from './screens/ProfileScreen';
import CardDetailScreen from './screens/CardDetailScreen';
import AddButtonScreen from './screens/AddButtonScreen';
import AddCardScreen from './screens/AddCardScreen';
import QRCodeScreen from './screens/QRCodeScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [cards, setCards] = useState([
    {
      id: '1',
      title: 'My Website',
      buttons: [
        { label: 'Home', url: 'https://www.mywebsite.com' },
        { label: 'Contact', url: 'https://www.mywebsite.com/contact' },
      ],
    },
    {
      id: '2',
      title: 'LinkedIn Profile',
      buttons: [
        { label: 'LinkedIn', url: 'https://www.linkedin.com/in/myprofile' },
      ],
    },
  ]);

  const addButtonToCard = (cardId, newButton) => {
    setCards(cards.map(card =>
      card.id === cardId
        ? { ...card, buttons: [...card.buttons, newButton] }
        : card
    ));
  };

  const editButtonInCard = (cardId, updatedButton) => {
    setCards(cards.map(card => {
      if (card.id === cardId) {
        const updatedButtons = card.buttons.map((button, index) =>
          index === updatedButton.index ? updatedButton : button
        );
        return { ...card, buttons: updatedButtons };
      }
      return card;
    }));
  };
  

  const addCard = (newCard) => {
    setCards([...cards, { ...newCard, id: (cards.length + 1).toString() }]);
  };

  const editCard = (editedCard) => {
    setCards(cards.map(card =>
      card.id === editedCard.id
        ? editedCard
        : card
    ));
  };

  const deleteCard = (id) => {
    setCards(cards.filter(card => card.id !== id));
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Profile">
          {props => (
            <ProfileScreen
              {...props}
              cards={cards}
              onDeleteCard={deleteCard}
              onEditCard={editCard}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="CardDetail">
          {props => (
            <CardDetailScreen
              {...props}
              onAddButton={addButtonToCard}
              onEditButton={editButtonInCard}
              cards={cards}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="AddButton">
          {props => (
            <AddButtonScreen {...props} onAddButton={addButtonToCard} />
          )}
        </Stack.Screen>
        <Stack.Screen name="AddCard">
          {props => (
            <AddCardScreen {...props} onAddCard={addCard} />
          )}
        </Stack.Screen>
        <Stack.Screen name="QRCode" component={QRCodeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
