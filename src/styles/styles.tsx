import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'white',
    opacity: 0.8,
  },
  modalContainer: {
    marginHorizontal: 30,
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#fcfefe',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14,
  },
  title: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  modalText: {fontSize: 15, padding: 2},
  textInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  rowCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    margin: 2,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flex1: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 20,
    padding: 5,
    textAlign: 'left',
  },
  itemTime: {fontSize: 18, textAlign: 'center'},
  alignEnd: {
    alignItems: 'flex-end',
  },
  startButton: {fontSize: 18, color: '#078955'},
  stopButton: {fontSize: 18, color: '#b42400'},
  resetButton: {fontSize: 20, color: '#b42400', padding: 5},
});

export default styles;
