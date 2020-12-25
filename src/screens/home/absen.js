import React, { Component } from "react";
import { StyleSheet, SafeAreaView, } from "react-native";
import {Absen } from "../../components";

export default class Absensi extends Component {
  render() {
    return (
    <SafeAreaView style={styles.container}>
      <Absen />
    </SafeAreaView>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
});
