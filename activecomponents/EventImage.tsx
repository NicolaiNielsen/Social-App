import { Color, Padding } from "@/GlobalStyles";
import * as React from "react";
import { Image } from "react-native";
import { StyleSheet, View } from "react-native";

type HeaderImageProps = {
  Img_url: string;
};

const HeaderImage: React.FC<HeaderImageProps> = ({ Img_url }) => {
  return (
    <View style={[styles.headerimage, styles.headerimageLayout]}>
      <Image
        style={[styles.imageframeIcon, styles.headerimageLayout]}
        resizeMode="cover" // Replace contentFit with resizeMode
        source={{ uri: Img_url }} // Update source to use Img_url
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerimageLayout: {
    backgroundColor: Color.colorDarkgreen,
    width: 373,
    height: 168,
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  imageframeIcon: {
    overflow: "hidden",
  },
  headerimage: {
  },
});

export default HeaderImage;
