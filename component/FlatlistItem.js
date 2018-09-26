import React, {Component} from 'React';
import {AppRegistry,StyleSheet,Text,View,Image,Alert,TouchableOpacity,Button} from 'react-native';
import Swipeout from 'react-native-swipeout';
import appConfig from '../env/appConfig';

export default class FlatListItem extends Component{
    constructor(props){
        super(props);
        this.state= {
            activeRowkey: null,
            data: []
        }
    }
    componentWillMount() {
        this.fetchData();
      }
    
    fetchData = async () => {
        const server = appConfig;
        const response = await fetch(`${server}groupsoccerfield`);
       // console.warn("response",response._bodyInit);
        const json = await response.json();
        //console.warn(json);
        this.setState({ data: json, isLoading: false });
        //console.warn("datadatadata", this.state.data);
    };
    getItem( item ){
        // Alert.alert(this.props.item.name,`Dia chi: ${this.props.item.address}`);
      }
    render() {
        const swipeSetting = {
            autoClose : true,
            onClose: () => {
                if (this.state.activeRowkey != null) {
                    this.setState({activeRowkey : null})
                }       
            },
            onOpen: () => {
                this.setState({activeRowkey: this.props.item.id})
            },
            right: [
                {
                    onPress: () => {
                        const deletingRow = this.state.activeRowkey;
                        Alert.alert(
                            'Alert',
                            'Ban that su muon xoa??',
                            [
                                {text:'No',onPress: ()=> console.log('Cancel Pressed'),style:'cancel'},
                                {text:'Yes', onPress: () =>{
                                    data.splice(this.props.index, 1);
                                    //reset flatlist
                                    this.props.parentFlatlist.resetFlatlist(deletingRow);
                                }},
                            ],
                            {cancelable: true}
                        )
                    },
                    text:'Delete', type: 'delete'
                }
            ],
            rowId: this.props.index,
            sectionId: 1,
        };  
        return(
            <Swipeout {...swipeSetting}>
                    <View style ={{
                        flex:1,
                        flexDirection: 'column',
                        }}>
                     <TouchableOpacity onPress = {()=>this.props.navigation.navigate('Selected',{id: this.props.item.id})}>
                        <View style = {{
                        flex: 1,
                        flexDirection: 'row',
                        //backgroundColor: this.props.index % 2 ==0 ? 'mediumseagreen': 'tomato'
                        backgroundColor: 'mediumseagreen'
                        }}
                        >
                            <Image 
                                source = {{uri: 'https://petrotimes.vn/stores/news_dataimages/nguyenhinh/032016/21/13/lich-thi-dau-bong-da-hom-nay-223.jpg'}}
                                style = {{width:100,height:100,margin:5}}
                                
                            />
                            <View style = {{
                                // flex:1,
                                flexDirection: 'column'
                            }}>
                                <Text style = {styles.flatlistitem}>{this.props.item.name}</Text>
                                <Text style = {styles.flatlistitem}>{this.props.item.address}</Text>
                            </View>
                        </View>
                        <View style ={{
                            height:1,
                            backgroundColor: 'white'
                        }}>

                        </View>
                    </TouchableOpacity>
                </View>
            </Swipeout>
            )       
        }
    }

const styles = StyleSheet.create({
    flatlistitem : {
        flex: 1,
        color: 'white',
        padding: 10,
        fontSize: 16,
    }
});
