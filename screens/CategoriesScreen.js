import React from 'react'
import { StyleSheet, FlatList } from 'react-native'
import { useEffect } from 'react'

import { CATEGORIES } from '../data/dummy-data'
import CategoryGridTile from '../components/CategoryGridTile'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import HeaderButton from '../components/HeaderButton'

const CategoriesScreen = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Meal Categories',
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title='menu'
            iconName='ios-menu'
            onPress={() => {
              navigation.toggleDrawer()
            }}
          />
        </HeaderButtons>
      ),
    })
  }, [navigation])

  const renderGridItem = (itemData) => {
    return (
      <CategoryGridTile
        title={itemData.item.title}
        color={itemData.item.color}
        onSelect={() => {
          navigation.navigate({
            name: 'CategoryMeals',
            params: {
              categoryId: itemData.item.id,
            },
          })
        }}
      />
    )
  }

  return (
    <FlatList data={CATEGORIES} renderItem={renderGridItem} numColumns={2} />
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default CategoriesScreen
