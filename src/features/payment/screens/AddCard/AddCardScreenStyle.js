import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF9E2D',
    position: 'relative'
  },
  parent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    height: '95%',
    marginTop: '20%'
  },
  headingText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: '5%',
    marginHorizontal: '5%'
  },
  inputContainer: {
    paddingHorizontal: '5%',
    marginVertical: '2%',
    width: '100%'
  },
  inputContainerHalf: {
    paddingHorizontal: '5%',
    marginVertical: '2%',
    width: '50%'
  },
  fullInput: {
    backgroundColor: '#EDF1F7',
    borderRadius: 20,
    width: '100%',
    paddingHorizontal: 10
  },
  labelText: {
    color: '#ACB1C0',
    fontSize: 13,
    marginBottom: 10
  },
  addButton: {
    backgroundColor: '#3366FF',
    borderRadius: 20,
    width: '90%',
    paddingVertical: '5%',
    flexDirection: 'row',
    justifyContent: 'center'
  }
})

export default styles;
