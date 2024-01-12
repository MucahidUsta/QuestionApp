import React, { Component } from "react";
import { ScrollView, Text, View, TextInput, TouchableOpacity } from "react-native";

export default class Etk extends Component {
  state = {
    isLoading: true,
    data: [],
    selectedQuestion: null,
    
  };

  componentDidMount() {
    const url = "https://api.ibb.gov.tr/MetroIstanbul/api/MetroMobile/V2/FrequentlyAskedQuestions";
    fetch(url)
      .then((res) => res.json())
      .then((json) => this.setState({ ...this.state, isLoading: false, data: json.Data }))
      .catch((err) => console.log(err));
  }

  handleQuestionPress = (id) => {
    this.setState({ selectedQuestion: id === this.state.selectedQuestion ? null : id });
  };
 
 

  render() {
    return (
      <View style={{ flex: 1, padding: 20 , backgroundColor:"#e0e1dd"}}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20,top:14, backgroundColor:"#eff7f6", justifyContent:"center", alignItems:"center", color:"#9a031e"}}>         Sıkça Sorulan Sorular</Text>

        {this.state.isLoading ? (
          <Text>Loading</Text>
        ) : (
          <ScrollView>
            {this.state.data.map((q) => (
              <TouchableOpacity
                key={q.QuestionID}
                onPress={() => this.handleQuestionPress(q.QuestionID)}
                style={{
                  backgroundColor: this.state.selectedQuestion === q.QuestionID ? '#e0e0e0' : '#fff',
                  padding: 10,
                  marginBottom: 10,
                  borderRadius: 8,
                }}
              >
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{q.Question}</Text>
                {this.state.selectedQuestion === q.QuestionID && <Text style={{ marginTop: 10 }}>{q.Answer}</Text>}
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

        <Text style={{ fontSize: 18, marginTop: 20 }}>Sorunuz mu var? Sorunuzu sorun:</Text>
        <TextInput
          style={{
            height: 40,
            borderColor: 'black',
            borderWidth: 1,
            marginBottom: 10,
            paddingLeft: 10,
            borderRadius: 8,
          }}
          placeholder="Sorunuzu buraya yazın"
        />

        <TouchableOpacity
          style={{
            backgroundColor: '#007ea7',
            padding: 10,
            borderRadius: 8,
            alignItems: 'center',
          }}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Gönder</Text>
        </TouchableOpacity>
      </View>
    );
  }
}


