import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Button, FlatList, Image, Keyboard, SafeAreaView, TouchableOpacity, View } from "react-native";
import { IconButton, Searchbar, Snackbar, Text } from 'react-native-paper';
import { useQuery } from "@apollo/client";
import { shopStyles } from "./ShopStyles";
import { VariantProps } from "./subsections/Product";
import { GET_STORE_VARIANTS_BY_ID } from "../../graphql/queries/GetStoreVariantsById";
import Product from "./subsections/Product";

const Shop = ({ navigation }: any) => {

  const [visible, setVisible] = React.useState(false);

  const onToggleSnackBar = () => setVisible(true);

  const onDismissSnackBar = () => setVisible(false);

  const storeId = "6362d3db4506a1e7168c4cac"

  const [searchQuery, setSearchQuery] = useState('');

  //const { loading, error, data } = useQuery(GET_STORE_VARIANTS_BY_ID, {variables: {idStore: storeId, "offset": 0, "first": 20}})

  const [variants, setVariants] = useState<VariantProps[]>([])

  const [updateCount, setUpdateCount] = useState(0)

  const [updatedVariants, setUpdatedVariants] = useState<VariantProps[]>([])

  const handleSearch = (text: React.SetStateAction<string>) => {
    setSearchQuery(text)
    if(text.toString() === "") {
      setVariants([])
      if(data) {
        const products = data.getStoreById.store.products
        // get all variants of all products
        const variants = products.map((product: any) => {
            return product.variants
            })
        // flatten array of arrays
        const flattened = [].concat.apply([], variants)
        setVariants(flattened)
      }
    }
    else {
      const data = variants.filter(variant => {
        return variant.variantTitle.toLowerCase().includes(text.toString().toLowerCase())
      })
      setVariants(data)
    }
  }

  const {data, loading, error, fetchMore} = useQuery(GET_STORE_VARIANTS_BY_ID, {
    variables: {
        idStore: storeId, "offset": 0, "first": 20
    },
    fetchPolicy: 'network-only',
    onCompleted(data) {
        const products = data.getStoreById.store.products
        // consider only products that are published
        const publishedProducts = products.filter((product: any) => {
          return product.published
        })
        // get all variants of all products
        const variants = publishedProducts.map((product: any) => {
            return product.variants
            })
        // flatten array of arrays
        const flattened = [].concat.apply([], variants)
        // consider only variants that are available for sale
        const availableVariants = flattened.filter((variant: any) => {
          return variant.availableForSale
        })
        setVariants(availableVariants)
    },
  });

    const searchPlaceholder = "Rechercher un produit"

    // close snackbar after 3 seconds
    useEffect(() => {
      if (visible) {
        const timeout = setTimeout(() => onDismissSnackBar(), 3000);
        return () => {
          clearTimeout(timeout);
        };
      }
    }, [visible]);


  return(
    <SafeAreaView style={shopStyles.root}>
      <View style={shopStyles.view}>
        <Text variant="headlineMedium" style={shopStyles.headline}>
          {data ? data.getStoreById.store.name : "Loading Store ..."}
        </Text>
      </View>
      <View>
        <Searchbar style={{marginVertical: 10}} placeholder={searchPlaceholder} onChangeText={handleSearch} value={searchQuery}/>
      </View>

      <SafeAreaView style={{flex: 1}}>
        {loading ? (
            <View style={shopStyles.innerContainer}>
              <ActivityIndicator size="large" color="#FFA500"></ActivityIndicator>
            </View>
          ) : error ? (
            <View style={shopStyles.innerContainer}>
              <Text style={shopStyles.errorText}>OOPS UNE ERREUR EST SURVENUE</Text>
            </View>)
          : (
            variants.length === 0 ? 
            
              (<Text>YOUR RESEARCH DOES NOT MATCH ANY ITEM</Text>)
              : 
              (
                <FlatList
                numColumns={2}
                data={variants}

                renderItem={({item}) => 
                  <Product
                    _id={item._id}
                    variantTitle={item.variantTitle}
                    // if no image, use default image
                    imgSrc={item.imgSrc ? item.imgSrc : "https://img.icons8.com/ios/452/no-image.png"}
                    stock={item.stock}
                    price={item.price}
                    byWeight={item.byWeight}
                    availableForSale={item.availableForSale}
                    addToCart={(quantity: number) => {
                      console.log("nb items", quantity)
                      onToggleSnackBar()
                  }}
                    /> 
                }
                keyExtractor={item => item._id}
                onEndReachedThreshold={1}
                  onEndReached={() => 
                    {
                      fetchMore({
                        variables: {
                          offset: variants.length
                        },
                        updateQuery(previousQueryResult, { fetchMoreResult }) {
                          const products = fetchMoreResult.getStoreById.store.products
                          // get all variants of all products
                          const newEntries = products.map((product: any) => {
                              return product.variants
                              })
                          // flatten array of arrays
                          const newEntriesFlattened = [].concat.apply([], newEntries)
                          setVariants(oldProducts => [...oldProducts, ...newEntriesFlattened])
                        },
                      })
                    }
                  }
                />
                
              )
          ) }

      </SafeAreaView>
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Ok',
          onPress: () => {
            console.log('Pressed');
          },
        }}>
        Item added to cart!
      </Snackbar>
    </SafeAreaView>
  )
}

export default Shop