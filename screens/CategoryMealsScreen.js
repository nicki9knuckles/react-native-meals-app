import React, { useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'

import { CATEGORIES } from '../data/dummy-data'
import MealList from '../components/MealList'
import DefaultText from '../components/DefaultText'

const CategoryMealsScreen = (props) => {
  const { categoryId } = props.route.params

  const availableMeals = useSelector((state) => state.meals.filteredMeals)

  const displayedMeals = availableMeals.filter(
    (meal) => meal.categoryIds.indexOf(categoryId) >= 0
  )

  if (displayedMeals.length === 0) {
    return (
      <View style={styles.content}>
        <DefaultText>No meals found, check filters?</DefaultText>
      </View>
    )
  }

  useEffect(() => {
    props.navigation.setOptions({
      headerTitle: CATEGORIES.find((cat) => cat.id === categoryId).title,
    })
  }, [props.navigation])

  return <MealList listData={displayedMeals} navigation={props.navigation} />
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default CategoryMealsScreen
