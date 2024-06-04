import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { Link, router } from 'expo-router'; // Adjust the import path as needed
import OrganisationComponent from '../activecomponents/OrganisationComponent'; // Adjust the import path as needed
import { FontFamily, FontSize, Color, Padding, Border } from '@/GlobalStyles'; // Ensure this path is correct

interface Organisation {
  id: number;
  organisationname: string;
  image_url: string;
  description: string;
}

//Fix navigation
// 1. Import the necessary components from React Native
// 2. Create the Index component
// 3. Fetch data from the backend API when the component mounts
// 4. Render the fetched data in a FlatList
// 5. Export the Index component
// How to create a landing page
// 1. Import the necessary components from React Native
// 2. Create the Index component
// 3. Fetch data from the backend API when the component mounts
// 4. Render the fetched data in a FlatList
// 5. Export the Index component
// How to create a landing page


const HomePage = () => {
  const [organisations, setOrganisations] = useState<Organisation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the backend API when the component mounts
    fetch('http://127.0.0.1:5000/organisations') // Change this to your actual backend URL
      .then(response => response.json())
      .then(data => {
        console.log(data); // Log fetched data
        setOrganisations(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
        setLoading(false);
      });
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.universitetsOrganisationer}>
          Universitets Organisationer
        </Text>
      </View>

      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          style={styles.feed1}
          data={organisations}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            console.log(item); // Log each item being rendered
            return (
              <OrganisationComponent
                organisationName={item.organisationname}
                imgUrl={item.image_url}
                description={item.description} 
                id={item.id}              />
            );
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingBottom: 50, // To avoid overlapping with the status bar
  },
  universitetsOrganisationer: {
    fontSize: FontSize.size_xl,
    lineHeight: 28,
    color: Color.colorWhite,
    textAlign: 'left',
  },
  header: {
    width: 373,
    justifyContent: 'center',
    paddingHorizontal: 0,
    paddingVertical: Padding.p_3xs,
    marginTop: 4,
    alignItems: 'center',
    flexDirection: 'row',
    overflow: 'hidden',
    backgroundColor: Color.colorDarkgreen,
  },
  rucbar: {
    marginLeft: -30,
    bottom: 6,
    left: '50%',
    fontSize: FontSize.size_sm,
    lineHeight: 20,
    color: Color.colorGainsboro,
    textAlign: 'center',
    zIndex: 0,
    position: 'absolute',
  },
  postHeader: {
    height: 29,
    zIndex: 0,
    width: 378,
    borderWidth: 1,
    borderColor: Color.colorBlack,
    borderStyle: 'solid',
    alignItems: 'center',
    flexDirection: 'row',
  },
  imageIcon: {
    top: 27,
    borderRadius: Border.br_9xs,
    height: 156,
    zIndex: 1,
    overflow: 'hidden',
  },
  postContent: {
    height: 183,
    top: 0,
  },
  postShadowBox: {
    height: 185,
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    width: 378,
    borderWidth: 1,
    borderColor: Color.colorBlack,
    borderStyle: 'solid',
    overflow: 'hidden',
  },
  feed1: {
    width: 373,
    backgroundColor: Color.colorDarkgreen,
  },
  feed: {
    flex: 1,
    width: '100%',
    height: 812,
    overflow: 'hidden',
    backgroundColor: Color.colorDarkgreen,
  },
});

export default HomePage;
