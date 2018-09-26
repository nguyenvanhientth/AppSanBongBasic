import React, {Component} from "react";
import { FlatList, StyleSheet, Text, View , ActivityIndicator,Platform,TouchableHighlight,Image,Alert,TouchableOpacity} from "react-native";
import FlatListItem from '../component/FlatlistItem';
import appConfig from '../env/appConfig';

export default class App extends Component {
  state = {
    data: [],
    isLoading: true,
    activeRowkey: null,
    
  };
  //neu tao ham them moi Key resetFlatList(activeKey)
  resetFlatlist = (deleteKey) => { 
    this.setState((prevState) => {
        return {
            deleteRowkey: deleteKey
        }
    });
    this._onPressAdd = this._onPressAdd.bind(this);
}
_onPressAdd = () =>{
    alert("Ban muon them items!")
   // this.refs.AddItem.showAddItem();
}

  componentWillMount() {
    this.fetchData();
  }

  fetchData = async () => {
    const server = appConfig;
    const response = await fetch(`${server}groupsoccerfield`);
    //console.warn("response",response._bodyInit);
    const json = await response.json();
    // if () {
      
    // } else {
      
    // }
    
    //console.warn(json);
    this.setState({ data: json, isLoading: false });
    //console.warn("datadatadata", this.state.data);
  };
  render() {
    
    if (this.state.isLoading) {
        return (
            <View style={{flex: 1, padding: 20}}>
                <ActivityIndicator/>
            </View>
        )
    } else {
        return (
        <View style={styles.container}>
          <View 
            style ={{
              backgroundColor: 'white',
              height: 52,
              flexDirection: 'row',
              justifyContent: "flex-end",
              alignItems: 'center'
              }}>
                 <TouchableHighlight style = {{
                      marginRight: 10,
                    }}
                      underlayColor = 'gray'
                      onPress ={this._onPressAdd} >
                        <Image
                            style = {{ width:35 , height: 35}}
                            source = {require('../icon/add.jpg')}
                        />
                    </TouchableHighlight>
          </View>
            <FlatList
              data={this.state.data}
              keyExtractor={(x,i) => i.id}
              renderItem={({ item , index }) => {
                return (
                    <FlatListItem navigation={this.props.navigation} item={item} index = {index} parentFlatlist={this} />
            
                )}
                }>
              </FlatList>
        </View>
        );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    marginTop: Platform.OS ==='ios' ? 34 : 0
  }
});