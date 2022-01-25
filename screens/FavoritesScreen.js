import React, { useLayoutEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { useSelector } from 'react-redux'

import MealItem from '../components/MealItem'
import HeaderButton from '../components/HeaderButton'
import MealList from '../components/MealList'
import DefaultText from '../components/DefaultText'

const FavoritesScreen = (props) => {
  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerTitle: 'Your Favorites',
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title='menu'
            iconName='ios-menu'
            onPress={() => {
              props.navigation.toggleDrawer()
            }}
          />
        </HeaderButtons>
      ),
    })
  }, [props.navigation])

  const favMeals = useSelector((state) => state.meals.favoriteMeals)
  if (favMeals.length === 0 || !favMeals) {
    return (
      <View style={styles.content}>
        <DefaultText>No favorite meals found. Start adding some!</DefaultText>
      </View>
    )
  }

  return <MealList listData={favMeals} navigation={props.navigation} />
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default FavoritesScreen
