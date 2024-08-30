import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from './screens/ProfileScreen';
import CardDetailScreen from './screens/CardDetailScreen';
import AddButtonScreen from './screens/AddButtonScreen';
import AddCardScreen from './screens/AddCardScreen';
import QRCodeScreen from './screens/QRCodeScreen';
import CardManagementScreen from './screens/CardManagementScreen';
import ButtonManagementScreen from './screens/ButtonManagementScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [cards, setCards] = useState([
    {
      id: '1',
      title: 'My Website',
      description: 'This is my personal website.',
      buttons: [
        { label: 'Home', url: 'https://www.mywebsite.com' },
        { label: 'Contact', url: 'https://www.mywebsite.com/contact' },
      ],
    },
    {
      id: '2',
      title: 'LinkedIn Profile',
      description: 'Connect with me on LinkedIn.',
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

  const deleteButtonInCard = (cardId, buttonIndex) => {
    setCards(cards.map(card => {
      if (card.id === cardId) {
        const updatedButtons = card.buttons.filter((_, index) => index !== buttonIndex);
        return { ...card, buttons: updatedButtons };
      }
      return card;
    }));
  };

  const incrementScanCount = (cardId, buttonIndex) => {
    setCards(cards.map(card => {
      if (card.id === cardId) {
        const updatedButtons = card.buttons.map((button, index) => {
          if (index === buttonIndex) {
            return { ...button, scanCount: (button.scanCount || 0) + 1 };
          }
          return button;
        });
        return { ...card, buttons: updatedButtons };
      }
      return card;
    }));
  };

  const addCard = (newCard) => {
    setCards([...cards, { ...newCard, id: (cards.length + 1).toString(), description: newCard.description }]);
  };

  const editCard = (editedCard) => {
    setCards(cards.map(card =>
      card.id === editedCard.id
        ? { 
            ...card, 
            title: editedCard.title, 
            description: editedCard.description,
            image: editedCard.image // Ensure the image is updated
          }
        : card
    ));
  };

  const deleteCard = (id) => {
    setCards(cards.filter(card => card.id !== id));
  };

  const onReorderCard = (newCardOrder) => {
    setCards(newCardOrder);
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
              onDeleteButton={deleteButtonInCard}
              onIncrementScanCount={incrementScanCount} // Pass the scan counter increment function
              cards={cards}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="CardManagement">
          {props => (
            <CardManagementScreen
              {...props}
              cards={cards}
              onEditCard={editCard}
              onDeleteCard={deleteCard}
              onReorderCard={onReorderCard}  // Pass the reorder function here
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="ButtonManagement">
          {props => (
            <ButtonManagementScreen
              {...props}
              cards={cards}
              onEditButton={editButtonInCard}
              onDeleteButton={deleteButtonInCard}
              onReorderButton={(cardId, updatedButtons) => {
                const updatedCards = cards.map(card =>
                  card.id === cardId ? { ...card, buttons: updatedButtons } : card
                );
                setCards(updatedCards);
              }}
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
        <Stack.Screen name="QRCode">
          {props => (
            <QRCodeScreen
              {...props}
              onIncrementScanCount={incrementScanCount} // Pass the scan counter increment function
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
