import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Color } from '@/GlobalStyles';
import { router } from 'expo-router';

type OrganisationComponentProps = {
  organisationName: string;
  imgUrl: string;
  description: string;
  id: number;
};

const OrganisationComponent: React.FC<OrganisationComponentProps> = ({ organisationName, imgUrl, id }) => {

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => router.push({
        pathname: "/eventpage/[id]",
        params: {id : id, organisationName: organisationName, imgUrl: imgUrl},
      })}>
           <Image source={{ uri: imgUrl }} style={styles.image} />
      <Text style={styles.name}>{organisationName}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 5,
    backgroundColor: Color.colorDarkgreen,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2,
  },
  image: {
    height: 156,
    zIndex: 1,
    overflow: "hidden",
    width: 373,
  },
  name: {
    fontSize: 16,
    color: Color.colorWhite,
    fontWeight: 'bold',
  },
});

export default OrganisationComponent;

