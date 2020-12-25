import React, { Component } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate('Nilai')}>
        <Text>Lihat Trankip Nilai</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate('Absen')}>
        <Text>Lihat Riwayat Absen</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={()=>navigation.navigate('Bayar')}>
        <Text>Lihat Riwayat Pembayaran</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: 'center',
  },
  btn: {
    width: '90%',
    height: 40,
    backgroundColor: "salmon",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20
  },
});
