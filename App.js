import React , { useState } from 'react';
import axios from 'axios';
import {StyleSheet, Text, View, TextInput, ScrollView, Image, TouchableHighlight, Modal} from 'react-native';

export default function App(){
  const apiurl = "http://www.omdbapi.com/?&apikey=28f4dae9";
  const [state, setState] = useState({
    s: "",
    results: [],
    selected: {}
  });

  const search = () => {
    axios(apiurl + "&s=" + state.s).then(({ data }) => {
      let results = data.Search;
      setState(prevState => {
        return { ...prevState, results: results }
      })
    })
  }

  const openPopup = (id) => {
    axios(apiurl + "&i=" + id).then(({ data }) => {
      let result = data;
      setState(prevState => {
        return { ...prevState, selected: result }
      });
    });
  }

  return(
    <View style={styles.container}>
      <Text style={styles.title}>Search Movie</Text>
      <TextInput
      placeholder="Search Movie..."
      style={styles.searchbox}
      onChangeText={text => setState(prevState => {
        return{...prevState, s: text}
      })}
      onSubmitEditing={search}
      value={state.s}
      />
      <ScrollView style={styles.results}>
      {state.results.map(result => (
        <TouchableHighlight key={result.imdbID}
         onPress={() => openPopup(result.imdbID)}>
        <View style={styles.result}>
          
          <Image
          source={{ uri: result.Poster}}
          style={{
            width: '100%',
            height: 350,
          }}
          resizeMode="cover"
          />
          <Text style={styles.heading}>{result.Title} {"\n"}{result.Year}</Text>
        </View>
        </TouchableHighlight>
      ))}
      </ScrollView>
      <Modal
      animationType="fade"
      transparent={false}
      visible={(typeof state.selected.Title !="undefined")}
      >
        <View style={styles.popup}>
        <Image source={{uri:state.selected.Poster}}
        style={{
          width:'100%',
          height: 300,
        }}
          />
        <Text style={styles.poptitle}> {state.selected.Title}</Text>
        <Text>Year   :{state.selected.Year}</Text>
        <Text>Type   : {state.selected.Type}</Text>
        <Text>Genre  :{state.selected.Genre}</Text>
        <Text style={{marginBottom: 20}}>Rating: {state.selected.imdbRating}</Text>
        <Text>{state.selected.Plot}</Text>
        </View>
        <TouchableHighlight 
          onPress={() => setState(prevState => {
            return{ ...prevState, selected: {} }
          })}
        >
          <Text style={styles.close}>Close</Text>
        </TouchableHighlight>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor:'lightgrey',
    alignItems: 'center',
    justifyContent:'flex-start',
    paddingTop: 70,
    paddingHorizontal: 20
  },
  title: {
    color: 'black',
    fontSize: 32,
    fontWeight: '700',
    textAlign:'center',
    marginBottom: 20,
  },
  searchbox:{
    fontSize: 20,
    fontWeight: '300',
    padding: 20,
    width: '100%',
    backgroundColor: 'lightblue',
    borderRadius: 8,
  marginBottom: 40,
  },
  results:{
    flex: 1,
    width:'100%'
  },
  result:{
    flex: 1,
    width: '100%',
    marginBottom:20,
  },
  heading: {
    color: 'black',
    fontSize: 20,
    fontWeight: '700',
    padding: 20,
    backgroundColor: 'white',
  },
  popup:{
    padding:20
  },
  poptitle:{
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 5
  },
  close:{
    padding: 20,
    fontSize: 20,
    fontWeight: '700',
    backgroundColor:'lightblue',
  }
});
