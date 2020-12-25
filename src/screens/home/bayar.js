import React, { Component } from "react";
import { StyleSheet, SafeAreaView, } from "react-native";
import { Spp, Dpp } from "../../components";

export default class Bayar extends Component {
  render() {
    return (
    <SafeAreaView style={styles.container}>
      <Spp />
      <Dpp />
    </SafeAreaView>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
});
