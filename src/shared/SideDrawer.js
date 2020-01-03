import React, { Component } from 'react';
import SafeAreaProvider from 'react-native-safe-area-context';
import SafeAreaView from 'react-native-safe-area-view';
import { DrawerItems } from 'react-navigation-drawer';
import { NavigationActions } from 'react-navigation';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions
} from 'react-native';

const routes = [
  {
    img: require('../assets/images/discover-icon-white.png'),
    name: 'Discover'
  },
  {
    img: require('../assets/images/profile-icon.png'),
    name: 'Profile'
  },
  {
    img: require('../assets/images/orders-icon.png'),
    name: 'Orders'
  },
  {
    img: require('../assets/images/delivery-icon.png'),
    name: 'Delivery'
  },
  {
    img: require('../assets/images/pay-icon.png'),
    name: 'Payment'
  },
  {
    img: require('../assets/images/settings-icon.png'),
    name: 'Settings'
  },
  {
    img: require('../assets/images/support-icon.png'),
    name: 'Support'
  }
]

const close = (props) => {
  props.navigation.closeDrawer();
}

const SideDrawer = props => (
  <ScrollView>
    <View style={styles.container}>
      <View>
        <TouchableOpacity style={styles.closeContainer} onPress={() => close(props)}>
          <Image source={require('../assets/images/close_drawer.png')}/>
          <Text style={styles.blackText}>Close</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.routeContainer}>
        {
          routes.map((item, index) =>
            <TouchableOpacity
              key={index}
              style={styles.route}
              onPress={() => props.navigation.navigate(item.name)}
            >
              <Image source={item.img} />
              <Text style={styles.greyText}>{item.name}</Text>
            </TouchableOpacity>
          )
        }
      </View>
      <View>
        <TouchableOpacity style={styles.closeContainer}>
          <Image source={require('../assets/images/logout-icon.png')}/>
          <Text style={styles.blackText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    padding: '10%',
    height: Dimensions.get('window').height+100,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  closeContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  blackText: {
    opacity: 0.4,
    fontWeight: 'bold',
    marginLeft: '5%'
  },
  route: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: '6%'
  },
  greyText: {
    color: 'white',
    opacity: 0.51,
    marginLeft: '10%'
  }
})

export default SideDrawer;
