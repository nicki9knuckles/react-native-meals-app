import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { Platform, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer'

import CategoriesScreen from '../screens/CategoriesScreen'
import MealDetailScreen from '../screens/MealDetailScreen'
import CategoryMealsScreen from '../screens/CategoryMealsScreen'
import FavoritesScreen from '../screens/FavoritesScreen'
import FiltersScreen from '../screens/FiltersScreen'
import Colors from '../constants/Colors'

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor:
      Platform.OS === 'android' ? Colors.primaryColor : 'transparent',
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold',
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans',
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
}

const Navigation = () => {
  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  )
}

const MealsStack = createNativeStackNavigator()

function MealsNavigator() {
  return (
    <View style={{ flex: 1 }} collapsable={false}>
      <MealsStack.Navigator screenOptions={defaultStackNavOptions}>
        <MealsStack.Screen name='Categories' component={CategoriesScreen} />
        <MealsStack.Screen
          name='CategoryMeals'
          component={CategoryMealsScreen}
        />
        <MealsStack.Screen name='MealDetail' component={MealDetailScreen} />
      </MealsStack.Navigator>
    </View>
  )
}

const FavStack = createNativeStackNavigator()

function FavMealsNavigator() {
  return (
    <View style={{ flex: 1 }} collapsable={false}>
      <FavStack.Navigator screenOptions={defaultStackNavOptions}>
        <FavStack.Screen name='Favorites Screen' component={FavoritesScreen} />
        <FavStack.Screen name='Meal Detail' component={MealDetailScreen} />
      </FavStack.Navigator>
    </View>
  )
}

const FiltersStack = createNativeStackNavigator()

function FiltersNavigator() {
  return (
    <View style={{ flex: 1 }} collapsable={false}>
      <FiltersStack.Navigator screenOptions={defaultStackNavOptions}>
        <FiltersStack.Screen name='Filters' component={FiltersScreen} />
      </FiltersStack.Navigator>
    </View>
  )
}

const Tab =
  Platform.OS === 'android'
    ? createMaterialBottomTabNavigator()
    : createBottomTabNavigator()

function MealsFavTabNavigator() {
  return (
    <Tab.Navigator
      activeColor={Colors.accentColor} // android
      shifting={true}
      screenOptions={{
        // ios
        tabBarActiveTintColor: Colors.accentColor,
        headerShown: false,
        tabBarLabelStyle: {
          fontFamily: 'open-sans-bold',
        },
      }}
    >
      <Tab.Screen
        name='Meals Navigator'
        component={MealsNavigator}
        options={{
          tabBarLabel: 'Meals',
          tabBarLabelStyle: {
            fontFamily: 'open-sans-bold',
          },
          tabBarIcon: ({ color }) => {
            return <Ionicons name='ios-restaurant' size={25} color={color} />
          },
          tabBarColor: Colors.primaryColor,
        }}
      />
      <Tab.Screen
        name='FavoritesNavigator'
        component={FavMealsNavigator}
        options={{
          tabBarLabel: 'Favorites',
          tabBarLabelStyle: {
            fontFamily: 'open-sans-bold',
          },
          tabBarIcon: ({ color }) => {
            return (
              <Ionicons
                name='ios-star'
                size={25}
                color={Platform.OS === 'android' ? 'white' : color}
              />
            )
          },
          tabBarColor: Colors.accentColor,
        }}
      />
    </Tab.Navigator>
  )
}

const DrawerNavigator = createDrawerNavigator()

function MainNavigator() {
  return (
    <DrawerNavigator.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: Colors.primaryColor,
        drawerLabelStyle: {
          fontFamily: 'open-sans-bold',
        },
      }}
    >
      <DrawerNavigator.Screen name='Meals' component={MealsFavTabNavigator} />
      <DrawerNavigator.Screen
        name='Meal Filters'
        component={FiltersNavigator}
      />
    </DrawerNavigator.Navigator>
  )
}

export default Navigation
