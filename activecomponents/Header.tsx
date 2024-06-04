import * as React from "react";
import { Text, StyleSheet, View } from "react-native";
import { FontSize, FontFamily, Color, Padding } from "../GlobalStyles";

const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.universitetsOrganisationer}>
        Universitets Organisationer
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  universitetsOrganisationer: {
    fontSize: FontSize.size_xl,
    lineHeight: 28,
    fontWeight: "600",
    fontFamily: FontFamily.interSemiBold,
    color: Color.colorWhite,
    textAlign: "left",
  },
  header: {
    backgroundColor: Color.colorDarkgreen,
    width: 373,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 0,
    paddingVertical: Padding.p_3xs,
    marginTop: 4,
  },
});

export default Header;
