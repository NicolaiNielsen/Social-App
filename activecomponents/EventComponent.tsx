import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { FontSize, Color, FontFamily, Border } from "../GlobalStyles";

type EventComponentProps = {
  img: string;
  eventName: string;
  eventDate: string;
  location: string;
};

const EventComponent: React.FC<EventComponentProps> = ({ img, eventName, eventDate, location }) => {
  return (
    <View style={styles.eventcomponent}>
      <Image
        style={styles.image}
        resizeMode="cover" // Replace contentFit with resizeMode
        source={{ uri: img }} // Use the img prop as the source
      />
      <Text style={styles.eventname}>{eventName}</Text>
      <Text style={styles.eventtimeTypo}>{location}</Text>
      <Text style={[styles.eventtime, styles.eventtimeTypo]}>{eventDate}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 168,
    zIndex: 1,
    overflow: "hidden",
    width: 373,
    borderRadius: Border.br_9xs,
  },
  eventname: {
    fontSize: FontSize.size_sm,
    lineHeight: 28,
    height: 26,
    textAlign: "center",
    color: Color.colorWhite,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    width: 376,
  },
  eventtime: {
    height: 21,
  },
  eventcomponent: {
    backgroundColor: Color.colorDarkgreen,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2,
  },
  eventtimeTypo: {
    lineHeight: 14,
    fontSize: FontSize.size_3xs,
    textAlign: "center",
    color: Color.colorWhite,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    width: 376,
  },
});

export default EventComponent;
