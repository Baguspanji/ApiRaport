import React, { Component } from "react";
import { StyleSheet, SafeAreaView, } from "react-native";
import { Ulangan, Uts, Uas } from "../../components";

export default class Nilai extends Component {
  render() {
    return (
    <SafeAreaView style={styles.container}>
      <Ulangan />
      <Uts />
      <Uas />
    </SafeAreaView>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
});
