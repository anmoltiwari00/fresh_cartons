import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    paddingTop: '15%'
  },
  crossContainer: {
    backgroundColor: 'black',
    borderRadius: 10,
    padding: 15
  },
  sameLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '5%'
  },
  heading: {
    fontSize: 24
  }
})

export default styles;
