import React, { Component } from "react";
import { Text, StyleSheet, View, SafeAreaView, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class Nilai extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nis: "",
      uas: {},
      nilai: 3,
      loading: true,
    };
  }

  componentDidMount() {
    this._getNis();
  }

  _getNis = async () => {
    try {
      const value = await AsyncStorage.getItem("nis");
      this.setState({
        nis: value,
      });
      this._getData();
    } catch (e) {
      console.log(e);
    }
  };

  _getData = async () => {
    try {
      let response = await fetch(
        "http://siswa.lumbangrejo.com/api/nilai?nis=" +
          this.state.nis +
          "&nilai=" +
          this.state.nilai
      );
      let json = await response.json();
      this.setState({
        uas: json,
        loading: false,
      });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { loading } = this.state;

    const renderItem = ({ item }) => (
      <ItemUas uas={item.uas} tanggal={item.tanggal} />
    );

    let tampil = "";
    if (loading == true) {
      tampil = (
        <View style={styles.item}>
          <Text style={styles.title}>Loading</Text>
        </View>
      );
    } else {
      tampil = (
        <View style={styles.cardList}>
          <Text style={styles.textNilai}>Nilai Uas</Text>
          <View style={styles.item}>
            <Text style={styles.title}>Nilai</Text>
            <Text style={styles.title}>Tanggal</Text>
          </View>
          <FlatList
            data={this.state.uas}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      );
    }
    return (
    <>
      {tampil}
    </>);
  }
}

const ItemUas = ({ uas, tanggal }) => {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{uas}</Text>
      <Text style={styles.title}>{tanggal}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  cardList: {
    backgroundColor: "salmon",
    padding: 5,
    marginVertical: 5,
    marginHorizontal: 8,
  },
  item: {
    backgroundColor: "skyblue",
    padding: 6,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 8,
    marginHorizontal: 16,
    borderColor: '#dbdbdb',
    borderWidth: 2,
    marginTop: 10
  },
  title: {
    fontSize: 20,
  },
  textNilai: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
  },
});
