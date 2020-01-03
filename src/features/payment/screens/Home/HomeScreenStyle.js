import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF9E2D'
  },
  parent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    height: '97%',
    marginTop: '18%',
    padding: 15,
    paddingTop: 5,
    position: 'relative'
  },
  headingText: {
    fontSize: 25,
    fontWeight: 'bold',
    marginVertical: '3%'
  },
  bankContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: '35%',
    backgroundColor: '#E4E4E4',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingVertical: '5%',
    paddingHorizontal: '4%',
    zIndex: 10,
    width: Dimensions.get('window').width
  },
  smallHeadingText: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  upiContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: '62%',
    backgroundColor: '#ECECEC',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingVertical: '5%',
    paddingHorizontal: '4%',
    zIndex: 8,
    width: Dimensions.get('window').width
  },
  cardContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: '101%',
    backgroundColor: '#F8F8F8',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingVertical: '5%',
    paddingHorizontal: '4%',
    zIndex: 5,
    width: Dimensions.get('window').width
  },
  card: {
    width: '70%'
  },
  bankImage: {
    height: '50%'
  },
  upiImage: {
    width: '100%'
  }
})

export default styles;
