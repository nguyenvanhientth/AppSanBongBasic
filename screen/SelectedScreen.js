import React from "react";
import { Text, TouchableOpacity, View,StyleSheet,Button,FlatList, Image } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";  
import appConfig from '../env/appConfig'

export default class selectedDate extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isDateTimePickerVisible: false,
      selectedDate: "",
      data: [],
  };
}
  //----------------
  componentWillMount() {
      this.fetchData();
    }
  fetchData = async () => {
    const server = appConfig;
    //alert(JSON.stringify(this.props.navigation.state.params))
    try {
      const url = `${server}soccerfield/groupSoccerFieldID=${this.props.navigation.state.params.id}`;
     // alert(url);
      const response = await fetch(url);
      const json = await response.json();
      this.setState({data: json});
    } catch (err) {
      // alert(err.message)
    }
   
    
  };

//------------------
  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = date => {
    this.setState({ selectedDate: date.toString() });
    this._hideDateTimePicker();
  };
  //----------------
  render() {
    const { isDateTimePickerVisible, selectedDate } = this.state;
    return (
      <View style={styles.container}>
        <View style = {styles.container}>
          <FlatList
            data = {this.state.data} 
            keyExtractor = {(i) => i.id}
            renderItem = {({item}) => {
              return(
              <View>
                <View style = {{flexDirection: 'row' , flex: 1}}>
                  <Image 
                  style = {{ width:50 , height: 50}}
                  source = {require('../image/san.jpg')}/>
                  <View>
                  <Text>{item.id}</Text>
                  <Text>Gia: {item.price}VND - Ghi chu: {item.note}  -  Size: {item.size}</Text>
                  </View>
                </View>
                <View style ={{
                      height:1,
                      backgroundColor: 'white'
                    }}>
                  </View>
              </View>
              )}
            }
            />
          </View>
        <TouchableOpacity onPress={this._showDateTimePicker}>
          <View style={styles.button}>
            <Text>Show DatePicker</Text>
          </View>
        </TouchableOpacity>

        <Text style={styles.text}>{selectedDate}</Text>

        <DateTimePicker
          isVisible={isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
          mode= {'datetime'}
          is24Hour = {false}
        />
        <Button
        backgroundColor="#03A9F4"
        title="Tro Lai"
        onPress={() => this.props.navigation.navigate('Home')}
      />
    </View>
    )
  }
}
styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    backgroundColor: "lightblue",
    padding: 12,
    margin: 16,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)"
  },
  text: {
    marginVertical: 10
  }
});