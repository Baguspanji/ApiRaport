import React, { Component } from "react";
import { Text, StyleSheet, View, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class Absen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nis: "",
      spp: {},
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
        "http://siswa.lumbangrejo.com/api/bayar?nis=" +
          this.state.nis
      );
      let json = await response.json();
      this.setState({
        spp: json,
        loading: false,
      });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { loading } = this.state;

    const renderItem = ({ item }) => (
      <ItemSpp spp={item.dpp} keterangan={item.ket_dpp} tanggal={item.tgl_dpp} />
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
          <Text style={styles.textNilai}>Pembayaran(Dpp)</Text>
          <View style={styles.item}>
            <Text style={styles.title}>Dpp</Text>
            <Text style={styles.title}>Keterangan</Text>
            <Text style={styles.title}>Tanggal</Text>
          </View>
          <FlatList
            data={this.state.spp}
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

const ItemSpp = ({ spp, keterangan, tanggal }) => {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{spp}</Text>
      <Text style={styles.title}>{keterangan}</Text>
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
    fontSize: 16,
  },
  textNilai: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
  },
});
