import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {GraphQLWsLink} from "@apollo/client/link/subscriptions";
import {ApolloClient, ApolloProvider, HttpLink, InMemoryCache, split} from "@apollo/client";
import {getMainDefinition} from "@apollo/client/utilities";
import {createClient} from "graphql-ws";
import {Navigation} from "./navigation/Navigation";
import {ClientAuthenticationProvider} from "./context/ClientAuthenticationContext";
import {Provider as PaperProvider} from 'react-native-paper';
import {theme} from "./theme/Theme";
import '../i18n'
import {CartProvider} from './context/CartContext';
import {StripeProvider} from '@stripe/stripe-react-native';
import {ChatProvider} from './context/ChatContext';
import {SearchProvider} from "./context/SearchContext";
import { registerRootComponent } from 'expo';
import { useFonts } from 'expo-font';

const App: () => JSX.Element = () => {

  let [fontsLoaded] = useFonts({
    'Lato': require('./assets/fonts/Lato-Black.ttf')
  })

  const wsLink = new GraphQLWsLink(
    createClient({
      url: 'ws://52.90.77.253:4000/graphql'
    }),
  );

  const httpLink = new HttpLink({
    uri: 'http://52.90.77.253:4000/graphql',
  });

  const splitLink = split(
    ({query}) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink,
  );

  const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <StripeProvider
      publishableKey="pk_test_EK2EADQF4MqPyfL63ZrKGRiJ00MgduNzlC"
      // urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
      // merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}" // required for Apple Pay
    >
      <CartProvider>
        <ClientAuthenticationProvider>
          <ApolloProvider client={client}>
            <ChatProvider>
              <SearchProvider>
                <PaperProvider theme={theme}>
                  <NavigationContainer>
                    <Navigation/>
                  </NavigationContainer>
                </PaperProvider>
              </SearchProvider>
            </ChatProvider>
          </ApolloProvider>
        </ClientAuthenticationProvider>
      </CartProvider>
    </StripeProvider>

  );
};

registerRootComponent(App)
export default App;
