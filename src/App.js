import React, { useState, useEffect } from "react";

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import api from './services/api';


export default function App() {
  /* Listar os repositórios da sua API: Deve ser capaz de criar uma lista de todos os repositórios que estão cadastrados na sua API 
        com os campos title, techs e número de curtidas seguindo o padrão ${repository.likes} curtidas, apenas alterando o número 
        para ser dinâmico.
    */
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {      
      console.log(response.data);

      setRepositories(response.data);
    });
  }, []);


  async function handleLikeRepository(id) {
    // Implement "Like Repository" functionality    
   /* Curtir um repositório listado da API: Deve ser capaz de curtir um item na sua API através de um botão com o texto Curtir e 
      deve atualizar o número de likes na listagem no mobile.
   */
    const response = await api.post(`/repositories/${id}/like`);    
    /*console.log('modificado');
    console.log(response.data);
    
    setRepositories([repositories.filter(repository => repository.id !== id), response.data]);
    console.log('rep');    
    console.log(repositories);    */
    const newRepo = response.data;
    const repositoryUpdate = repositories.map(repository => {
      if(repository.id === id){
        return newRepo;
      }else {
        return repository;
      }
    });
    
    console.log('upd');
    console.log(repositoryUpdate);
    setRepositories(repositoryUpdate)
  }

  

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        
          <FlatList               
              data={repositories}
              keyExtractor={repository => repository.id }
              renderItem={({ item: repository }) => (
                <View style={styles.repositoryContainer}>
                  <Text style={styles.repository}>{repository.title}</Text>
                  
                  <View style={styles.techsContainer}>
                    {repository.techs.map(tech => {
                      return (
                        <Text style={styles.tech}>
                          {tech}
                        </Text>
                      );
                    })}
                  </View>

                  <View style={styles.likesContainer}>
                    <Text
                      style={styles.likeText}
                      // Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
                      testID={`repository-likes-${repository.id}`}
                    >
                      {repository.likes} curtidas
                    </Text>
                  </View>                  

                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleLikeRepository(repository.id)}
                    // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
                    testID={`like-button-${repository.id}`}
                  >
                    <Text style={styles.buttonText}>Curtir</Text>
                  </TouchableOpacity>
               </View>
            )}
          />          
        
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});
