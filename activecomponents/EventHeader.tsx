import * as React from "react";
import { Image, TouchableOpacity } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { FontSize, FontFamily, Color } from "../GlobalStyles";
import { router } from "expo-router";

type MobileAppHeaderWithBackBuProps = {
  pageTitle: string;
};

const MobileAppHeaderWithBackBu: React.FC<MobileAppHeaderWithBackBuProps> = ({ pageTitle }) => {
  return (
    <View style={styles.mobileAppHeaderWithBackBu}>
      <TouchableOpacity style={styles.backButton}
      onPress={() => router.push("")} >
        <Image
          style={[styles.iconchevronLeft, { tintColor: Color.colorWhite }]}
          source={require("../assets/images/iconchevron-left.png")}
        />
      </TouchableOpacity>
      <Text style={[styles.pageTitle, { color: Color.colorWhite }]}>{pageTitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  backButton: {
    position: "absolute",
    left: 16,
    top: 9,
    width: 24,
    height: 24,
  },
  iconchevronLeft: {
    width: "100%",
    height: "100%",
    tintColor: Color.colorWhite,
  },
  pageTitle: {
    fontSize: FontSize.size_sm,
    lineHeight: 24,
    fontWeight: "600",
    fontFamily: FontFamily.interSemiBold,
    color: Color.colorWhite,
    textAlign: "center",
  },
  mobileAppHeaderWithBackBu: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", // Center horizontally
    borderBottomWidth: 0.5,
    borderColor: Color.colorGainsboro,
    width: 375,
    height: 42,
    overflow: "hidden",
    marginTop: 3,
    backgroundColor: 'darkgreen',
  },
});

export default MobileAppHeaderWithBackBu;
