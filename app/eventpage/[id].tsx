import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import EventHeader from "../../activecomponents/EventHeader";
import EvenHeaderImage from "../../activecomponents/EventImage";
import EventComponent from "../../activecomponents/EventComponent";
import { useLocalSearchParams } from 'expo-router';
import { Border, Color } from '@/GlobalStyles';

interface Event {
  date: string;
  image_url: string;
  organisationame: string;
  id: number;
  eventname: string;
  eventDate: string;
  location: string;
  img: string;
}

const EventPage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const { id, organisationName, imgUrl } = useLocalSearchParams();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`http://192.168.0.100:5000/organisations/${id}/events`);
        const data = await response.json();
        setEvents(data);
        setLoading(false);
        console.log(data)
      } catch (error) {
        console.error('Error fetching events: ', error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);


  return (
    
    <View style={styles.container}>
      <EventHeader pageTitle={organisationName} />
      <EvenHeaderImage Img_url={imgUrl} />

      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList style={styles.feed}
          data={events}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <EventComponent
              img={item.image_url}
              eventName={item.eventname}
              eventDate={item.date}
              location={item.location}
            />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingBottom: 50, // To avoid overlapping with the status bar
  },
  feed: {
    width: 373,
    backgroundColor: Color.colorDarkgreen,
  },
    // Other styles...
    imageIcon: {
      borderRadius: Border.br_9xs,
      height: 156,
      zIndex: 1,
      // overflow: 'hidden', // Remove this line
    },
});

export default EventPage;
